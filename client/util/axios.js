import axios from 'axios'
import config from 'dotenv'

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DOMAIN
})

export default API