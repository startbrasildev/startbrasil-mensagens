import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MessagesQueue extends BaseSchema {
  protected tableName = 'msg_messages_queue'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Chave primária
      table.string('phone') // telefone a ser enviado a mensagem no formato ("55987654321@c.us")
      table.string('name').notNullable() // nome do método que será executado para referência
      table.text('content').notNullable() // Conteúdo em JSON
      table.boolean('is_sent').defaultTo(false) // Verificar se a mensagem foi enviada
      table.timestamp('run_on', { useTz: true }).nullable() // timestamp de quando a mensagem deve ser enviada
      table.timestamps(true, true) // Timestamps com atualização automática para `created_at` e `updated_at`
      table.timestamp('deleted_at', { useTz: true }).nullable() // Soft delete
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
