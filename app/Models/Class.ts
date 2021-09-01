import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'



export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({columnName:'className'})
  public className :string 

  @column({columnName:'classDetail'})
  public classDetail :string 

  @column({columnName:'when'})
  public when :string 

  @column({columnName:'instructor'})
  public instructor :string 


  @column({columnName:'time'})
  public time :string 


  @column({columnName:'type'})
  public type :string 


  @column({columnName:'productId'})
  public productId :string 


  @column({columnName:'priceId'})
  public priceId :string 


  @column({columnName:'price'})
  public price :number  

  @column({columnName:'classPicture'})
  public classPicture :string 


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  





  
}






