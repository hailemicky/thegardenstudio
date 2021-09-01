import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Packages extends BaseSchema {
  protected tableName = 'packages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('instructor').unsigned().notNullable().references('instructors.id').onDelete('CASCADE') 
      table.string('detail', 250)
      table.string('atb1', 50)
      table.string('atb2', 50)
      table.string('atb3', 150)
      table.string('atb4', 150)
      table.string('price', 150)
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
