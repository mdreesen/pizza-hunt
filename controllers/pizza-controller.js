const { Pizza } = require('../models');
// const Pizza = require('../models/Pizza');

const pizzaController = {
    // get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one pizza by id
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // Create Pizza
    // deconstructs the body data
    // createPizza
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.json(err));
    },


    // Update pizzaById
    // deconstructs the params and body data
    // If we don't set { new: true }, it will return the original document - 
    // We're instructing mongoose to return the new version of the document
    // We're instructing mongoose to return the new version of the document
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },

    // Delete Pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.json(err));
    }
}


module.exports = pizzaController;