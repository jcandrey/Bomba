import axios from 'axios'

const authAxios = axios.create({
    baseURL: 'https://bomba-ecommerce.herokuapp.com/', 
    headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        withCredentials: true
    }
})

export default authAxios