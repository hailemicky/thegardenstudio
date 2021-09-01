import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Instructor from 'App/Models/Instructor'
import Class from 'App/Models/Class'
import Application from '@ioc:Adonis/Core/Application'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import {unlink,access} from 'fs'
// const stripe = require('stripe')('sk_test_51J0U0NAHIFpzuWxfoMuq1xgQ9r28fLiClDx64hzFrMqSnuxKkkt5IFE2VLFr4GvbuheTzzxe1SN9kSPNmBhMdFiF00eSa86QkO');

export default class ClassesController {
  public async index ({view}: HttpContextContract) {
    const instructors = await Instructor
  .query()
  .preload('classes')

 
    return view.render('admin/class',{instructors})

  }

  public async create ({request,response}: HttpContextContract) {

    const classPicture = request.file('classPicture')
     
  
    
    if (classPicture) {
  
      
  
      try{
  
          
      const fileName = `${cuid()}.${classPicture.extname}`
        


      // const product = await stripe.products.create({
      //   name: request.input('className'),
      //   unit_label:'class',
      //   description:request.input('classDetail'),
      //   shippable:false,
        
      // });


  
  
     
      await Class.create(
        {
          className:request.input('className'),
          classDetail:request.input('classDetail'),
          instructor:request.input('instructor'),
          time:request.input('time'),
          when:request.input('when'),
          type:request.input('type'),
          price:request.input('price'),
          classPicture:fileName,
        
        })
  
      await classPicture.move(Application.publicPath('uploads'), {
        name: fileName,
      })
      }
      catch(error){
        console.log(error)
      }
    }
  
  
    const instructors = await Instructor
  .query()
  .preload('classes')
  
  
      return response.redirect().toRoute('classes',{instructors}) 
          
       



  }

  public async store ({}: HttpContextContract) {
  }

  public async show ({params,view}: HttpContextContract) {

    const clase = await Class.findOrFail(params.id)

    const instructors = await Instructor.query().preload('classes'  ,(profileQuery) => {
      profileQuery.where('id',params.id)

    })
  
    console.log()
    return view.render('admin/class_update',{instructors,clase})


  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({params,request,response}: HttpContextContract) {

    try{

      const clase=await Class.findOrFail(params.id)

   

      //  const product = await stripe.products.update(clase.productId,{
      //   name: request.input('className'),
      //   unit_label:'class',
      //   description:request.input('classDetail'),
      //   shippable:false,
      // });




    
  
        
     

      
  

     

      clase.className=request.input('className')
      clase.classDetail=request.input('classDetail')
      clase.instructor=request.input('instructor')
      clase.when=request.input('when')
      clase.time=request.input('time')
      // clase.productId=product.id
      

      clase.type=request.input('type')
      clase.price=request.input('price')
    
      clase.save()
  
       return response.redirect().toRoute('classUpdateShow',{id:params.id})
      


    }

    catch (error){
      console.log(error)
    }
  }

  public async updateClassPicture({params, request,response}:HttpContextContract){

   
    
    try{
    const clase=await Class.findOrFail(params.id)
    const classPicture = request.file('classPicture')
      

      
    if (classPicture) {

     
      access(Application.publicPath('uploads/'+clase.classPicture), (err) => {
        if (!err) {
          console.error('myfile already exists');
  
          unlink(Application.publicPath('uploads/'+clase.classPicture) ,(err) => {
            if (err) throw err;
            console.log(Application.publicPath('uploads/'+clase.classPicture)  + 'was deleted');
             
          })
         
        }});
  
        
      const fileName = `${cuid()}.${classPicture.extname}`

      await classPicture.move(Application.publicPath('uploads'), {
        name: fileName,
      })

      clase.classPicture=fileName
      clase.save()
    

      return response.redirect().toRoute('classUpdateShow',{id:params.id})
    }

    }
    catch (error){
      console.log(error)

      return response.redirect().toRoute('classUpdateShow',{id:params.id})
    }
  }


  public async destroy ({params,response}: HttpContextContract) {

    const clase = await Class.findOrFail(params.id)


   

    access(Application.publicPath('uploads/'+clase.classPicture), (err) => {
      if (!err) {
        console.error('myfile already exists');

        unlink(Application.publicPath('uploads/'+clase.classPicture) ,(err) => {
          if (err) throw err;
          console.log(Application.publicPath('uploads/'+clase.classPicture)  + 'was deleted');
           
        })
       
      }});

      // await stripe.products.del(
      //   clase.productId
      //  );

      await clase.delete()

  

    const classes=await Class.all()


    return response.redirect().toRoute('classes',{classes} )



  }
}
