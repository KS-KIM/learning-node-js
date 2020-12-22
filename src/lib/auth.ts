import { Context } from 'koa';
import passport from 'koa-passport';
import LocalStrategy from 'passport-local';

import { User } from '../models/user';
import user from '../models/user';

const fetchUser = async (id: string): Promise<User> => {
  return user.findOne({ id: id });
};

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user: User = await fetchUser(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new LocalStrategy.Strategy(
    { usernameField: 'id', passwordField: 'password', session: true, passReqToCallback: false },
    async (id: string, password: string, done) => {
      try {
        const user: User = await fetchUser(id);
        if (user.id === id && user.password === password) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

export const auth = (ctx: Context, next: Function) => {
  if (ctx.isAuthenticated()) {
    return next();
  } else {
    ctx.redirect('/login');
  }
};
