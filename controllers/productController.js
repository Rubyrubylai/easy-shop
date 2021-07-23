const { image } = require('faker');
const db = require('../models');
const { Product } = db;

module.exports = {
  getProducts: async(req, res) => {
    try {
      let products = await Product.findAll({
        raw: true,
        nest: true,
        attributes: ['name', 'price', 'image']
      });
      return res.json({
        code: 200,
        data: products
      });
    }
    catch (err) {
      console.error(`getProducts fail, ${err.message}`);
    }
  },

  getProduct: async(req, res) => {
    try {
      let { id } = req.params;
      let product = await Product.findOne({
        where: {
          id: id
        },
        attributes: ['name', 'price', 'image', 'description']
      });
      if (!product) {
        return res.json({
          code: 400,
          message: 'productId does not exist'
        });
      }
      product = product.toJSON();
      return res.json({
        code: 200,
        data: product
      });
    }
    catch (err) {
      console.error(`getProduct fail, ${err.message}`);
    }
  }
}