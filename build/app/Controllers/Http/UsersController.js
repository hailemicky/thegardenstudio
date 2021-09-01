"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const randomstring_1 = __importDefault(require("randomstring"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const Mail_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/Mail"));
const Instructor_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Instructor"));
class UsersController {
    async index({ view }) {
        const instructors = await Instructor_1.default
            .query()
            .preload('packages')
            .preload('classes');
        return view.render('index', { instructors });
    }
    async create({ request, response, session }) {
        await User_1.default.create({
            email: request.input('email'),
            userType: request.input('userType'),
            password: request.input('password'),
            firstName: request.input('firstName'),
            lastName: request.input('lastName'),
            title: request.input('title'),
            confirmationToken: randomstring_1.default.generate(),
            isActivated: false
        });
        session.flash({
            notification: {
                type: 'success',
                message: 'Registration is successfull.An email is sent to your email address. Please confirm you email address'
            }
        });
        return response.redirect().toPath('/auth/login');
    }
    async login({ request, response, auth }) {
        const { email, password, remember } = request.all();
        const user = await User_1.default.query()
            .where('email', email)
            .where('isActivated', false)
            .first();
        if (user) {
            if (await Hash_1.default.verify(user.password, password)) {
                try {
                    await auth.use('web').login(user, remember);
                    return response.redirect().toRoute('dashboard');
                }
                catch (error) {
                    console.log(error);
                    return response.redirect().toRoute('logout');
                }
            }
        }
    }
    async dashboard({ auth, view }) {
        if (auth.user.userType == 1) {
            return view.render('admin/dashboard');
        }
        else {
            return view.render('instructor/dashboard');
        }
    }
    async logout({ response, auth, session }) {
        await auth.logout();
        session.flash({
            notification: {
                type: 'success',
                message: 'user has been loged out successfuly'
            }
        });
        return response.redirect().toRoute('login');
    }
    async contactMail({ request, response }) {
        try {
            await Mail_1.default.send((message) => {
                message
                    .from('info@example.com')
                    .to('info@thegarden614.com')
                    .subject(request.input('subject'))
                    .htmlView('emails/contact', { name: request.input('name'), subject: request.input('subject'), message: request.input('message') });
            });
            return response.redirect().toRoute('home');
        }
        catch (error) {
            return response.redirect().toRoute('home', { error });
        }
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map