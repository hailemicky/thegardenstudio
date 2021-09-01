"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const Class_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Class"));
const Package_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Package"));
class Instructor extends Orm_1.BaseModel {
}
__decorate([
    Orm_1.column({ isPrimary: true }),
    __metadata("design:type", Number)
], Instructor.prototype, "id", void 0);
__decorate([
    Orm_1.column({ columnName: 'firstName' }),
    __metadata("design:type", String)
], Instructor.prototype, "firstName", void 0);
__decorate([
    Orm_1.column({ columnName: 'lastName' }),
    __metadata("design:type", String)
], Instructor.prototype, "lastName", void 0);
__decorate([
    Orm_1.column({ columnName: 'email' }),
    __metadata("design:type", String)
], Instructor.prototype, "email", void 0);
__decorate([
    Orm_1.column({ columnName: 'title' }),
    __metadata("design:type", String)
], Instructor.prototype, "title", void 0);
__decorate([
    Orm_1.column({ columnName: 'accountId' }),
    __metadata("design:type", String)
], Instructor.prototype, "accountId", void 0);
__decorate([
    Orm_1.column({ columnName: 'profilePicture' }),
    __metadata("design:type", String)
], Instructor.prototype, "profilePicture", void 0);
__decorate([
    Orm_1.column({ columnName: 'instagramUrl' }),
    __metadata("design:type", String)
], Instructor.prototype, "instagramUrl", void 0);
__decorate([
    Orm_1.column({ columnName: 'facebookUrl' }),
    __metadata("design:type", String)
], Instructor.prototype, "facebookUrl", void 0);
__decorate([
    Orm_1.column({ columnName: 'linkedinUrl' }),
    __metadata("design:type", String)
], Instructor.prototype, "linkedinUrl", void 0);
__decorate([
    Orm_1.column({ columnName: 'twitterUrl' }),
    __metadata("design:type", String)
], Instructor.prototype, "twitterUrl", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Instructor.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Instructor.prototype, "updatedAt", void 0);
__decorate([
    Orm_1.hasMany(() => Class_1.default, {
        foreignKey: 'instructor',
    }),
    __metadata("design:type", Object)
], Instructor.prototype, "classes", void 0);
__decorate([
    Orm_1.hasMany(() => Package_1.default, {
        foreignKey: 'instructor',
    }),
    __metadata("design:type", Object)
], Instructor.prototype, "packages", void 0);
exports.default = Instructor;
//# sourceMappingURL=Instructor.js.map