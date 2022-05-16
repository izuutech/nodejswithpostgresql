const client = require('./connection.js')
const express = require('express');
const app = express();

const bodyParser=require("body-parser")
app.use(bodyParser.json())



app.listen(3000, ()=>{
    console.log("Sever is now listening at port 3000");
})

client.connect();

//GET all users route
app.get('/users', (req, res)=>{
    client.query(`SELECT * FROM users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})



//Get each user route
app.get('/users/:id', (req, res)=>{
    client.query(`SELECT * FROM users WHERE id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})



//Post/Create route
app.post('/users', (req, res)=> {
    const user = req.body;
    let insertQuery = `INSERT INTO users(id, firstname, lastname, location) 
                       VALUES(${user.id}, '${user.firstname}', '${user.lastname}', '${user.location}')`
    let searchQuery=`SELECT * From users WHERE id=${req.body.id}`;

    client.query(searchQuery, (error, user)=>{
        if(!user.rows[0]){
            
            client.query(insertQuery, (err, result)=>{
                if(!err){
                    res.send('Insertion was successful')
                }
                else{ console.log(err.message) }
            })
        }else{
            
            res.send('User already exists')
        }
    })
    client.end;
})


//Put/Update route
app.put('/users/:id', (req, res)=> {
    let user = req.body;
    let updateQuery = `UPDATE users
                       SET firstname = '${user.firstname}',
                       lastname = '${user.lastname}',
                       location = '${user.location}'
                       WHERE id = ${user.id}`
    let searchQuery = `SELECT * From users WHERE id=${req.params.id}`
    client.query(searchQuery, (error, user)=>{
        if(user.rows[0]){
            client.query(updateQuery, (err, result)=>{
                if(!err){
                    res.send('Update was successful')
                }
                else{ console.log(err.message) }
            })
        }else{
            res.send('Cannot update. user does not exist')
        }
    })
    client.end;
})






//DELETE route
app.delete('/users/:id', (req, res)=> {
    
    let insertQuery = `DELETE FROM users WHERE id=${req.params.id}`
    let searchQuery = `SELECT * From users WHERE id=${req.params.id}`
    client.query(searchQuery, (error, user)=>{
        if(user.rows[0]){
            client.query(insertQuery, (err, result)=>{
                if(!err){
                    res.send('Deletion was successful')
                }
                else{ console.log(err.message) }
            })
        }else{
            res.send("User doesn't exist")
        }
    })
    
    client.end;
})