import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('userType', 1).notNullable()
      table.string('firstName', 50).notNullable()
      table.string('lastName', 50).notNullable()
      table.string('title', 50).notNullable()
      table.boolean('isActivated')
      table.string('confirmationToken', 180)
      table.string('accountId', 180)
      table.string('instagramUrl', 254)
      table.string('facebookUrl', 254)
      table.string('linkedinUrl', 254)
      table.string('twitterUrl', 254)
      table.string('remember_me_token').nullable()
      

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
