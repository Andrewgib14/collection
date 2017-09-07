const express = require("express");
const indexRoutes = express.Router();
const PopVinyl = require("../models/PopVinyl.js");


indexRoutes.post("/", function (req, res) {
    console.log(req.body);
    let PopVinylFigure = new PopVinyl(req.body);
    PopVinylFigure
        .save()
        .then(function (savedPop) {
            res.redirect("/");
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
indexRoutes.get("/pop/:id", function (req, res) {
    PopVinyl.findById(req.params.id)
        .then(function (foundPop) {
            if (!foundPop) {
                return res.send({ msg: "No Pops found." })
            }
            res.render("singlePop", { foundPop: foundPop })
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
})

indexRoutes.post("/pop/:id", function (req, res) {
    PopVinyl.findByIdAndUpdate(req.params.id, req.body)
        .then(function (updatedPop) {
            if (!updatedPop) {
                return res.send({ msg: "Could not update Pop." })
            }
            return res.redirect(`/pop/${req.params.id}`)
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
})

indexRoutes.get("/delete/:id", function (req, res) {
    PopVinyl.findByIdAndRemove(req.params.id)
        .then(function (message) {
            res.redirect("/");
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
})

module.exports = indexRoutes;