export default function (data: ReqDataFormat){
    if(data.auth){
        if(data.auth.password){
            data.auth.password = '[HIDDEN]'
        }
    }

    return data
}