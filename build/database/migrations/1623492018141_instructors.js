"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Instructors extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'instructors';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary();
            table.string('firstName', 50).notNullable();
            table.string('lastName', 50).notNullable();
            table.string('title', 50).notNullable();
            table.string('email', 150).notNullable();
            table.string('profilePicture', 254);
            table.string('accountId', 180);
            table.string('instagramUrl', 254);
            table.string('facebookUrl', 254);
            table.string('linkedinUrl', 254);
            table.string('twitterUrl', 254);
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Instructors;
//# sourceMappingURL=1623492018141_instructors.js.map