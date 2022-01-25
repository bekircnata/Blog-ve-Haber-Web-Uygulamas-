const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Handlebars = require('handlebars')
// Handlebars Hatasını Gidermek
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
// <Resim Yüklemek>
const fileUpload = require('express-fileupload');
// <Helpers>
const {generateDate, limit, truncate, paginate} = require('./helpers/hbs')
// </Helpers>
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const methodOverride = require('method-override');


// Database Connection
mongoose.connect('mongodb://localhost/BlogApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const mongoStore = new connectMongo(expressSession);

app.use(expressSession({
    secret: 'Test',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection})
}));

app.use(fileUpload());

// Public klasörünü static olarak çalıştırıyoruz.
app.use(express.static('public'));

app.use(methodOverride('_method'));

// Template Engine
// Handlebars Helpers
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        generateDate: generateDate,
        limit: limit,
        truncate: truncate,
        paginate: paginate
    }
    
}),exphbs());
app.set('view engine', 'handlebars');

// Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Display Link Middleware
app.use( (req, res, next) => {
    const {userId} = req.session;
    if(userId) {
        res.locals = {
            displayLink: true
        }
    } else {
        res.locals = {
            displayLink: false
        }
    }
    next();
});

// Flas - Message Middleware
app.use((req, res, next) => {
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')))


// Routes (Yönlendirme işlemleri)
// Main Routes
const main = require('./routes/main');
app.use('/', main);
// Posts Routes
const posts = require('./routes/posts');
app.use('/posts', posts);
// User Routes
const users = require('./routes/users');
const MongoStore = require('connect-mongo');
app.use('/users', users);
// Admin Routes
const admin = require('./routes/admin/index');
app.use('/admin', admin);
// Contact Routes
const contact = require('./routes/contact');
const { urlencoded } = require('express');
app.use('/contact', contact);

const news = require('./routes/news');
const { disabled } = require('express/lib/application');
app.use('/news', news)

app.listen(3000, () => {
    console.log("Server 3000. port'ta Çalışıyor");
})
