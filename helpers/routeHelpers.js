const Joi = require('joi');


module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if(result.error){
                return res.status(400).json(result.error);
            }

            if (!req.value) {
                req.value = {};
            }
            req.value['body'] = result.value;
            //req.value.body instead of req.body
            next();
        }
    },

    schemas: {
        authSchema: Joi.object().keys({
            email: Joi.string().email({minDomainAtoms: 2}).required(),
            password: Joi.string().required()
        })
    }
}