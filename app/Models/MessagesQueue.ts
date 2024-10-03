// app/Models/MessagesQueue.ts

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MessagesQueue extends BaseModel {
  public static table = 'msg_messages_queue';

  @column({ isPrimary: true })
  public id: number

  @column()
  public phone: string

  @column()
  public name: string

  @column({
    prepare: (value: string[]) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  public content: string[]

  @column.dateTime()
  public runOn: DateTime 

  @column()
  public isSent: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime | null
}
