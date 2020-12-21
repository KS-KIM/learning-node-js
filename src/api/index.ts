import Router from 'koa-router';
import { todos } from './todos';

export const api = new Router();

api.use('/todos', todos.routes());
