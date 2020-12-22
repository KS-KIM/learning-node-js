import Router from 'koa-router';

import { todos } from './todos';
import { users } from './users';

export const api = new Router();

api.use('/todos', todos.routes());
api.use('', users.routes());
