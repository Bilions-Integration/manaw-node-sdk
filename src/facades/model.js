let axios = require('axios')
let { isNode } = require('browser-or-node')
if (isNode) {
  const FormData = require('form-data')
}

class Model {
  /**
   * set up http agent for node js
   */
  constructor() {
    if (isNode) {
      let https = require('https')
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      })
      axios.defaults.httpsAgent = httpsAgent
    }
  }
  /**
   * request credential
   *
   * @param {authorization, url} params
   * @returns
   */
  credential({ authorization, url }) {
    axios.defaults.baseURL = url
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authorization
    return this
  }

  /**
   * get records from api
   *
   * @param {page, limit, keyword} params
   * @returns
   */
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

  /**
   * create a record
   *
   * @param {object} params
   * @returns
   */
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

  /**
   * update a record
   *
   * @param {object} params
   * @param {integer} id
   * @returns
   */
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

  /**
   * Delete a record
   *
   * @param {integer} id
   * @returns
   */
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

  /**
   * setup a form data param to sent api
   * since some api required file update feature
   * @param {object} params
   * @returns
   */
  getParams(params) {
    const fd = new FormData()
    for (let p in params) {
      let value = params[p]
      if (value) {
        fd.append(p, value)
      }
    }
    return fd
  }

  /**
   * Node js required associated headers to sent through api
   *
   * @param {FormData} fd
   * @returns
   */
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
