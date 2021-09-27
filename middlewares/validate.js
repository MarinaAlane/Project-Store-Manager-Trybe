const checkName = (req, res, next) => {
    const { name } = req.body;
if (typeof name !== 'string') {
 return res.status(422).json({
    err: { code: 'invalid_data', message: '"name" must be string' },
});
} 
if (name.length <= 5) {
    return res.status(422).json({
        err: {
            code: 'invalid_data', message: '"name" length must be at least 5 characters long',
        },
    });
}
 next();
};

const checkProductQuantify = (req, res, next) => {
 const { quantity } = req.body;
 if (typeof quantity !== 'number') {
     return res.status(422).json({
         err: {
             code: 'invalid_data',
             message: '"quantity" must be a number',
         },
     });
 }
 if (quantity <= 0) {
     return res.status(422).json({
         err: {
             code: 'invalid_data',
             message: '"quantity" must be larger than or equal to 1',
         },
     });
 }
 next();
};

// validações Sales

const checkSalesQuantity = (req, res, next) => {
let error = null;
const message = 'Wrong product ID or invalid quantity';

req.body.forEach((sales) => {
    if (typeof sales.quantity !== 'number') {
        error = { err: { code: 'invalid_data', message } };
    }
    if (sales.quantity <= 0) {
        error = { err: { code: 'invalid_data', message } };
    }
});
    if (error !== null) return res.status(422).json(error);

next();
};

module.exports = { checkName, checkProductQuantify, checkSalesQuantity };
