import { v4 as uuidv4 } from 'uuid'
import AuthorizedKey from 'App/Models/AuthorizedKeys'

class AuthService {
  public async createAccessKey(name: string): Promise<{ accessKey: AuthorizedKey, originalContent: string }> {
    // Extrair as iniciais do nome
    const initials = name.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
    const originalContent = `${initials}-${uuidv4()}`


    const accessKey:any = new AuthorizedKey()
    accessKey.name = name
    accessKey.content = originalContent
    await accessKey.save()

    return { accessKey, originalContent }
  }
}

export default new AuthService()
