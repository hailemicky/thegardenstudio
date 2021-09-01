"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instructor_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Instructor"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const fs_1 = require("fs");
const Mail_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/Mail"));
const stripe = require('stripe')('sk_test_51J0U0NAHIFpzuWxfoMuq1xgQ9r28fLiClDx64hzFrMqSnuxKkkt5IFE2VLFr4GvbuheTzzxe1SN9kSPNmBhMdFiF00eSa86QkO');
class InstructorsController {
    async index({ view }) {
        const instructors = await Instructor_1.default.all();
        return view.render('admin/instructor', { instructors });
    }
    async create({ request, response }) {
        const profilePicture = request.file('profilePicture');
        const account = await stripe.accounts.create({
            type: 'standard',
        });
        const accountLinks = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: 'https://localhost:3333/login',
            return_url: 'https://localhost:3333/instructor',
            type: 'account_onboarding',
        });
        console.log(accountLinks);
        if (profilePicture) {
            try {
                const fileName = `${Helpers_1.cuid()}.${profilePicture.extname}`;
                await Instructor_1.default.create({
                    firstName: request.input('firstName'),
                    lastName: request.input('lastName'),
                    title: request.input('title'),
                    email: request.input('email'),
                    accountId: account.id,
                    twitterUrl: request.input('twitterUrl'),
                    facebookUrl: request.input('facebookUrl'),
                    linkedinUrl: request.input('linkedinUrl'),
                    instagramUrl: request.input('instagramUrl'),
                    profilePicture: fileName
                });
                await profilePicture.move(Application_1.default.publicPath('uploads'), {
                    name: fileName,
                });
                await Mail_1.default.send((message) => {
                    message
                        .from('info@thegarden614.com')
                        .to(request.input('email'))
                        .subject('Welcome to The Garden Studio Payment integration')
                        .htmlView('emails/onboard', { name: request.input('lastName'), url: accountLinks.url, });
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        const instructors = await Instructor_1.default.all();
        return response.redirect().toRoute('instructor', { instructors });
    }
    async store({}) {
    }
    async show({ params, view }) {
        const instructor = await Instructor_1.default.findOrFail(params.id);
        return view.render('admin/instructor_update', { instructor });
    }
    async updateInstructorPicture({ params, request, response }) {
        try {
            const instructor = await Instructor_1.default.findOrFail(params.id);
            const profilePicture = request.file('profilePicture');
            if (profilePicture) {
                fs_1.access(Application_1.default.publicPath('uploads/' + instructor.profilePicture), (err) => {
                    if (!err) {
                        console.error('myfile already exists');
                        fs_1.unlink(Application_1.default.publicPath('uploads/' + instructor.profilePicture), (err) => {
                            if (err)
                                throw err;
                            console.log(Application_1.default.publicPath('uploads/' + instructor.profilePicture) + 'was deleted');
                        });
                    }
                });
                const fileName = `${Helpers_1.cuid()}.${profilePicture.extname}`;
                await profilePicture.move(Application_1.default.publicPath('uploads'), {
                    name: fileName,
                });
                instructor.profilePicture = fileName;
                instructor.save();
                return response.redirect().toRoute('instructorUpdateShow', { id: params.id });
            }
        }
        catch (error) {
            console.log(error);
            return response.redirect().toRoute('instructorUpdateShow', { id: params.id });
        }
    }
    async edit({}) {
    }
    async update({ params, request, response }) {
        try {
            const instructor = await Instructor_1.default.findOrFail(params.id);
            instructor.firstName = request.input('fristName');
            instructor.lastName = request.input('lastName');
            instructor.title = request.input('title');
            instructor.email = request.input('email');
            instructor.twitterUrl = request.input('twitterUrl');
            instructor.facebookUrl = request.input('facebookUrl');
            instructor.linkedinUrl = request.input('linkedinUrl');
            instructor.instagramUrl = request.input('instagramUrl');
            instructor.save();
            return response.redirect().toRoute('instructorUpdateShow', { id: params.id });
        }
        catch (error) {
        }
    }
    async destroy({ params, response }) {
        const instructor = await Instructor_1.default.findOrFail(params.id);
        fs_1.access(Application_1.default.publicPath('uploads/' + instructor.profilePicture), (err) => {
            if (!err) {
                console.error('myfile already exists');
                fs_1.unlink(Application_1.default.publicPath('uploads/' + instructor.profilePicture), (err) => {
                    if (err)
                        throw err;
                    console.log(Application_1.default.publicPath('uploads/' + instructor.profilePicture) + 'was deleted');
                });
            }
        });
        await instructor.delete();
        const instructors = await Instructor_1.default.all();
        return response.redirect().toRoute('instructor', { instructors });
    }
}
exports.default = InstructorsController;
//# sourceMappingURL=InstructorsController.js.map