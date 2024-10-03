import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthService from 'App/Services/AuthService'

export default class AuthController {
  public async create({ request, response }: HttpContextContract) {
    const name = request.input('name')

    if (!name) {
      return response.status(400).send({ error: 'Name is required.' })
    }

    try {
      const accessKey = await AuthService.createAccessKey(name)
      return response.status(201).send(accessKey)
    } catch (error) {
      const unique = error.message.includes('unique')
      if (unique) {
        return response.status(500).send({ error: 'Uma aplicação com este nome já existe' })
      }
      return response.status(500).send({ error: 'Failed to create token' })
    }
  }
}