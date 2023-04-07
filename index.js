import bodyParser from "body-parser";
import express from "express";
import mysql from "mysql2"
import cartRouter from './routes/cart.js';

const router = express.Router();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3307,
    database: 'zzshop',
    //password: 'notSecureChangeMe',
}).once('connection',(stream) => {
    console.log('oui!');
});

const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')

app.use('/cart', cartRouter);

app.get('/WorldCup1998', function(req, res){
    connection.query('SELECT * FROM boutique98',(err, result, fields) => {
        res.render('pages/WorldCup1998', {boutique98: result})
    })
});

app.post('/WorldCup1998', function(req, res, next){
    let data = req.body;
    connection.query(`INSERT INTO cart (id, idid, idproduits, idprix) VALUES (NULL, '${data.idid}', '${data.idproduits}', '${data.idprix}');`,(err, result, fields) => {});
    connection.query('SELECT * FROM boutique98',(err, result, fields) => {
        res.render('pages/WorldCup1998', {boutique98: result})
    }) 
  });

  app.get('/store', (req, res) => {
    res.render('pages/store')   
})

app.get('/worldcup98', (req, res) => {
    res.render('pages/worldcup98')   
})


app.get('/', function(req, res, next) {
    res.render('pages/index')

//console.log('objet request:  ', req)
});
app.get('/worldcup2006', (req, res) => {
    res.render('pages/worldcup2006')   
})

app.get('/collab', (req, res) => {
    res.render('pages/collab')   
})

app.get('/cart', (req, res) => {
    res.render('pages/cart')   
})

app.get('/zidane', (req, res) => {
    res.render('pages/zidane')   
})




app.listen('3003')


