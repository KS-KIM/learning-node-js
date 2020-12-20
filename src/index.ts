import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoDB from 'mongodb';
import path from 'path';
import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import helmet from 'helmet';
import morgan from 'morgan';

const app: express.Express = express();

let db: mongoDB.Db;

dotenv.config();
app.use(helmet.xssFilter());
app.use(morgan('short'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views'));

app.use('/public', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: process.env.PASSPORT_SECRET, resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req: Request, res: Response, next: Function) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.get('/', (req, res) => {
  res.render('index.ejs', { path: '/', user: req.user });
});

app.get('/login', (req, res) => {
  const failedToLogin = req.query.failedToLogin ? Boolean(req.query.failedToLogin) : false;
  res.render('login.ejs', { path: '/login', user: req.user, failedToLogin: failedToLogin });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/write', isLoggedIn, (req, res) => {
  res.render('write.ejs', { path: '/write', user: req.user });
});

app.get('/mypage', isLoggedIn, (req, res) => {
  res.render('mypage.ejs', { path: '/mypage', user: req.user });
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login?failedToLogin=true' }), (req, res) => {
  res.redirect('/');
});

app.get('/edit/:id', isLoggedIn, (req, res) => {
  const todosId: number = parseInt(req.params.id);
  db.collection('post')
    .findOne({ _id: todosId })
    .then((todo) => {
      res.render('edit.ejs', { todo: todo, path: '/todos', user: req.user });
    })
    .catch((err: Error) => {
      console.log('failed to edit todo' + err.message);
      res.status(400).send();
    });
});

app.get('/todos/:id', isLoggedIn, (req, res) => {
  const todosId: number = parseInt(req.params.id);
  db.collection('post')
    .findOne({ _id: todosId })
    .then((todo) => {
      res.render('todo.ejs', { todo: todo, path: '/todos', user: req.user });
    })
    .catch((err: Error) => {
      console.log('failed to get todo' + err.message);
      res.status(400).send();
    });
});

app.get('/todos', isLoggedIn, async (req, res) => {
  const todos = await db.collection('post').find().toArray();
  res.render('todos.ejs', { todos: todos, path: '/todos', user: req.user });
});

app.post('/todos', isLoggedIn, async (req, res) => {
  const postCount = await db.collection('counter').findOne({ name: 'postCount' });
  const todoId: number = postCount.totalPost + 1;
  const todo = await db.collection('post').insertOne({ _id: todoId, title: req.body.title, date: req.body.date });
  await db.collection('counter').updateOne({ name: 'postCount' }, { $inc: { totalPost: 1 } });
  res.redirect(`/todos/${todoId}`);
});

app.put('/todos/:id', isLoggedIn, async (req, res) => {
  const todoId: number = parseInt(req.params.id);
  const todoTitle: string = req.body.title;
  const todoDate: string = req.body.date;
  await db.collection('post').updateOne({ _id: todoId }, { $set: { title: todoTitle, date: todoDate } });
  res.status(200).send();
});

app.delete('/todos/:id', isLoggedIn, async (req, res) => {
  const todosId: number = parseInt(req.params.id);
  const saveResult = await db.collection('post').deleteOne({ _id: todosId });
  if (saveResult.result.ok !== 1) {
    res.status(400).send();
  } else {
    res.status(200).send();
  }
});

// import todos from './router/todos';
// app.use('/todos', todos);

mongoDB
  .connect(process.env.DB_HOST, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db('todoapp');
    console.log(`connected to database on ${process.env.DB_HOST}`);
    app.listen(process.env.SERVER_PORT);
    console.log(`listening on ${process.env.SERVER_PORT}`);
  })
  .catch((err) => {
    return console.log(err);
  });

passport.use(
  new LocalStrategy(
    {
      usernameField: 'id',
      passwordField: 'password',
      session: true,
      passReqToCallback: false,
    },
    (id: string, password: string, done) => {
      db.collection('user')
        .findOne({ id: id })
        .then((user) => {
          if (user?.password === password) {
            return done(null, user.id);
          } else {
            return done(null, false, { message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
          }
        })
        .catch((err: Error) => {
          console.log(err.message);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  db.collection('user')
    .findOne({ id: id })
    .then((user) => {
      done(null, user);
    })
    .catch((err: Error) => {
      console.log(err.message);
    });
});
