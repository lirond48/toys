const express = require('express');
const { toysModel, validToys } = require("../models/toysModels");
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    toysModel.find({}, (err, data) => {
        if (err) {
            res.json(err);
        }
        res.json(data);
    })
});

router.get("/cat/:catId", (req, res) => {
    toysModel.find({ category: req.params.catId }, (err, data) => {
        if (err) {
            res.json(err);
        }
        res.json(data);
    })
});

router.post("/add", async (req, res) => {
    const valid = validToys(req.body);

    if (valid.error) {
        return res.status(400).json(valid.error.details[0])
    }
    let data = await toysModel.find({ name: req.body.name });

    if (data.length > 0) {
        return res.status(400).json({ message: "name already in the system" })
    }
    else {

        let saveData = await toysModel.insertMany([req.body]);
        res.json(saveData);
    }
})

router.post("/del", (req, res) => {
    let delById = req.body.del;
    toysModel.deleteOne({ _id: delById })
        .then(data => {
            if (data.deletedCount > 0) {
                res.json({ massage: "deleted" });
            }
            else {
                res.status(400).json({ error: "error id not found" });
            }
        })

})


router.post("/edit", async (req, res) => {
    let dataBody = req.body;
    let prod = await validToys(dataBody);
    if (prod.error) {
        res.status(400).json(prod.error.details[0])
    }
    else {
        try {

            let updateData = await toysModel.updateOne({ _id: req.body.id }, req.body);
            res.json(updateData)

        }
        catch{
            res.status(400).json({ message: "error cant find id" })
        }
    }
})

module.exports = router;