import { Router } from 'express';
import * as userController from '../controllers/userController';
import * as todoController from '../controllers/todoController';

const router = Router();


/**
 * @swagger
 * /todos/{userEmail}:
 *   get:
 *     summary: Retorna todas as tarefas de um usuário.
 *     parameters:
 *       - in: path
 *         name: userEmail
 *         schema:
 *           type: string
 *         required: true
 *         description: O email do usuário.
 *     responses:
 *       200:
 *         description: Lista de tarefas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get('/:userEmail', todoController.getTodos);

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Cria uma nova tarefa.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Tarefa criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.post('/', todoController.createTodo);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa a ser atualizada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.put('/:id', todoController.updateTodo);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Deleta uma tarefa.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa a ser deletada.
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso.
 */
router.delete('/:id', todoController.deleteTodo);


/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Registra um novo usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@exemplo.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Usuário registrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 token:
 *                   type: string
 */
router.post('/signup', userController.signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@exemplo.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 token:
 *                   type: string
 */
router.post('/login', userController.login);

export default router;
