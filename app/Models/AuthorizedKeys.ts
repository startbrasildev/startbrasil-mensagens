// app/Models/AuthorizedKey.ts

import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthorizedKey extends BaseModel {
  public static table = 'msg_authorized_keys';

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime | null

  @beforeSave()
  public static async hashContent(key: AuthorizedKey) {
    if (key.$dirty.content) {
      key.content = await Hash.make(key.content)
    }
  }
}
