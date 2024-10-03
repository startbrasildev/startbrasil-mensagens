import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ErrorLogs extends BaseSchema {
  protected tableName = 'msg_logs';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('message_queue_id');
      table.string('log').notNullable();
      table.timestamps(true, true);
      table.timestamp('deleted_at', { useTz: true }).nullable() 
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
