let axios = require('axios')
let { isNode } = require('browser-or-node')
if (isNode) {
  const FormData = require('form-data')
}

class Model {
  constructor() {
    if (isNode) {
      let https = require('https')
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      })
      axios.defaults.httpsAgent = httpsAgent
    }
  }

  credential({ authorization, url }) {
    axios.defaults.baseURL = url
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authorization
    return this
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
      let res = await axios.post(this.route, fd, this.extraParams(fd))
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
      let res = await axios.post(this.route + '/' + id + '?_method=PUT', fd, this.extraParams(fd))
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

  extraParams(fd) {
    if (isNode) {
      return {
        headers: {
          ...fd.getHeaders(),
        },
      }
    } else {
      return null
    }
  }
}

module.exports = Model
