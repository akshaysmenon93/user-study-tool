const router = require('express').Router()
const users = require('../controllers/usersController')
const validateRequest = require('../middlewares/validateRequest')
const createUserRules = require('../validation-rules/user/createUserRules')
const updateUserRules = require('../validation-rules/user/updateUserRules')
const paginationRules = require('../validation-rules/paginationRules')

/**
 * @swagger
 *
 *  components:
 *
 *    parameters:
 *
 *      UserID:
 *        name: id
 *        in: path
 *        required: true
 *        description: User ID
 *        schema:
 *          type: integer
 *          format: int64
 *          minimum: 1
 *
 *    requestBodies:
 *
 *      User:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                fullName:
 *                  description: Fullname for the new user.
 *                  required: true
 *                  type: string
 *                  example: John Doe
 *                email:
 *                  description: Email for the new user.
 *                  required: true
 *                  type: string
 *                  example: john.doe@email.com
 *                password:
 *                  description: Password for the new user.
 *                  required: true
 *                  type: string
 *                  example: qwerty123
 *
 *    schemas:
 *
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            description: User ID.
 *            type: integer
 *            example: 1
 *          fullName:
 *            description: User Fullname.
 *            required: true
 *            type: string
 *            example: John Doe
 *          email:
 *            description: User email.
 *            required: true
 *            type: string
 *            example: john.doe@email.com
 *          createdAt:
 *            description: User creation date-time.
 *            type: date-time
 *            example: "2020-04-21T12:43:15.000Z"
 *          updatedAt:
 *            description: User update date-time.
 *            type: date-time
 *            example: "2020-04-21T12:43:15.000Z"
 */

/**
 * @swagger
 *
 *  /users:
 *    post:
 *      summary: Creates a user
 *      tags:
 *        - Users
 *      requestBody:
 *        $ref: '#/components/requestBodies/User'
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
router.post('/', validateRequest(createUserRules), users.create)

/**
 * @swagger
 *
 *  /users:
 *    get:
 *      summary: Gets users
 *      tags:
 *        - Users
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
 *                      $ref: '#/components/schemas/User'
 *                  metadata:
 *                    $ref: '#/components/schemas/Pagination'
 *        500:
 *          $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/', validateRequest(paginationRules), users.getAll)

/**
 * @swagger
 *
 *  /users/{id}:
 *    get:
 *      summary: Gets a user by ID
 *      tags:
 *        - Users
 *      parameters:
 *        - $ref: '#/components/parameters/UserID'
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        404:
 *          $ref: '#/components/responses/NotFound'
 *        500:
 *          $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', users.get)

/**
 * @swagger
 *
 *  /users/{id}:
 *    put:
 *      summary: Updates a user by ID
 *      tags:
 *        - Users
 *      parameters:
 *        - $ref: '#/components/parameters/UserID'
 *      requestBody:
 *        $ref: '#/components/requestBodies/User'
 *      responses:
 *        200:
 *          $ref: '#/components/responses/OK'
 *        400:
 *          $ref: '#/components/responses/BadRequest'
 *        422:
 *          $ref: '#/components/responses/UnprocessableEntity'
 *        500:
 *          $ref: '#/components/responses/InternalServerError'
 *
 */
router.put('/:id', validateRequest(updateUserRules), users.update)

/**
 * @swagger
 *
 *  /users/{id}:
 *    delete:
 *      summary: Deletes a user by ID
 *      tags:
 *        - Users
 *      parameters:
 *        - $ref: '#/components/parameters/UserID'
 *      responses:
 *        200:
 *          $ref: '#/components/responses/OK'
 *        404:
 *          $ref: '#/components/responses/NotFound'
 *        500:
 *          $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', users.delete)

module.exports = router