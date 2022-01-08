let Model = require('./facades/model')

class Category extends Model {
  route = 'categories'

  constructor() {
    super()
  }
}

module.exports = new Category()
