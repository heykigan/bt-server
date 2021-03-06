const express = require('express');
const { initSession, isEmail } = require('../utils/utils');
const { request } = require('graphql-request')
 
const router = express.Router();

router.get('/', async (req, res) => {
  try {

    const query = `query{fetchMediaOfClient(client: "BT101"){ medias{_id title description image video attachment createdAt}}}`
     
    request('http://localhost:8082/api', query).then(data => {
     res.json(data.fetchMediaOfClient.medias);
      })
   
    
  } catch (err) {
    res.status(401).json({
      errors: [
        {
          title: 'Unauthorized',
          detail: 'Not authorized to access this route',
          errorMessage: err.message,
        },
      ],
    });
  }
});


router.post('/', async (req, res) => {
  try {
    console.log(req)
    res.json(req.body);
  } catch (err) {
    res.status(401).json({
      errors: [
        {
          title: 'Unauthorized',
          detail: 'Not authorized to access this route',
          errorMessage: err.message,
        },
      ],
    });
  }
});



module.exports = router;
