const axios = require('axios');
require('dotenv').config();

const userService_url = process.env.USER_SERVICE_ADDRES

//controller appeller par la route
const testController = async (req, res) =>{
    try {
        //appelle axios a la route au microservice
        const response = await axios.get('http://localhost:8010/test', {
             data:{
                 name : req.body.name
                }
            });
            // console.log(response)
        const {name} = response.data;
        return res.status(200).json({ message: `Hello ${name}!` });
        
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    testController
}