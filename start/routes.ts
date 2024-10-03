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

  //teste
Route.group(() => {
  Route.post('teste', 'MotoristaController.test')
}).middleware('auth')

//teste
Route.group(() => {
  Route.post('teste', 'TestController.test')
}).middleware('auth')