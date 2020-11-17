const { Schema, model } = require('mongoose');

/*
The name of the pizza

The name of the user that created the pizza

A timestamp of when the pizza was created

A timestamp of any updates to the pizza's data

The pizza's suggested size

The pizza's toppings
*/

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: [],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    toJSON: {
        virtuals: true,
    },
    id: false
});

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

// need to call this after the schema is made
const Pizza = model('Pizza', PizzaSchema);


// export the Pizza model
module.exports = Pizza;