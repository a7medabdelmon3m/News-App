const BASE_URL = `https://newsapi.org/v2/`
export type requestOptions={
    endpoint:string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any;
    
}
export async function ApiCall<T>({endpoint , method ="GET" , body }:requestOptions):Promise<T> {
    const url = `${BASE_URL}${endpoint}`
    console.log('our url : ' ,url );

    const headers = {
        'Content-Type':'application/json',
        'Accept':'application/json'
    }

    const config : RequestInit = {method , headers}

    if(body && method !== 'GET'){
        config.body = JSON.stringify(body)
    }

    try {
        const response = await fetch(url , config)
        const data = await response.json()

        if( !response.ok || data.status === 'error'){
            throw new Error(data.message || 'There was a problem connecting to the server')
        }

        return data as T
    } catch (error) {
        console.error(`[API ERROR]${method} ${endpoint}` , error)
        throw error
    }
}