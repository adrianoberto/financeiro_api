const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {  
  res.status(200).send({
    title: 'Stock API',
    version: '1.0.0'
  });
});

router.post('/', (req, res, next) => {  

  res.status(200).send('Funcionou');

  // res.status(200).send({
  //   title: 'Stock API',
  //   version: '1.0.0'
  // });
});

module.exports = router;