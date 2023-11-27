declare interface SymmetricKey {
    key: string,
    iv: string,
    algorithm: string,
    encoding: import('crypto').Encoding,
    notation: import('crypto').Encoding
}

declare type ReqDataFormat = {
    auth?: {
        password: string
    }
}