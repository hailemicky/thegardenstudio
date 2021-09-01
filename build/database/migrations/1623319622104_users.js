"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class UsersSchema extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'users';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary();
            table.string('email', 255).notNullable();
            table.string('password', 180).notNullable();
            table.string('userType', 1).notNullable();
            table.string('firstName', 50).notNullable();
            table.string('lastName', 50).notNullable();
            table.string('title', 50).notNullable();
            table.boolean('isActivated');
            table.string('confirmationToken', 180);
            table.string('accountId', 180);
            table.string('instagramUrl', 254);
            table.string('facebookUrl', 254);
            table.string('linkedinUrl', 254);
            table.string('twitterUrl', 254);
            table.string('remember_me_token').nullable();
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = UsersSchema;
//# sourceMappingURL=1623319622104_users.js.map