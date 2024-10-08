/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
*/
import Route from '@ioc:Adonis/Core/Route'

//Auth
Route.group(() => {
  Route.post('key/create', 'AuthController.create')
}).prefix('auth')
  .middleware('auth')

  //Send Message
Route.group(() => {
  Route.post('send/queue', 'SendMsgController.sendQueue')
}).middleware('auth')