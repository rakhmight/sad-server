import { Encoding, randomBytes } from 'crypto'

export async function generateSymmetricKey():Promise<SymmetricKey>{
    const key = await randomBytes(32).toString('base64');
    const iv = await randomBytes(16).toString('base64');
    
    return { key, iv, algorithm: 'aes256', encoding: 'utf8', notation: 'hex' }
}