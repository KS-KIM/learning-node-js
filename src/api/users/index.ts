import passport from 'koa-passport';
import Router from 'koa-router';

import { auth } from '../../lib/auth';

export const users = new Router();

users.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?failedToLogin=true',
  })
);

users.get('/logout', auth, (ctx) => {
  ctx.logout();
  ctx.redirect('/');
});
