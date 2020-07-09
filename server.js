const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-parser');
const router = require('./routes');
const serve = require('koa-static');

const app = new Koa();
const PORT = 4000;

const db = require('./models');
/*
forzar reinicio de base si es que se agregan relacion
{force:true}
warning: reinicia toda la base
*/
db.sequelize.sync().then(() => console.log('Model synced!')).catch(err => console.log(err));

app.context.db = db;
app.use(bodyParser());
app.use(serve(__dirname + '/public'));
app.use(router.routes());

app.listen(PORT);
console.log(`Servidor esta escuchando en puerto ${PORT}`)