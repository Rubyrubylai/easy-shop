const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const schema = require('../config/schema');
const validateMiddleware = require('../config/validateMiddleware');

router.get('/products', productController.getProducts);
router.get('/product/:id', productController.getProduct);

router.post('/order', validateMiddleware(schema.postOrder), orderController.postOrder);

module.exports = router;