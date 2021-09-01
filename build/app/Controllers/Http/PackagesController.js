"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instructor_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Instructor"));
const Package_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Package"));
class PackagesController {
    async index({ view }) {
        const instructors = await Instructor_1.default
            .query()
            .preload('packages');
        return view.render('admin/package', { instructors });
    }
    async create({ request, response }) {
        try {
            await Package_1.default.create({
                instructor: request.input('instructor'),
                detail: request.input('detail'),
                atb1: request.input('atb1'),
                atb2: request.input('atb2'),
                atb3: request.input('atb3'),
                atb4: request.input('atb4'),
                price: request.input('price'),
            });
            const instructors = await Instructor_1.default
                .query()
                .preload('packages');
            return response.redirect().toRoute('packages', { instructors });
        }
        catch (error) {
        }
    }
    async store({}) {
    }
    async show({ params, view }) {
        try {
            const packag = await Package_1.default.findOrFail(params.id);
            const instructors = await Instructor_1.default.all();
            return view.render('admin/packages_update', { packag, instructors });
        }
        catch (error) {
        }
    }
    async edit({}) {
    }
    async update({ request, response, params }) {
        try {
            const packag = await Package_1.default.findOrFail(params.id);
            packag.instructor = request.input('instructor');
            packag.detail = request.input('detail');
            packag.atb1 = request.input('atb1');
            packag.atb2 = request.input('atb2');
            packag.atb3 = request.input('atb3');
            packag.atb4 = request.input('atb4');
            packag.price = request.input('price');
            packag.save();
            const instructors = await Instructor_1.default.all();
            return response.redirect().toRoute('packageUpdateShow', { id: params.id, instructors });
        }
        catch (error) {
        }
    }
    async destroy({ params, response }) {
        try {
            const packag = await Package_1.default.findOrFail(params.id);
            await packag.delete();
            const packages = await Package_1.default.all();
            const instructors = await Instructor_1.default.all();
            return response.redirect().toRoute('packages', { packages, instructors });
        }
        catch (error) {
        }
    }
}
exports.default = PackagesController;
//# sourceMappingURL=PackagesController.js.map