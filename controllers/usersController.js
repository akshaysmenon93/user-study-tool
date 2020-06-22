const { matchedData } = require('express-validator')
const User = require('../models').User
const logger = require('../logs/logger')

module.exports = {

  /** Create User */
  create: (req, res) => {

    let data = matchedData(req, { locations: ['body'] })
    User.create(data).then((user) => {

      res.set('Location', `/users/${user.id}`)
      res.sendStatus(201)

    }).catch((error) => {
      logger.error(error)
      res.sendStatus(500)
    })
  },

  /** Get all users */
  getAll: async (req, res) => {

    try {

      const offset = (req.query.page - 1) * req.query.perPage
      let users = await User.findAll({offset: offset, limit: req.query.perPage, order: [['createdAt', 'DESC']]})

      const numberOfRecords = await User.count()
      const numberOfPages = Math.ceil(numberOfRecords / req.query.perPage)

      users = users.map((user) => {
        return {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      })

      res.json({
        data: users,
        metadata: {
          perPage: req.query.perPage,
          page: req.query.page,
          numberOfPages: numberOfPages,
          from: users.length ? offset + 1 : null,
          to: users.length ? offset + users.length : null,
          total: numberOfRecords
        }
      })

    } catch (error) {

      logger.error(error)
      res.sendStatus(500)

    }
  },

  /** Get single user */
  get: (req, res) => {

    User.findByPk(req.params.id).then((user) => {

      if (! user) {
        return res.sendStatus(404)
      }

      res.json({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })

    }).catch((error) => {
      logger.error(error)
      res.sendStatus(500)
    })
  },

  getByEmail: (req, res) => {
    let data = matchedData(req, { locations: ['body'] })
    User.findAll({where:{email : data.email}}).then((user) => {
      res.json({
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })

    }).catch((error) => {
      logger.error(error)
      res.sendStatus(500)
    })
  },

  /** Update user */
  update: async (req, res) => {

    try {

      const user = await User.findByPk(req.params.id)
      if (! user) {
        return res.sendStatus(404)
      }

      const data = matchedData(req, { locations: ['body'] })
      await User.update(data, {where: {id: req.params.id}})

      res.sendStatus(200)

    } catch (error) {
      logger.error(error)
      res.sendStatus(500)
    }

  },

  /** Delete user */
  delete: async (req, res) => {

    User.destroy({
      where: {
        id: req.params.id
      }
    }).then((numberOfDeletedItems) => {

      if (numberOfDeletedItems === 0) {
        return res.sendStatus(404)
      }
      res.sendStatus(200)

    }).catch(error => {

      logger.error(error)
      res.sendStatus(500)
    })

  }

}
