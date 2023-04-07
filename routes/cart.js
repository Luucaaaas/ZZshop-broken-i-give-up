import express from 'express';
import mysql from 'mysql2';

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

router.get('/cart',function(req,res){
    connection.query('SELECT * FROM cart',(err,result,fields)=>{
    res.render('pages/cart', {cart: result})
    })
});

router.post('/WorldCup98', function (req,res,next){
    let data = req.body;
    connection.query(`DELETE FROM cart WHERE cart.id = '${data.id}';`)
    connection.query('SELECT * FROM cart',(err,result,fields)=>{//
        res.render('pages/cart', {cart: result})
    })
});

router.get('/empty', function(req,res,next){
    connection.query('DELETE FROM `cart`');
    res.render('pages/empty')
});

export default router;//export des routes

