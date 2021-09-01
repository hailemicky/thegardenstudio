import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Classes extends BaseSchema {
  protected tableName = 'classes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('className', 50).notNullable()
      table.string('classDetail', 50).notNullable()
      table.string('when', 50).notNullable()
      table.integer('instructor').unsigned().notNullable().references('instructors.id').onDelete('CASCADE') 
      table.string('time', 150)
      table.integer('type')
      table.string('productId',254)
      table.string('priceId',254)
      table.string('price', 150)
      table.string('classPicture', 254)

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
