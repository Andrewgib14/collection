const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PopVinylSchema = new Schema
    ({
        character:
        {
            name: {
                type: String,
                require: true
            },
            description:
            {
                releaseYear:
                {
                    type: Number,
                    min: 0,
                    max: 2017
                },
                size:
                {
                    type: String,
                    enum: ["normal", "large"]
                },
                subCollection: String
            }
        },
        popCollection:
        {
            type: String,
            require: true,
            enum: ["Heros", "Marvel", "Disney", "Star Wars", "Harry Potter", "WWE",
                "Television", "Movies", "Animation", "Game of Thrones", "Games", "Rocks",
                "Muppets", "Sesame Street", "Pets", "Ad Icons", "Sports", "Rides", "Books",
                "Stan Lee", "My Little Pony", "Holiday", "Freddy Funko", "Pop Asia"],

        },
        collectionNumber:
        {
            type: Number,
            require: true
        },


    })
module.exports = mongoose.model("PopVinyl", PopVinylSchema);