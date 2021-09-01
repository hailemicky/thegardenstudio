import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Instructors extends BaseSchema {
  protected tableName = 'instructors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('firstName', 50).notNullable()
      table.string('lastName', 50).notNullable()
      table.string('title', 50).notNullable()
      table.string('email', 150).notNullable()
      table.string('profilePicture', 254)
      table.string('accountId', 180)
      table.string('instagramUrl', 254)
      table.string('facebookUrl', 254)
      table.string('linkedinUrl', 254)
      table.string('twitterUrl', 254)
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
