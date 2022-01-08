let axios = require('axios')
let https = require('https')
let env = require('dotenv').config()
const FormData = require('form-data')

class Model {
  constructor() {
    let baseUrl = process.env.MANAW_BASE_URL
    if (baseUrl) {
      baseUrl = baseUrl
    } else {
      baseUrl = 'https://api.manawstore.com/v1'
    }
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    })
    axios.defaults.httpsAgent = httpsAgent
    axios.defaults.baseURL = baseUrl
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + process.env.MANAW_API_KEY
  }

  async get(params) {
    try {
      let res = await axios.get(this.route, { params })
      return res.data
    } catch (error) {
      if (error.response) {
        throw error.response.data
      } else {
        throw error.message
      }
    }
  }

  async create(params) {
    try {
      let fd = this.getParams(params)
      let res = await axios.post(this.route, fd, {
        headers: {
          ...fd.getHeaders(),
        },
      })
      return res.data
    } catch (error) {
      if (error.response) {
        throw error.response.data
      } else {
        throw error.message
      }
    }
  }

  async update(params, id) {
    try {
      let fd = this.getParams(params)
      let res = await axios.post(this.route + '/' + id + '?_method=PUT', fd, {
        headers: {
          ...fd.getHeaders(),
        },
      })
      return res.data
    } catch (error) {
      if (error.response) {
        throw error.response.data
      } else {
        throw error.message
      }
    }
  }

  async delete(id) {
    try {
      let res = await axios.post(this.route + '/' + id)
      return res.data
    } catch (error) {
      if (error.response) {
        throw error.response.data
      } else {
        throw error.message
      }
    }
  }

  getParams(params) {
    const fd = new FormData()
    for (let p in params) {
      let value = params[p]
      fd.append(p, value)
    }
    return fd
  }
}

module.exports = Model
