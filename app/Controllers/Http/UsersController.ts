// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


import User from 'App/Models/User'
import randomString from 'randomstring'
import Hash from '@ioc:Adonis/Core/Hash'
import Mail from '@ioc:Adonis/Addons/Mail'
import Instructor from 'App/Models/Instructor'



export default class UsersController {
    

    async index({view}){


        const instructors = await Instructor
    .query()
    .preload('packages')
    .preload('classes')


        return view.render('index',{instructors})
    }

    async create({ request, response,  session }) {
    
        

        await User.create({

                    email: request.input('email'),
                    userType: request.input('userType'),
                    password: request.input('password'),
                    firstName:request.input('firstName'),
                    lastName:request.input('lastName'),
                    title:request.input('title'),
                    confirmationToken : randomString.generate(),
                    isActivated: false

                })
                //send confirmation email

            // await Mail.send('auth.emails.studioRegistryEmail', user.toJSON(), message => {
            //     message.to(user.email)
            //         .from('hello@album.com')
            //         .subject("Album : Freelancer Registration Successfull")
            // })


            // display success message
            session.flash({
                notification: {
                    type: 'success',
                    message: 'Registration is successfull.An email is sent to your email address. Please confirm you email address'
                }
            })

            return response.redirect().toPath('/auth/login')
        

    }


    async login({ request, response, auth }) {
       
        //get data from the form
        const { email, password, remember } = request.all();


        // find the email form database
        const user = await User.query()
            .where('email', email)
            .where('isActivated', false)
            .first()


      



            // Check User

        if (user) {


            //Verify password     
          
   

            if (await Hash.verify( user.password, password)) {
                
                //login the user
                try {

                    await auth.use('web').login(user, remember)
                   
                    return response.redirect().toRoute('dashboard')


                } 
            
        
                catch (error) {
                    console.log(error)
                    // console.log(error)
                    return response.redirect().toRoute('logout')

                }


            }

        }



    }


    async dashboard({auth,view}){
        if(auth.user.userType==1){

            return view.render('admin/dashboard')
        }
        else{

            return view.render('instructor/dashboard')

        }
    }

    async logout({ response, auth, session }) {

        await auth.logout()

        session.flash({

            notification: {
                type: 'success',
                message: 'user has been loged out successfuly'

            }
        })

        return response.redirect().toRoute('login')

    }

    async contactMail({request, response})
    {
        try{
        await Mail.send((message) => {
            message
              .from('info@example.com')
              .to('info@thegarden614.com')
              .subject(request.input('subject'))
              .htmlView('emails/contact', { name :request.input('name'),subject:request.input('subject'),message: request.input('message') })
          })
          return response.redirect().toRoute('home')
          
        }
        catch(error){
            return response.redirect().toRoute('home', {error})

        }
      
    }

}
