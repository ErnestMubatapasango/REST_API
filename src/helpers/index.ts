//Here we create authentication helpers which are going to help us encrypt the password or create a session token
import crypto from 'crypto'

const SECRET = 'TAWANDA-REST-API'

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex')
}