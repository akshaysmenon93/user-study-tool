const router = require('express').Router()
const tasks = require('../controllers/tasksController')
const validateRequest = require('../middlewares/validateRequest')
const createTaskRules = require('../validation-rules/task/createTaskRules')
const updateTaskRules = require('../validation-rules/task/updateTaskRules')
const paginationRules = require('../validation-rules/paginationRules')

/**
 * @swagger
 *
 *  components:
 *
 *    parameters:
 *
 *      TaskID:
 *        name: id
 *        in: path
 *        required: true
 *        description: Task ID
 *        schema:
 *          type: integer
 *          format: int64
 *          minimum: 1
 *
 *    requestBodies:
 *
 *      Task:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  description: Title for the new task.
 *                  required: true
 *                  type: string
 *                  example: Task title
 *                description:
 *                  description: Description for the new task.
 *                  in: json
 *                  required: true
 *                  type: string
 *                  example: Task description
 *                link:
 *                  description: Link for the new task.
 *                  required: true
 *                  type: string
 *                  example: http://task-url.test
 *                  
 *    schemas:
 *
 *      Task:
 *        type: object
 *        properties:
 *          id:
 *            description: Task ID.
 *            type: integer
 *            example: 1
 *          readOnly:
 *            description: If the task is read only.
 *            type: boolean
 *            example: false
 *          title:
 *            description: Task title.
 *            type: string
 *            example: "Task title"
 *          description:
 *            description: Task description.
 *            type: string
 *            example: "Task description"
 *          link:
 *            description: Task link.
 *            type: string
 *            example: "http://task-link.test/blabla"
 *          createdAt:
 *            description: Task creation date-time.
 *            type: date-time
 *            example: "2020-04-21T12:43:15.000Z"
 *          updatedAt:
 *            description: Task update date-time.
 *            type: date-time
 *            example: "2020-04-21T12:43:15.000Z"
 */

/**
 * @swagger
 *
 *  /tasks:
 *    post:
 *      summary: Creates a task
 *      tags:
 *        - Tasks
 *      requestBody:
 *        $ref: '#/components/requestBodies/Task'
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
router.post('/', validateRequest(createTaskRules), tasks.create)

/**
 * @swagger
 *
 *  /tasks:
 *    get:
 *      summary: Gets tasks
 *      tags:
 *        - Tasks
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
 *                      $ref: '#/components/schemas/Task'
 *                  metadata:
 *                    $ref: '#/components/schemas/Pagination'
 *        500:
 *          $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/', validateRequest(paginationRules), tasks.getAll)

/**
 * @swagger
 *
 *  /tasks/{id}:
 *    get:
 *      summary: Gets a task by ID
 *      tags:
 *        - Tasks
 *      parameters:
 *        - $ref: '#/components/parameters/TaskID'
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Task'
 *        404:
 *          $ref: '#/components/responses/NotFound'
 *        500:
 *          $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', tasks.get)

/**
 * @swagger
 *
 *  /tasks/{id}:
 *    put:
 *      summary: Updates a task by ID
 *      tags:
 *        - Tasks
 *      parameters:
 *        - $ref: '#/components/parameters/TaskID'
 *      requestBody:
 *        $ref: '#/components/requestBodies/Task'
 *      responses:
 *        200:
 *          $ref: '#/components/responses/OK'
 *        400:
 *          $ref: '#/components/responses/BadRequest'
 *        409:
 *          $ref: '#/components/responses/Conflict'
 *        422:
 *          $ref: '#/components/responses/UnprocessableEntity'
 *        500:
 *          $ref: '#/components/responses/InternalServerError'
 *
 */
router.put('/:id', validateRequest(updateTaskRules), tasks.update)

/**
 * @swagger
 *
 *  /tasks/{id}:
 *    delete:
 *      summary: Deletes a task by ID
 *      tags:
 *        - Tasks
 *      parameters:
 *        - $ref: '#/components/parameters/TaskID'
 *      responses:
 *        200:
 *          $ref: '#/components/responses/OK'
 *        404:
 *          $ref: '#/components/responses/NotFound'
 *        409:
 *          $ref: '#/components/responses/Conflict'
 *        500:
 *          $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', tasks.delete)

module.exports = router
