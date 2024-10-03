import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

export default class listMatriculas extends BaseModel {
  public static table = 'msg_list_matriculas';

  @column({ isPrimary: true })
  public id: number;
  
  @column()
  public companyId: number;

  @column()
  public consultationId: number;

  @column()
  public esocialId: number;

  @column()
  public name: string;

  @column()
  public cpf: string;

  @column()
  public matricula: string;

  @column()
  public phoneAccountant: string;

  @column()
  public phoneCompany: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime | null
}
