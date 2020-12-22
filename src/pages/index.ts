import Router from 'koa-router';

import { auth } from '../lib/auth';
import todo, { Todo } from '../models/todo';

export const pages = new Router();

pages.get('/', async (ctx, next) => {
  await ctx.render('index', { path: '/', user: ctx.state.user });
});

pages.get('/login', async (ctx, next) => {
  await ctx.render('login', { path: '/login', user: ctx.state.user, failedToLogin: false });
});

pages.get('/write', auth, async (ctx, next) => {
  await ctx.render('write', { path: '/write', user: ctx.state.user });
});

pages.get('/mypage', auth, async (ctx, next) => {
  await ctx.render('mypage', { path: '/mypage', user: ctx.state.user });
});

pages.get('/edit/:id', auth, async (ctx, next) => {
  try {
    const todosId: number = parseInt(ctx.params.id);
    const savedTodo: Todo = await todo.findOne({ _id: todosId });
    await ctx.render('edit', { todo: savedTodo, path: '/todos', user: ctx.state.user });
  } catch (err) {
    ctx.status = 400;
  }
});

pages.get('/todos', auth, async (ctx, next) => {
  try {
    const savedTodos: Array<Todo> = await todo.find();
    await ctx.render('todos', { todos: savedTodos, path: '/todos', user: ctx.state.user });
  } catch (err) {
    ctx.status = 400;
  }
});
