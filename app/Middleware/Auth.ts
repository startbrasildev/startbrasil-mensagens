import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import AuthorizedKey from 'App/Models/AuthorizedKeys'

export default class AuthMiddleware {
  protected redirectTo = '/login'

  protected async authenticate(ctx: HttpContextContract) {
    const { request } = ctx
    const auth = request.input('auth')

    if (!auth || !auth.name || !auth.accessKey) {
      throw new AuthenticationException(
        'Access key or application name is missing',
        'E_MISSING_ACCESS_KEY',
        undefined,
        this.redirectTo,
      )
    }

    const { name, accessKey: accessToken } = auth

    const authorizedKey = await AuthorizedKey.query().where('name', name).first()

    if (!authorizedKey) {
      throw new AuthenticationException(
        'Unauthorized access',
        'E_UNAUTHORIZED_ACCESS',
        undefined,
        this.redirectTo,
      )
    }

    const isVerified = await Hash.verify(authorizedKey.content, accessToken)

    if (!isVerified) {
      throw new AuthenticationException(
        'Unauthorized access',
        'E_UNAUTHORIZED_ACCESS',
        undefined,
        this.redirectTo,
      )
    }
  }

  protected async checkIfTableIsEmpty(ctx: HttpContextContract) {
    const { request } = ctx

    const authorizedKeyCount = await AuthorizedKey.query().count('* as total')
    const isEmpty = authorizedKeyCount[0].$extras.total === 0

    if (isEmpty && request.url().includes('/auth/key/create')) {
      return true
    }

    return false
  }

  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const canAccessWithoutAuth = await this.checkIfTableIsEmpty(ctx)
    
    if (!canAccessWithoutAuth) {
      await this.authenticate(ctx)
    }

    await next()
  }
}
