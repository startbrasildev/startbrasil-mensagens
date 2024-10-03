import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AuthorizedKeys extends BaseSchema {
  protected tableName = 'msg_authorized_keys'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Chave primária
      table.string('name').notNullable().unique() // nome da aplicação requisitante
      table.string('content').notNullable() // Conteúdo em JSON
      table.timestamps(true, true) // Timestamps com atualização automática para `created_at` e `updated_at`
      table.timestamp('deleted_at', { useTz: true }).nullable() // Soft delete
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}