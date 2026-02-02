import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: '77f888b55592551240b4e042cec073b9',
        language: 'pt-BR',
        page: 1
    }
})

export default api