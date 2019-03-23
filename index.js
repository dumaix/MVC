var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var handlebars = require('handlebars');
var mysql      = require('mysql');
const fs = require('fs');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'book'
});
//var pool = mysql.createPool(connection);
//module.exports = pool;
var urlencodedParser = bodyParser.urlencoded({ extended: false })


connection.connect((err)=>{
if(!err)
console.log('succeded');
else
console.log('failed\n'+ JSON.stringify(err,undefined,2));
});
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine', 'ejs' );

app.get('/about',function(req, res){
    connection.query('SELECT * FROM book',(err,rows,fields)=>{
        if(!err)
          res.render('about', {rows: rows });
        else {
          console.log(err);
        }
    });
});

app.post('/about', urlencodedParser,function (req, res,callback) {
console.log(req.body);
var params = [req.body.ID,req.body.Name,req.body.Author,req.body.Genre];
console.log(params);
    connection.query('INSERT INTO book SET ID = ?, Name = ?, Author = ?, Genre = ? ',params , (error, result) => {
        if (error) throw error;
        connection.query('SELECT * FROM book',(err,rows,fields)=>{
            if(!err)
              res.render('about', {rows: rows });
            else {
              console.log(err);
            }
        });
    });
  /*  connection.query('DELETE FROM book WHERE  ID = ? ',req.body.id , (error, result) => {  // асинхронность
          if (error) throw error;
            connection.query('SELECT * FROM book',(err,rows,fields)=>{
              if(!err)
                res.render('about', {rows: rows });
              else {
                console.log(err);
              }
            });
    });*/
});

app.post('/about/delete',urlencodedParser, (req, res) => {
var paramsDELL = req.body.id;
var paramsDEL = req.params.id;
  console.log(paramsDEL);
  console.log(paramsDELL);
  connection.query('DELETE FROM book WHERE  ID = ? ', paramsDELL, (error, result) => { //[req.params.id]
        if (error) throw error;
          connection.query('SELECT * FROM book',(err,rows,fields)=>{
            if(!err)
              res.render('about', {rows: rows });
            else {
              console.log(err);
            }
          });
  });
});
app.listen(3000);
