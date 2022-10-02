import axios from 'axios'

const mainUrl = 'http://localhost:3001/api/newevents'

let token = null
const setToken = (newToken) => {
    token = `bearer ${newToken}`
}
 
const getAll = () => {   
    return axios.get(mainUrl);
}
 
const create = async newObject => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.post(mainUrl, newObject, config)
    return response
}
 
const update = (id, newObject) => {
    return axios.put(`${mainUrl}/${id}`, newObject)
}

const deletee = id => {
    const config = {
        headers: {Authorization: token}
    }
    return axios.delete(`${mainUrl}/${id}`, config)
}
 
export default { getAll, create, update, deletee, setToken}