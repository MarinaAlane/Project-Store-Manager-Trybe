const rescue = require('express-rescue');

const service = require('../services/salesService');

const create = rescue(async (req, res) => {
  const sales = req.body;

  sales.forEach((sale) => {
    if (typeof sale.quantity !== 'number') {
      return res.status(422).json({ err: { code: 'invalid_data', 
      message: 'Wrong product ID or invalid quantity',
      } });
    }
    if (sale.quantity <= 0) {
      return res.status(422).json({ err: { code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      } });
    }
  });

  const createSale = await service.create(sales);

  if (createSale.err) return res.status(422).json(createSale);

  res.status(200).json(createSale);
});

const getAll = rescue(async (_req, res) => {
  const salesArray = await service.getAll();

  res.status(200).json({ sales: salesArray });
});

module.exports = {
  create,
  getAll,
};
