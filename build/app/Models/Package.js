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
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
class Package extends Orm_1.BaseModel {
}
__decorate([
    Orm_1.column({ isPrimary: true }),
    __metadata("design:type", Number)
], Package.prototype, "id", void 0);
__decorate([
    Orm_1.column({ columnName: 'instructor' }),
    __metadata("design:type", String)
], Package.prototype, "instructor", void 0);
__decorate([
    Orm_1.column({ columnName: 'detail' }),
    __metadata("design:type", String)
], Package.prototype, "detail", void 0);
__decorate([
    Orm_1.column({ columnName: 'atb1' }),
    __metadata("design:type", String)
], Package.prototype, "atb1", void 0);
__decorate([
    Orm_1.column({ columnName: 'atb2' }),
    __metadata("design:type", String)
], Package.prototype, "atb2", void 0);
__decorate([
    Orm_1.column({ columnName: 'atb3' }),
    __metadata("design:type", String)
], Package.prototype, "atb3", void 0);
__decorate([
    Orm_1.column({ columnName: 'atb4' }),
    __metadata("design:type", String)
], Package.prototype, "atb4", void 0);
__decorate([
    Orm_1.column({ columnName: 'price' }),
    __metadata("design:type", String)
], Package.prototype, "price", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Package.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Package.prototype, "updatedAt", void 0);
exports.default = Package;
//# sourceMappingURL=Package.js.map