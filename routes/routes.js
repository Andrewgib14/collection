const express = require("express");
const indexRoutes = express.Router();
const PopVinyl = require("../models/PopVinyl.js");


indexRoutes.post("/", function (req, res) {
    console.log(req.body);
    let PopVinylFigure = new PopVinyl(req.body);
    PopVinylFigure
        .save()
        .then(function (savedPop) {
            res.render("index", savedPop);
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
})

indexRoutes.get("/", function (req, res) {
    PopVinyl.find()
        .then(function (foundPops) {
            console.log('foundPops: ', foundPops);
            if (!foundPops.length) {
                return res.render("index", { msg: "No records found" })
            }
            res.render("index", { popVinyls: foundPops })
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
})
indexRoutes.get("/:id", function (req, res) {
    PopVinyl.findById(req.params.id)
        .then(function (foundPop) {
            if (!foundPop) {
                res.send({ msg: "No Pops found." })
            }
            res.render("index", foundPop)
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
})

indexRoutes.put("/:id", function (req, res) {
    PopVinyl.findByIdAndUpdate(req.params.id, req.body)
        .then(function (updatedPop) {
            if (!updatedPop) {
                res.send({ msg: "Could not update Pop." })
            }
            res.render("index", updatedPop)
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
})

indexRoutes.delete("/:id", function (req, res) {
    PopVinyl.findByIdAndRemove(req.params.id)
        .then(function (message) {
            res.send(message)
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
})

module.exports = indexRoutes;