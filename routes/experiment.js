const router = require('express').Router()
const experiments = require('../controllers/experimentController')
const validateRequest = require('../middlewares/validateRequest')
const createExperimentRules = require('../validation-rules/experiment/createExperimentRules')
const updateExperimentRules = require('../validation-rules/experiment/updateExperimentRules')
const getExperimentRules = require('../validation-rules/experiment/getExperimentRules')
const deleteExperimentTaskRules = require('../validation-rules/experimentTask/deleteExperimentTaskRules.js')
const deleteExperimentRules = require('../validation-rules/experiment/deleteExperimentRules.js')
const paginationRules = require('../validation-rules/paginationRules')

/**
 * @swagger
 *
 *  components:
 *
 *    parameters:
 *
 *      ExperimentID:
 *        name: id
 *        in: path
 *        required: true
 *        description: Experiment ID
 *        schema:
 *          type: integer
 *          format: int64
 *          minimum: 1
 *
 *    requestBodies:
 *
 *      CreateExperiment:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  description: Title for the new experiment.
 *                  required: true
 *                  type: string
 *                  example: Experiment title
 *                description:
 *                  description: Description for the new experiment.
 *                  in: json
 *                  required: true
 *                  type: string
 *                  example: Experiment description
 *
 *      UpdateExperiment:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  description: Title for the new experiment.
 *                  required: true
 *                  type: string
 *                  example: Experiment title
 *                description:
 *                  description: Description for the new experiment.
 *                  in: json
 *                  required: true
 *                  type: string
 *                  example: Experiment description
 *                tasks:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        description: Task ID.
 *                        type: integer
 *                        example: 1
 *                      title:
 *                        description: Task title.
 *                        type: string
 *                        example: "Task title"
 *                      description:
 *                        description: Task description.
 *                        type: string
 *                        example: "Task description"
 *                      link:
 *                        description: Task link.
 *                        type: string
 *                        example: "http://task-link.test/blabla"
 *                      createdAt:
 *                        description: Task creation date-time.
 *                        type: date-time
 *                        example: "2020-04-21T12:43:15.000Z"
 *                      updatedAt:
 *                        description: Task update date-time.
 *                        type: date-time
 *                        example: "2020-04-21T12:43:15.000Z"
 *
 *    schemas:
 *
 *      ExperimentInList:
 *        type: object
 *        properties:
 *          id:
 *            description: Experiment ID.
 *            type: integer
 *            example: 1
 *          status:
 *            description: >
 *              Experiment status:
 *                * `0` - Draft
 *                * `1` - Published
 *            type: integer
 *            enum: [0, 1]
 *            example: 0
 *          title:
 *            description: Experiment title.
 *            type: string
 *            example: "Experiment title"
 *          description:
 *            description: Experiment description.
 *            type: string
 *            example: "Experiment description"
 *          createdAt:
 *            description: Experiment creation date-time.
 *            type: date-time
 *            example: "2020-04-21T12:43:15.000Z"
 *          updatedAt:
 *            description: Experiment update date-time.
 *            type: date-time
 *            example: "2020-04-21T12:43:15.000Z"
 *
 *      ExperimentDetailed:
 *        type: object
 *        properties:
 *          id:
 *            description: Experiment ID.
 *            type: integer
 *            example: 1
 *          status:
 *            description: >
 *              Experiment status:
 *                * `0` - Draft
 *                * `1` - Published
 *            type: integer
 *            enum: [0, 1]
 *            example: 0
 *          title:
 *            description: Experiment title.
 *            type: string
 *            example: "Experiment title"
 *          description:
 *            description: Experiment description.
 *            type: string
 *            example: "Experiment description"
 *          createdAt:
 *            description: Experiment creation date-time.
 *            type: date-time
 *            example: "2020-04-21T12:43:15.000Z"
 *          updatedAt:
 *            description: Experiment update date-time.
 *            type: date-time
 *            example: "2020-04-21T12:43:15.000Z"
 *          tasks:
 *            description: Tasks assigned to the experiment
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id:
 *                  description: Task ID.
 *                  type: integer
 *                  example: 1
 *                title:
 *                  description: Task title.
 *                  type: string
 *                  example: "Task title"
 *                description:
 *                  description: Task description.
 *                  type: string
 *                  example: "Task description"
 *                link:
 *                  description: Task link.
 *                  type: string
 *                  example: "http://task-link.test/blabla"
 *                createdAt:
 *                  description: Task creation date-time.
 *                  type: date-time
 *                  example: "2020-04-21T12:43:15.000Z"
 *                updatedAt:
 *                  description: Task update date-time.
 *                  type: date-time
 *                  example: "2020-04-21T12:43:15.000Z"
 */

