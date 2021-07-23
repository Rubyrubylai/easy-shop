const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');

router.get('/products', productController.getProducts);
router.get('/product/:id', productController.getProduct);

router.post('/order', orderController.postOrder);

module.exports = router;