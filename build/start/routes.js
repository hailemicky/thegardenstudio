"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', 'UsersController.index').as('home');
Route_1.default.post('/contactMail', 'UsersController.contactMail').as('contactMail');
Route_1.default.get('/auth/login', async ({ view }) => {
    return view.render('auth/login');
}).as('loginForm');
Route_1.default.post('auth/login', 'UsersController.login').as('login');
Route_1.default.get('/auth/register', async ({ view }) => {
    return view.render('auth/register');
}).as('registerForm');
Route_1.default.post('/auth/register', 'UsersController.create').as('register');
Route_1.default.get('/success', async ({ view }) => {
    return view.render('success');
}).as('pay.success');
Route_1.default.get('/auth/logout', 'UsersController.logout').as('logout').middleware('auth');
Route_1.default.get('/dashboard', 'UsersController.dashboard').as('dashboard').middleware('auth').middleware('auth');
Route_1.default.get('/instructor', 'InstructorsController.index').as('instructor').middleware('auth');
Route_1.default.post('/instructor', 'InstructorsController.create').as('instructorAdd').middleware('auth');
Route_1.default.post('/instructor/:id', 'InstructorsController.destroy').as('instructorDelete').middleware('auth');
Route_1.default.get('/instructor/update/:id', 'InstructorsController.show').as('instructorUpdateShow').middleware('auth');
Route_1.default.post('/instructor/update/:id', 'InstructorsController.update').as('instructorUpdate').middleware('auth');
Route_1.default.post('/instructor/profilePicture/update/:id', 'InstructorsController.updateInstructorPicture').as('updateInstructorPicture').middleware('auth');
Route_1.default.get('/classes', 'ClassesController.index').as('classes').middleware('auth');
Route_1.default.post('/classes', 'ClassesController.create').as('classesAdd').middleware('auth');
Route_1.default.post('/classes/:id', 'ClassesController.destroy').as('classDelete').middleware('auth');
Route_1.default.get('/classes/update/:id', 'ClassesController.show').as('classUpdateShow').middleware('auth');
Route_1.default.post('/classes/update/:id', 'ClassesController.update').as('classUpdate').middleware('auth');
Route_1.default.post('/classes/profilePicture/update/:id', 'ClassesController.updateClassPicture').as('updateClassPicture').middleware('auth');
Route_1.default.get('/packages', 'PackagesController.index').as('packages').middleware('auth');
Route_1.default.post('/packages', 'PackagesController.create').as('packageAdd').middleware('auth');
Route_1.default.post('/packages/:id', 'PackagesController.destroy').as('packageDelete').middleware('auth');
Route_1.default.get('/packages/update/:id', 'PackagesController.show').as('packageUpdateShow').middleware('auth');
Route_1.default.post('/packages/update/:id', 'PackagesController.update').as('packageUpdate').middleware('auth');
Route_1.default.post('/createCheckoutSession', 'ShopsController.createCheckoutSession');
Route_1.default.post('/webhook', 'ShopsController.webhook').as('webhook');
Route_1.default.get('/createCustomer', 'ShopsController.createCustomer');
Route_1.default.get('/createAccountLink', 'ShopsController.createAccountLink');
//# sourceMappingURL=routes.js.map