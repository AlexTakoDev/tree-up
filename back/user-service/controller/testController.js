const { validationResult } = require('express-validator');
const testService = require('../service/testService')

//controller appeller par la route 
const testController = async (req, res) => {
    try {
        return res.status(200).json({ name: await testService.getLastnameFromFirstname(req.body) });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const testpostController = async (req, res) => {
    try {
        return res.status(200).json({ result: await testService.postUserTest(req.body) });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const testPostProfile = async (req, res) => {
    try {
        return res.status(200).json({ result: await testService.postProfileTest(req.body) });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    testController,
    testpostController,
    testPostProfile
}