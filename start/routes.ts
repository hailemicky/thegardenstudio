/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'



Route.get('/', 'UsersController.index').as('home')

Route.post('/contactMail', 'UsersController.contactMail').as('contactMail')

Route.get('/auth/login', async ({ view }) => {
  return view.render('auth/login')
}).as('loginForm')


Route.post('auth/login','UsersController.login').as('login')


Route.get('/auth/register', async ({ view }) => {
  return view.render('auth/register')
}).as('registerForm')

Route.post('/auth/register','UsersController.create').as('register')

Route.get('/success', async ({ view }) => {
  return view.render('success')
}).as('pay.success')


Route.get('/auth/logout','UsersController.logout').as('logout').middleware('auth')

Route.get('/dashboard' ,'UsersController.dashboard').as('dashboard').middleware('auth').middleware('auth')
Route.get('/instructor' ,'InstructorsController.index').as('instructor').middleware('auth')
Route.post('/instructor' ,'InstructorsController.create').as('instructorAdd').middleware('auth')
Route.post('/instructor/:id' ,'InstructorsController.destroy').as('instructorDelete').middleware('auth')
Route.get('/instructor/update/:id','InstructorsController.show').as('instructorUpdateShow').middleware('auth')
Route.post('/instructor/update/:id','InstructorsController.update').as('instructorUpdate').middleware('auth')
Route.post('/instructor/profilePicture/update/:id','InstructorsController.updateInstructorPicture').as('updateInstructorPicture').middleware('auth')




Route.get('/classes','ClassesController.index').as('classes').middleware('auth')
Route.post('/classes' ,'ClassesController.create').as('classesAdd').middleware('auth')
Route.post('/classes/:id' ,'ClassesController.destroy').as('classDelete').middleware('auth')
Route.get('/classes/update/:id','ClassesController.show').as('classUpdateShow').middleware('auth')
Route.post('/classes/update/:id','ClassesController.update').as('classUpdate').middleware('auth')
Route.post('/classes/profilePicture/update/:id','ClassesController.updateClassPicture').as('updateClassPicture').middleware('auth')


Route.get('/packages','PackagesController.index').as('packages').middleware('auth')
Route.post('/packages' ,'PackagesController.create').as('packageAdd').middleware('auth')
Route.post('/packages/:id' ,'PackagesController.destroy').as('packageDelete').middleware('auth')
Route.get('/packages/update/:id','PackagesController.show').as('packageUpdateShow').middleware('auth')
Route.post('/packages/update/:id','PackagesController.update').as('packageUpdate').middleware('auth')

Route.post('/createCheckoutSession', 'ShopsController.createCheckoutSession')
Route.post('/webhook', 'ShopsController.webhook').as('webhook')


Route.get('/createCustomer','ShopsController.createCustomer')
Route.get('/createAccountLink','ShopsController.createAccountLink')

