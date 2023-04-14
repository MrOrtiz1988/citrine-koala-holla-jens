const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js');

// GET
koalaRouter.get('/', (req, res) => {
    console.log('GET /koalas');
    
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
koalaRouter.post('/', (req, res) => {
    console.log('POST /koalas');
    console.log('here is the data we got mailed:', req.body);
  
    let koalaName = req.body.name;
    let koalaAge = req.body.age;
    let koalaGender = req.body.gender;
    let koalareadyForTransfer = req.body.ready_to_transfer;
    let koalaNotes = req.body.notes;
  
    let sqlText = `
      INSERT INTO "koalas"
        ("name", "age", "gender", "ready_to_transfer", "notes" )
        VALUES
        ($1, $2, $3, $4, $5);
    `;
    let sqlValues = [koalaName, koalaAge, koalaGender, koalareadyForTransfer, koalaNotes]
    
   
    pool.query(sqlText, sqlValues)
      .then((dbRes) => {
        console.log('New Koala was added!')
        res.sendStatus(201);
      })
      .catch((dbErr) => {
        console.log('POST /koala error:', dbErr);
        res.sendStatus(500);
      })
  })

// PUT
koalaRouter.put('/:id', (req, res) => {
    
    let theIdToUpdate = req.params.id;
    console.log('here is our id', req.params.id);
    
    let newreadyForTransfer = req.body.ready_to_transfer;
    console.log('HEY LOOOOK AT MEEE', newreadyForTransfer);

    let sqlText = `
      UPDATE "koalas"
        SET "ready_to_transfer"=$1
        WHERE "id"=$2;
    `
    let sqlValues = [newreadyForTransfer, theIdToUpdate];
  
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
koalaRouter.delete('/:id', (req, res) => {
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