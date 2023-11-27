import { createDecipheriv } from 'crypto'

export async function decryptData(symmetricKeyData:string, encryptedData:string){
    try {        
        const symmetricKey:SymmetricKey = JSON.parse(symmetricKeyData)

        const key = Uint8Array.from(atob(symmetricKey.key), c => c.charCodeAt(0));
        const iv = Uint8Array.from(atob(symmetricKey.iv), c => c.charCodeAt(0));

        const decipher = createDecipheriv( symmetricKey.algorithm, key, iv);
        const decryptedData = await decipher.update(encryptedData, symmetricKey.notation, symmetricKey.encoding) + decipher.final( symmetricKey.encoding);
        // console.log(`Deciphered: ${decryptedData}`);

        return decryptedData
    } catch (error) {
        throw Error('invalid-key')
    }
}