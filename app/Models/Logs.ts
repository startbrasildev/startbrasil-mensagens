import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Logs extends BaseModel {
  public static table = 'msg_logs';

  @column({ isPrimary: true })
  public id: number;

  @column({ isPrimary: true })
  public idMessagesQueue: number;

  @column()
  public log: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: true })
  public updatedAt: DateTime
}
