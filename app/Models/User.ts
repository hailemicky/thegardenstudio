import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column({columnName:'firstName'})
  public firstName :string 

  @column({columnName:'lastName'})
  public lastName :string 

  @column({columnName:'title'})
  public title :string 

  @column({columnName:'userType'})
  public userType :string 

  @column({columnName:'confirmationToken'})
  public confirmationToken :string 
  
  @column({columnName:'accountId'})
  public accountId:string 

  @column({columnName:'isActivated'})
  public isActivated :boolean 


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

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
