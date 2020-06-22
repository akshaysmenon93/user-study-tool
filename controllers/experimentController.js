const { matchedData } = require('express-validator')
const Experiment = require('../models').Experiment
const ExperimentTask = require('../models').ExperimentTask
const Tasks = require('../models').Task
const logger = require('../logs/logger')
const { Op } = require("sequelize");

module.exports = {

  /** Create Experiment */
  create: async (req, res) => {

    let data = matchedData(req, { locations: ['body'] })

    var experimentData = {
      "title": data.title,
      "description": data.description
    }

    let newExpId = ''

    await Experiment.create(experimentData).then((experiment) => {
      newExpId = experiment.id
    }).catch((error) => {
      logger.error(error)
      res.sendStatus(500)
    })

    if (data.tasks != undefined) {
      data.tasks.forEach((taskItem) => {
        let expTask = {
          experimentId: newExpId,
          taskId: taskItem.id,
        }
        ExperimentTask.findAll({
          where: {
            experimentId: newExpId,
            taskId: taskItem.id
          }
        }).then((existingItem) => {
          if (existingItem.length == 0)
            ExperimentTask.create(expTask)
        }).catch((error) => {
          logger.log(error)
          res.sendStatus(500)
        })
      })
      res.set('Location', `/experiments/${newExpId}`)
      res.sendStatus(201)
    }
  },

  /** Get all Experiments */
  getAll: async (req, res) => {

    try {

      const offset = (req.query.page - 1) * req.query.perPage
      let experiments = await Experiment.findAll({ offset: offset, limit: req.query.perPage, order: [['createdAt', 'DESC']] })

      const numberOfRecords = await Experiment.count()
      const numberOfPages = Math.ceil(numberOfRecords / req.query.perPage)

      experiments = experiments.map((experiment) => {
        return {
          id: experiment.id,
          status: experiment.status,
          title: experiment.title,
          description: experiment.description,
          createdAt: experiment.createdAt,
          updatedAt: experiment.updatedAt,
        }
      })

      res.json({
        data: experiments,
        metadata: {
          perPage: req.query.perPage,
          page: req.query.page,
          numberOfPages: numberOfPages,
          from: experiments.length ? offset + 1 : null,
          to: experiments.length ? offset + experiments.length : null,
          total: numberOfRecords
        }
      })

    } catch (error) {

      logger.error(error)
      res.sendStatus(500)

    }
  },

  /** Get single experiment */
  get: async (req, res) => {

    let expTasks = await ExperimentTask.findAll({
      attributes: ['taskId'],
      where: {
        experimentId: req.params.id
      }
    })

    let taskids = []

    expTasks.forEach(element => {
      taskids.push(element.taskId)
    });


    let tasks = await Tasks.findAll({
      where: {
        id: {
          [Op.in]: taskids,
        }
      }
    })

    Experiment.findByPk(req.params.id).then((experiment) => {

      if (!experiment) {
        return res.sendStatus(404)
      }

      res.json({
        id: experiment.id,
        status: experiment.status,
        title: experiment.title,
        description: experiment.description,
        createdAt: experiment.createdAt,
        updatedAt: experiment.updatedAt,
        tasks: tasks
      })

    }).catch((error) => {
      logger.error(error)
      res.sendStatus(500)
    })
  },

  /** Update Experiment */
  update: async (req, res) => {

    try {

      const experiment = await Experiment.findByPk(req.params.id)
      if (!experiment) {
        return res.sendStatus(404)
      }


      const data = matchedData(req, { locations: ['body'] })

      var experimentData = {
        "title": data.title,
        "description": data.description,
        "status": (experiment.status != 1 && experiment.status != undefined) ? data.status : 0
      }
      await Experiment.update(experimentData, { where: { id: req.params.id } })

      if (data.tasks != undefined) {
        data.tasks.forEach((taskItem) => {
          let expTask = {
            experimentId: req.params.id,
            taskId: taskItem.id,
          }
          ExperimentTask.findAll({
            where: {
              experimentId: req.params.id,
              taskId: taskItem.id
            }
          }).then((existingItem) => {
            if (existingItem.length == 0)
              ExperimentTask.create(expTask)
          }).catch((error) => {
            logger.log(error)
            res.sendStatus(500)
          })
        })
      }

      if (data.deletedTasks != undefined) {
        data.deletedTasks.forEach((deletedItem => {
          ExperimentTask.destroy({
            where: {
              experimentId: req.params.id,
              taskId: deletedItem.id

            }
          })
        }))
      }

      res.sendStatus(200)

    } catch (error) {
      logger.error(error)
      res.sendStatus(500)
    }

  },

  delete: async (req, res) => {
    try {

      const expid = req.params.id
      const taskid = req.params.taskid

      await ExperimentTask.destroy({
        where: {
          experimentId: expid,
          taskId: taskid

        }
      }).then((deletedItem) => {
        res.sendStatus(200)
      }).catch((error) => {
        logger.error(error)
        res.sendStatus(500)
      })

    }

    catch (error) {
      logger.error(error)
      res.sendStatus(500)
    }
  },

  deleteExp: async (req, res) => {
    try {

      await ExperimentTask.destroy({
        where: {
          experimentId: req.params.id
        }
      })
      await Experiment.destroy({
        where: {
          id: req.params.id
        }
      })
      res.sendStatus(200)
    }

    catch (error) {
      logger.error(error)
      res.sendStatus(500)
    }
  }

}
