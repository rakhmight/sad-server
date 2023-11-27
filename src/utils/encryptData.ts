import { createCipheriv } from 'crypto'

export async function encryptData(symmetricKeyData:string, data:Object){
    const symmetricKey:SymmetricKey = JSON.parse(symmetricKeyData)
    
    const key = Uint8Array.from(atob(symmetricKey.key), c => c.charCodeAt(0));
    const iv = Uint8Array.from(atob(symmetricKey.iv), c => c.charCodeAt(0));

    const cipher = createCipheriv(symmetricKey.algorithm, key, iv);
    const encryptedData = await cipher.update(JSON.stringify(data), symmetricKey.encoding, symmetricKey.notation) + cipher.final(symmetricKey.notation);
    //console.log(`Encrypted: ${encryptedData}`);
    
    return encryptedData
}