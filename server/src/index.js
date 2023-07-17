const config = require('./config.js')
const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(session({
  secret: 'my secret',
  cookie: { maxAge: 3600000 * 4 },
  saveUninitialized: true,
  resave: false,
}));

app.use(cors({
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: 'Content-Type, Authorization',
  methods: "GET, POST, OPTIONS, PUT, DELETE",
  origin: ["http://localhost:4242"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const displayBlogs = require('./Routes/Blogs/index.js');
app.use('/', displayBlogs);

const registerRoute = require('./Routes/register.js');
app.use('/register', registerRoute);

const loginRoute = require('./Routes/login.js');
app.use('/login', loginRoute);

const logoutRoute = require('./Routes/logout.js');
app.use('/logout', logoutRoute);

const userRoute = require('./Routes/user.js');
app.use('/user', userRoute);

const newRoute = require('./Routes/Blogs/new.js');
app.use('/new', newRoute);

const deleteBill = require('./Routes/Blogs/delete.js');
app.use('/', deleteBill);

const editBill = require('./Routes/Blogs/edit.js');
app.use('/', editBill);

const showBill = require('./Routes/Blogs/show.js');
app.use('/', showBill);

const billsRoute = require('./Routes/Blogs/bills.js');
app.use('/', billsRoute);

const commentBill = require('./Routes/Blogs/comment.js');
app.use('/', commentBill);

const searchRoute = require('./Routes/Blogs/search.js');
app.use('/', searchRoute);

app.listen(config.port, () => {

  console.log('Serveur running on port ' + config.port)
})