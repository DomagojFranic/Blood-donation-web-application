import axios from 'axios'
const mainUrl = 'http://localhost:3001/api/login'

const login = async datas => {
  const resp = await axios.post(mainUrl, datas)
  return resp.data
}

export default {login}