/**
 * @swagger
 *
 *  /experiments:
 *    post:
 *      summary: Creates an experiment
 *      tags:
 *        - Experiments
 *      requestBody:
 *        $ref: '#/components/requestBodies/CreateExperiment'
 *      responses:
 *        201:
 *          $ref: '#/components/responses/Created'
 *        400:
 *          $ref: '#/components/responses/BadRequest'
 *        422:
 *          $ref: '#/components/responses/UnprocessableEntity'
 *        500:
 *          $ref: '#/components/responses/InternalServerError'
 *
 */
router.post('/', validateRequest(createExperimentRules), experiments.create)

/**
 * @swagger
 *
 *  /experiments:
 *    get:
 *      summary: Gets experiments
 *      tags:
 *        - Experiments
 *      parameters:
 *        - $ref: '#/components/parameters/PerPageParam'
 *        - $ref: '#/components/parameters/PageParam'
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/ExperimentInList'
 *                  metadata:
 *                    $ref: '#/components/schemas/Pagination'
 *        500:
 *          $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/', validateRequest(paginationRules), experiments.getAll)

/**
 * @swagger
 *
 *  /experiments/{id}:
 *    get:
 *      summary: Gets an experiment by ID
 *      tags:
 *        - Experiments
 *      parameters:
 *        - $ref: '#/components/parameters/ExperimentID'
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ExperimentDetailed'
 *        404:
 *          $ref: '#/components/responses/NotFound'
 *        500:
 *          $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', validateRequest(getExperimentRules), experiments.get)

/**
 * @swagger
 *
 *  /experiments/{id}:
 *    post:
 *      summary: Updates an experiment by ID
 *      tags:
 *        - Experiments
 *      parameters:
 *        - $ref: '#/components/parameters/ExperimentID'
 *      requestBody:
 *        $ref: '#/components/requestBodies/UpdateExperiment'
 *      responses:
 *        200:
 *          $ref: '#/components/responses/OK'
 *        400:
 *          $ref: '#/components/responses/BadRequest'
 *        422:
 *          $ref: '#/components/responses/UnprocessableEntity'
 *        500:
 *          $ref: '#/components/responses/InternalServerError'
 */
  router.post('/:id', validateRequest(updateExperimentRules), experiments.update)

/**
 * @swagger
 *
 *  /experiments/{id}/task/{taskid}:
 *    delete:
 *      summary: Removes a task from an experiment
 *      tags:
 *        - Experiments
 *      parameters:
 *        - $ref: '#/components/parameters/ExperimentID'
 *        - name: taskid
 *          in: path
 *          required: true
 *          description: Task ID
 *          schema:
 *            type: integer
 *            format: int64
 *            minimum: 1
 *      responses:
 *        200:
 *          $ref: '#/components/responses/OK'
 *        500:
 *          $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id/task/:taskid',validateRequest(deleteExperimentTaskRules), experiments.delete)

/**
 * @swagger
 *
 *  /experiments/{id}:
 *    delete:
 *      summary: Deletes an experiment by ID
 *      tags:
 *        - Experiments
 *      parameters:
 *        - $ref: '#/components/parameters/ExperimentID'
 *      responses:
 *        200:
 *          $ref: '#/components/responses/OK'
 *        500:
 *          $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id',validateRequest(deleteExperimentRules), experiments.deleteExp)

module.exports = router
