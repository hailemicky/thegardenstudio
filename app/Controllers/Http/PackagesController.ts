import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Instructor from 'App/Models/Instructor'
import Package from 'App/Models/Package'


export default class PackagesController {
  public async index ({view}: HttpContextContract) {
    const instructors = await Instructor
    .query()
    .preload('packages')


    return view.render('admin/package',{instructors})


  }

  public async create ({request,response}: HttpContextContract) {

    
    try{

    await Package.create({
      instructor:request.input('instructor'),
      detail:request.input('detail'),
      atb1:request.input('atb1'),
      atb2:request.input('atb2'),
      atb3:request.input('atb3'),
      atb4:request.input('atb4'),
      price:request.input('price'),

    })

    const instructors = await Instructor
    .query()
    .preload('packages')
 

    return response.redirect().toRoute('packages',{instructors})

  }
  catch(error){



  }


  }

  public async store ({}: HttpContextContract) {
  }

  public async show ({params,view}: HttpContextContract) {

    try{
    const packag = await Package.findOrFail(params.id)
    const instructors= await Instructor.all()


      return view.render('admin/packages_update',{packag,instructors})

    }

    catch(error){


    }

  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({request,response,params}: HttpContextContract) {

    try{

      const packag=await Package.findOrFail(params.id)

     packag.instructor=request.input('instructor')
     packag.detail=request.input('detail')
     packag.atb1=request.input('atb1')
     packag.atb2=request.input('atb2')
     packag.atb3=request.input('atb3')
     packag.atb4=request.input('atb4')
     packag.price=request.input('price')
    
      packag.save()

      const instructors = await Instructor.all()
  
       return response.redirect().toRoute('packageUpdateShow',{id:params.id, instructors})
      


    }

    catch(error){


    }
  }

  public async destroy ({params, response}: HttpContextContract) {
    
    
    try{
    const packag = await Package.findOrFail(params.id)

    await packag.delete()

    const packages= await Package.all()
    const instructors= await Instructor.all()
    
    return response.redirect().toRoute('packages',{packages, instructors})


    }

    catch (error){


    }

  }
}
