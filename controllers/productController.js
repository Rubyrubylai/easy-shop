const db = require('../models');
const { Product } = db;

module.exports = {
  getProducts: async(req, res) => {
    try {
      let { limit, offset } = req.query;
      if (limit) limit = Number(limit);
      if (offset) offset = Number(offset);
      let products = await Product.findAll({
        raw: true,
        nest: true,
        attributes: ['name', 'price', 'image'],
        offset,
        limit,
        order: [
          ['updatedAt', 'DESC']
        ]
      });
      return res.json({
        code: 200,
        data: products
      });
    }
    catch (err) {
      console.error(`getProducts fail, ${err.message}`);
      return res.json({
        code: 500,
        message: err.message
      });
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
        return res.status(404).json({
          code: 404,
          message: 'productId does not exist.'
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
      return res.json({
        code: 500,
        message: err.message
      });
    }
  }
}