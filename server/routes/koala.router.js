const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('./modules/pool.js');

// GET
app.get('/koalas', (req, res) => {
    console.log('GET /creatures');
    
    let sqlText = 'SELECT * FROM "koalas";';
  
    
    pool.query(sqlText)
      .then((dbRes) => {
        console.log('dbRes.rows:', dbRes.rows);
        let theKoalas = dbRes.rows;
        res.send(theKoalas)
      })
      .catch((dbErr) => {
        console.log('SQL query in GET /koalas failed:', dbErr)
        res.sendStatus(500);
      })
   
  })

// POST
app.post('/creatures', (req, res) => {
    console.log('POST /creatures');
    console.log('here is the data we got mailed:', req.body);
  
    let creatureName = req.body.name;
    let creatureType = req.body.type;
  
    let sqlText = `
      INSERT INTO "koalas"
        ("name", "type")
        VALUES
        ($1, $2, $3, $4, $5);
    `;
    let sqlValues = [KoalaName, ]
    
   
    pool.query(sqlText, sqlValues)
      .then((dbRes) => {
       
        res.sendStatus(201);
      })
      .catch((dbErr) => {
        console.log('POST /koala error:', dbErr);
        res.sendStatus(500);
      })
  })

// PUT
app.put('/koalas/:id', (req, res) => {
    // Get the id of the creature we'd like to update:
      // req.params looks like: { id: '3' }
    let theIdToUpdate = req.params.id;
  
    // Get the new type value:
      // req.body looks like: { type: 'Digidog' }
    let newType = req.body.type;
  
    let sqlText = `
      UPDATE "koalas"
        SET "type"=$1
        WHERE "id"=$2;
    `
    let sqlValues = [newType, theIdToUpdate];
  
    pool.query(sqlText, sqlValues)
      .then((dbRes) => {
        res.sendStatus(200);
      })
      .catch((dbErr) => {
        console.log('PUT /koalas/:id fail:', dbErr);
        res.sendStatus(500);
      })
    
  
  })

// DELETE
app.delete('/koalas/:id', (req, res) => {
    console.log(req.params);
  
    let theIdToDelete = req.params.id;
    
    let sqlText = `
      DELETE FROM "koalas"
        WHERE "id"=$1;
    `
    let sqlValues = [theIdToDelete]
  
    pool.query(sqlText, sqlValues)
      .then((dbRes) => {
       
        res.sendStatus(200); 
      })
      .catch((dbErr) => {
        console.log('delete /koalas error:', dbErr);
        
        res.sendStatus(500);
      })
  })

module.exports = koalaRouter;