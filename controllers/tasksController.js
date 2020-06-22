const { matchedData } = require('express-validator')
const Task = require('../models').Task
const Experiment = require('../models').Experiment
const ExperimentTask = require('../models').ExperimentTask
const logger = require('../logs/logger')

module.exports = {

  /** Create task */
  create: (req, res) => {

    let data = matchedData(req, { locations: ['body'] })
    Task.create(data).then((task) => {

      res.set('Location', `/tasks/${task.id}`)
      res.sendStatus(201)

    }).catch((error) => {
      logger.error(error)
      res.sendStatus(500)
    })
  },

  /** Get all tasks */
  getAll: async (req, res) => {

    try {

      const offset = (req.query.page - 1) * req.query.perPage
      let tasks = await Task.findAll({
        offset: offset,
        limit: req.query.perPage,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: Experiment,
            as: 'experiments'
          }
        ]
      })

      const numberOfRecords = await Task.count()
      const numberOfPages = Math.ceil(numberOfRecords / req.query.perPage)

      tasks = tasks.map((task) => {
        return {
          id: task.id,
          readOnly: !! task.experiments.length,
          title: task.title,
          description: task.description,
          link: task.link,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        }
      })

      res.json({
        data: tasks,
        metadata: {
          perPage: req.query.perPage,
          page: req.query.page,
          numberOfPages: numberOfPages,
          from: tasks.length ? offset + 1 : null,
          to: tasks.length ? offset + tasks.length : null,
          total: numberOfRecords
        }
      })

    } catch (error) {

      logger.error(error)
      res.sendStatus(500)

    }
  },

  /** Get single task */
  get: (req, res) => {

    Task.findByPk(req.params.id, {
      include: [
        {
          model: Experiment,
          as: 'experiments'
        }
      ]
    }).then((task) => {

      if (! task) {
        return res.sendStatus(404)
      }

      res.json({
        id: task.id,
        readOnly: !! task.experiments.length,
        title: task.title,
        description: task.description,
        link: task.link,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      })

    }).catch((error) => {
      logger.error(error)
      res.sendStatus(500)
    })
  },

  /** Update task */
  update: async (req, res) => {

    try {

      const task = await Task.findByPk(req.params.id, {
        include: [
          {
            model: Experiment,
            as: 'experiments'
          }
        ]
      })
      if (! task) {
        return res.sendStatus(404)
      }

      if (task.experiments.length > 0) {
        return res.sendStatus(409)
      }

      const data = matchedData(req, { locations: ['body'] })
      await Task.update(data, {where: {id: req.params.id}})

      res.sendStatus(200)

    } catch (error) {
      logger.error(error)
      res.sendStatus(500)
    }

  },

  /** Delete task */
  delete: async (req, res) => {

    try {

      const taskIsAssigned = !! await ExperimentTask.count({
        where: {
          taskId: req.params.id
        }
      })
      if (taskIsAssigned) {
        return res.sendStatus(409)
      }

      const numberOfDeletedItems = await Task.destroy({
        where: {
          id: req.params.id
        }
      })

      if (numberOfDeletedItems === 0) {
        return res.sendStatus(404)
      }
      res.sendStatus(200)

    } catch (error) {
      logger.error(error)
      res.sendStatus(500)
    }

  }

}
