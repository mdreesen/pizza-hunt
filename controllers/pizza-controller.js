const { pizza, db } = require('../models');
const Pizza = require('../models/Pizza');

const pizzaController = {
    // Get all Pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Find one Pizza
    // This deconstructs the params data
    // Finds the Pizza by the ID
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .then(dbPizzaData => {
                // if no pizza is found, throw a 404
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza is found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Create Pizza
    // deconstructs the body data
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // Update pizzaById
    // deconstructs the params and body data
    // If we dont set { new: true }, it will return the original document - 
    // We're instructing mongoose to return the new version of the document
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbPizzaData => {
                // create if, if there is no pizza data
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

    // Delete Pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No Pizza was found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }

};

module.exports = pizzaController;