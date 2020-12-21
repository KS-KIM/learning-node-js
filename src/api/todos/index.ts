import Router from 'koa-router';
import todo from '../../models/todo';
import counter, { Counter } from '../../models/counter';

export const todos = new Router();

todos.post('/', async (ctx) => {
  try {
    const postCount: Counter = await counter.findOne({ name: 'postCount' });
    const todoId: number = postCount.totalPost + 1;
    const title: string = ctx.request.body.title;
    const date: string = ctx.request.body.date;
    await todo.create({ _id: todoId, title: title, date: date });
    await counter.update({ name: 'postCount' }, { $inc: { totalPost: 1 } });
    await ctx.redirect('/todos');
  } catch (err) {
    console.log(err);
    ctx.status = 400;
  }
});

todos.put('/:id', async (ctx) => {
  try {
    const id: number = parseInt(ctx.params.id);
    const title: string = ctx.body.title;
    const date: string = ctx.body.date;
    await todo.updateOne({ _id: id }, { $set: { title: title, date: date } });
    ctx.status = 200;
  } catch (err) {
    ctx.status = 400;
  }
});

todos.delete('/:id', async (ctx) => {
  try {
    const id: number = parseInt(ctx.params.id);
    await todo.deleteOne({ _id: id });
    ctx.status = 200;
  } catch (err) {
    ctx.status = 400;
  }
});
