import Router from 'koa-router';
import todo, { Todo } from '../models/todo';

export const pages = new Router();

pages.get('/', async (ctx, next) => {
  await ctx.render('index', { path: '/', user: { id: 'kskim' } });
});

pages.get('/login', async (ctx, next) => {
  await ctx.render('login', { path: '/login', user: { id: 'kskim' }, failedToLogin: false });
});

pages.get('/logout', (ctx, next) => {
  ctx.redirect('/');
});

pages.get('/write', async (ctx, next) => {
  await ctx.render('write', { path: '/write', user: { id: 'kskim' } });
});

pages.get('/mypage', async (ctx, next) => {
  await ctx.render('mypage', { path: '/mypage', user: { id: 'kskim' } });
});

pages.get('/edit/:id', async (ctx, next) => {
  try {
    const todosId: number = parseInt(ctx.params.id);
    const savedTodo: Todo = await todo.findOne({ _id: todosId });
    await ctx.render('edit', { todo: savedTodo, path: '/todos', user: { id: 'kskim' } });
  } catch (err) {
    ctx.status = 400;
  }
});

pages.get('/todos', async (ctx, next) => {
  try {
    const savedTodos: Array<Todo> = await todo.find();
    await ctx.render('todos', { todos: savedTodos, path: '/todos', user: { id: 'kskim' } });
  } catch (err) {
    ctx.status = 400;
  }
});
