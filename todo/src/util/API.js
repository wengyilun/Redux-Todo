import axios from 'axios'
let token = localStorage.token || Math.random().toString(36).substr(-8)

const api = axios.create({
	baseURL: process.env.REACT_APP_CONTACTS_API_URL || "http://localhost:3000",
	timeout: 30000,
	headers:{
		'Accept':'application/json',
		'Authorization': token
	}
})

export const getAll =() => {
	api.get().then(res => res.data)
}
