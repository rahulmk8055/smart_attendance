const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const id_name = require('/home/rahulmk8055/smart_attendance/controllers/id.controller');



// a simple test url to check that all of our files are communicating correctly.
router.get('/test', id_name.test);

router.post('/enroll', id_name.enroll);

router.post('/check', id_name.check);

module.exports = router;