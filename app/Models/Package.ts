import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Package extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({columnName:'instructor'})
  public instructor :string 

  @column({columnName:'detail'})
  public detail :string 

  @column({columnName:'atb1'})
  public atb1 :string
  
  @column({columnName:'atb2'})
  public atb2 :string 

  @column({columnName:'atb3'})
  public atb3 :string 

  @column({columnName:'atb4'})
  public atb4 :string 

  @column({columnName:'price'})
  public price :string 


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
