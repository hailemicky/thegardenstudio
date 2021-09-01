"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instructor_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Instructor"));
const Class_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Class"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const fs_1 = require("fs");
class ClassesController {
    async index({ view }) {
        const instructors = await Instructor_1.default
            .query()
            .preload('classes');
        return view.render('admin/class', { instructors });
    }
    async create({ request, response }) {
        const classPicture = request.file('classPicture');
        if (classPicture) {
            try {
                const fileName = `${Helpers_1.cuid()}.${classPicture.extname}`;
                await Class_1.default.create({
                    className: request.input('className'),
                    classDetail: request.input('classDetail'),
                    instructor: request.input('instructor'),
                    time: request.input('time'),
                    when: request.input('when'),
                    type: request.input('type'),
                    price: request.input('price'),
                    classPicture: fileName,
                });
                await classPicture.move(Application_1.default.publicPath('uploads'), {
                    name: fileName,
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        const instructors = await Instructor_1.default
            .query()
            .preload('classes');
        return response.redirect().toRoute('classes', { instructors });
    }
    async store({}) {
    }
    async show({ params, view }) {
        const clase = await Class_1.default.findOrFail(params.id);
        const instructors = await Instructor_1.default.query().preload('classes', (profileQuery) => {
            profileQuery.where('id', params.id);
        });
        console.log();
        return view.render('admin/class_update', { instructors, clase });
    }
    async edit({}) {
    }
    async update({ params, request, response }) {
        try {
            const clase = await Class_1.default.findOrFail(params.id);
            clase.className = request.input('className');
            clase.classDetail = request.input('classDetail');
            clase.instructor = request.input('instructor');
            clase.when = request.input('when');
            clase.time = request.input('time');
            clase.type = request.input('type');
            clase.price = request.input('price');
            clase.save();
            return response.redirect().toRoute('classUpdateShow', { id: params.id });
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateClassPicture({ params, request, response }) {
        try {
            const clase = await Class_1.default.findOrFail(params.id);
            const classPicture = request.file('classPicture');
            if (classPicture) {
                fs_1.access(Application_1.default.publicPath('uploads/' + clase.classPicture), (err) => {
                    if (!err) {
                        console.error('myfile already exists');
                        fs_1.unlink(Application_1.default.publicPath('uploads/' + clase.classPicture), (err) => {
                            if (err)
                                throw err;
                            console.log(Application_1.default.publicPath('uploads/' + clase.classPicture) + 'was deleted');
                        });
                    }
                });
                const fileName = `${Helpers_1.cuid()}.${classPicture.extname}`;
                await classPicture.move(Application_1.default.publicPath('uploads'), {
                    name: fileName,
                });
                clase.classPicture = fileName;
                clase.save();
                return response.redirect().toRoute('classUpdateShow', { id: params.id });
            }
        }
        catch (error) {
            console.log(error);
            return response.redirect().toRoute('classUpdateShow', { id: params.id });
        }
    }
    async destroy({ params, response }) {
        const clase = await Class_1.default.findOrFail(params.id);
        fs_1.access(Application_1.default.publicPath('uploads/' + clase.classPicture), (err) => {
            if (!err) {
                console.error('myfile already exists');
                fs_1.unlink(Application_1.default.publicPath('uploads/' + clase.classPicture), (err) => {
                    if (err)
                        throw err;
                    console.log(Application_1.default.publicPath('uploads/' + clase.classPicture) + 'was deleted');
                });
            }
        });
        await clase.delete();
        const classes = await Class_1.default.all();
        return response.redirect().toRoute('classes', { classes });
    }
}
exports.default = ClassesController;
//# sourceMappingURL=ClassesController.js.map