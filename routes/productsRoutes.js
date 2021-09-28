const express = require('express');
const controller = require('../controller/productsController');

const router = express.Router();

router.post('/', controller.addNewProduct);
router.get('/', controller.getAllProducts);

module.exports = router;