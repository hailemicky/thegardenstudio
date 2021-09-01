import { DateTime } from 'luxon'
import { BaseModel, column,hasMany,HasMany  } from '@ioc:Adonis/Lucid/Orm'
import Class from 'App/Models/Class'
import Package from 'App/Models/Package'


export default class Instructor extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column({columnName:'firstName'})
  public firstName :string 

  @column({columnName:'lastName'})
  public lastName :string 
  @column({columnName:'email'})
  public email :string 
  
  @column({columnName:'title'})
  public title :string 

  @column({columnName:'accountId'})
  public accountId:string 

  @column({columnName:'profilePicture'})
  public profilePicture:string 

  @column({columnName:'instagramUrl'})
  public instagramUrl:string 
  

  @column({columnName:'facebookUrl'})
  public facebookUrl:string 

  @column({columnName:'linkedinUrl'})
  public linkedinUrl:string 

  @column({columnName:'twitterUrl'})
  public twitterUrl:string 
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Class , {
    foreignKey: 'instructor', // defaults to userId
  })
  
  public classes: HasMany<typeof Class>

  @hasMany(() => Package, {
    foreignKey: 'instructor', // defaults to userId
  })
  
  public packages: HasMany<typeof Package>


  
  
}
