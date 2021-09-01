"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Packages extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'packages';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('instructor').unsigned().notNullable().references('instructors.id').onDelete('CASCADE');
            table.string('detail', 250);
            table.string('atb1', 50);
            table.string('atb2', 50);
            table.string('atb3', 150);
            table.string('atb4', 150);
            table.string('price', 150);
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Packages;
//# sourceMappingURL=1623659256953_packages.js.map