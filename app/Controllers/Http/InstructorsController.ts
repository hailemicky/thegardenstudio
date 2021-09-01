import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Instructor from 'App/Models/Instructor'
import Application from '@ioc:Adonis/Core/Application'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import {unlink,access} from 'fs'
import Mail from '@ioc:Adonis/Addons/Mail'
const stripe = require('stripe')('sk_test_51J0U0NAHIFpzuWxfoMuq1xgQ9r28fLiClDx64hzFrMqSnuxKkkt5IFE2VLFr4GvbuheTzzxe1SN9kSPNmBhMdFiF00eSa86QkO');
export default class InstructorsController {
  public async index ({view}: HttpContextContract) {
    
    const instructors=await Instructor.all()
   
    return view.render('admin/instructor',{instructors})
  }

  public async create ({request, response}: HttpContextContract) {
   
  const profilePicture = request.file('profilePicture')
     
  const account = await stripe.accounts.create({
   
    type: 'standard',
    
   
  });
  




  
  const accountLinks = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: 'https://localhost:3333/login',
    return_url: 'https://localhost:3333/instructor',
    type: 'account_onboarding',
  });

  console.log(accountLinks)
    
  if (profilePicture) {

    

    try{

        
    const fileName = `${cuid()}.${profilePicture.extname}`


   
    await Instructor.create(
      {
        firstName:request.input('firstName'),
        lastName:request.input('lastName'),
        title:request.input('title'),
        email:request.input('email'),
        accountId:account.id,
        twitterUrl:request.input('twitterUrl'),
        facebookUrl:request.input('facebookUrl'),
        linkedinUrl:request.input('linkedinUrl'),
        instagramUrl:request.input('instagramUrl'),
        profilePicture:fileName
      })

    await profilePicture.move(Application.publicPath('uploads'), {
      name: fileName,
    })

    await Mail.send((message) => {
      message
        .from('info@thegarden614.com')
        .to(request.input('email'))
        .subject('Welcome to The Garden Studio Payment integration')
        .htmlView('emails/onboard', { name :request.input('lastName'),url:accountLinks.url, })
    })

    }
    catch(error){
      console.log(error)
    }
  }


  const instructors=await Instructor.all()


    return response.redirect().toRoute('instructor',{instructors} )
  }

  public async store ({}: HttpContextContract) {
  }

  public async show ({params, view}: HttpContextContract) {


    const instructor =await Instructor.findOrFail(params.id)

    return view.render('admin/instructor_update',{instructor})

  }


  public async updateInstructorPicture({params, request,response}:HttpContextContract){

   
    
    try{
    const instructor=await Instructor.findOrFail(params.id)
    const profilePicture = request.file('profilePicture')
      

      
    if (profilePicture) {

     
      access(Application.publicPath('uploads/'+instructor.profilePicture), (err) => {
        if (!err) {
          console.error('myfile already exists');
  
          unlink(Application.publicPath('uploads/'+instructor.profilePicture) ,(err) => {
            if (err) throw err;
            console.log(Application.publicPath('uploads/'+instructor.profilePicture)  + 'was deleted');
             
          })
         
        }});
        
      const fileName = `${cuid()}.${profilePicture.extname}`

      await profilePicture.move(Application.publicPath('uploads'), {
        name: fileName,
      })

      instructor.profilePicture=fileName
      instructor.save()
    

      return response.redirect().toRoute('instructorUpdateShow',{id:params.id})
    }

    }
    catch (error){
      console.log(error)

      return response.redirect().toRoute('instructorUpdateShow',{id:params.id})
    }
  }


  public async edit ({}: HttpContextContract) {
  }

  public async update ({params,request,response}: HttpContextContract) {
    try{

      const instructor=await Instructor.findOrFail(params.id)

      instructor.firstName=request.input('fristName')
      instructor.lastName=request.input('lastName')
      instructor.title=request.input('title')
      instructor.email=request.input('email')
      instructor.twitterUrl=request.input('twitterUrl')
      instructor.facebookUrl=request.input('facebookUrl')
      instructor.linkedinUrl=request.input('linkedinUrl')
      instructor.instagramUrl=request.input('instagramUrl')
      instructor.save()
  
       return response.redirect().toRoute('instructorUpdateShow',{id:params.id})
      


    }

    catch (error){
      
    }

  }

  public async destroy ({params,response}: HttpContextContract) {
    
    
    const instructor = await Instructor.findOrFail(params.id)


    access(Application.publicPath('uploads/'+instructor.profilePicture), (err) => {
      if (!err) {
        console.error('myfile already exists');

        unlink(Application.publicPath('uploads/'+instructor.profilePicture) ,(err) => {
          if (err) throw err;
          console.log(Application.publicPath('uploads/'+instructor.profilePicture)  + 'was deleted');
           
        })
       
      }});

      await instructor.delete()

  

    const instructors=await Instructor.all()


    return response.redirect().toRoute('instructor',{instructors} )

  }
}
