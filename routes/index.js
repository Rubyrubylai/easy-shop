const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const schema = require('../config/schema');
const validateMiddleware = require('../config/validateMiddleware');


/**
* @swagger
* /api/products:
*   get:
*     tags:
*     - Product
*     summary: 商品清單
*     parameters:
*       - in: query
*         name: limit
*         schema:
*           type: integer
*       - in: query
*         name: offset
*         schema:
*           type: integer
*     responses:
*       200:
*         description: success
*         schema:
*           type: object
*           properties:
*             code:
*               type: integer
*               example: 200
*             data:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   name:
*                     type: string
*                     description: 商品名稱
*                   price:
*                     type: integer
*                     description: 商品價格
*                   image:
*                     type: string
*                     description: 商品圖片的網址
*               example:
*               - name: skirt
*                 price: 1000
*                 image: http://placeimg.com/640/480
*               - name: pants
*                 price: 500
*                 image: http://placeimg.com/640/480
*       500:
*         description: unexpected error
*/
router.get('/products', productController.getProducts);

/**
* @swagger
* /api/product/{id}:
*   get:
*     tags:
*     - Product
*     summary: 商品明細
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*           example: 1
*         required: true
*     responses:
*       200:
*         description: success
*         schema:
*           type: object
*           properties:
*             code:
*               type: integer
*               example: 200
*             data:
*               type: object
*               properties:
*                 name: 
*                   type: string
*                   description: 商品名稱
*                   example: skirt
*                 price:
*                   type: integer
*                   description: 商品價格
*                   example: 1000
*                 image:
*                   type: string
*                   description: 商品圖片的網址
*                   example: http://placeimg.com/640/480
*                 description: 
*                   type: string
*                   description: 商品描述
*                   example: It is a fancy skirt
*       404:
*         description: not found
*       500:
*         description: unexpected error
*/
router.get('/product/:id', productController.getProduct);

/**
* @swagger
* /api/order:
*   post:
*     tags:
*     - Order
*     summary: 建立訂單
*     produces:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             amount: 
*               type: integer
*               description: 購買總金額
*               required: true
*               example: 1000
*             address: 
*               type: string
*               description: 購買人地址
*               required: true
*               example: The stress 30
*             name:
*               type: string
*               description: 購買人姓名
*               required: true
*               example: Tony
*             phone: 
*               type: string
*               description: 購買人電話
*               required: true
*               example: 0912312123
*             email: 
*               type: string
*               description: 購買人信箱
*               required: true
*               example: tony@example.com
*             items:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   productId:
*                     type: integer
*                     required: true
*                     description: 商品編號
*                   price:
*                     type: integer
*                     required: true
*                     description: 商品價格
*                   quantity:
*                     type: integer
*                     required: true
*                     description: 單一商品的購買數量
*               example:
*               - productId: 1
*                 price: 500
*                 quantity: 2
*               - productId: 2
*                 price: 500
*                 quantity: 1
*     responses:
*       200:
*         description: success
*         schema:
*           type: object
*           properties:
*             code:
*               type: integer
*               example: 200
*             data:
*               type: object
*               properties:
*                 id: 
*                   type: integer
*                   description: 訂單編號
*                   example: 1
*                 amount:
*                   type: integer
*                   description: 購買總金額
*                   example: 1000
*                 status:
*                   type: integer
*                   description: 訂單狀態，0:失敗, 1:成功
*                   example: 1
*                 quantities: 
*                   type: string
*                   description: 購買總數量
*                   example: 3
*       400:
*         description: parameter error
*       500:
*         description: unexpected error
*/
router.post('/order', validateMiddleware(schema.postOrder), orderController.postOrder);

module.exports = router;

