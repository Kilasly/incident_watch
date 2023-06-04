const Accident = require('../model/accidentModel');

const addAccident= async (req, res) => {
    const newAccident =await Accident.create(req.body);

    res.status(200).json(newAccident);

}

module.exports = addAccident;