const mongoose = require('mongoose');
const USER_URL = 'mongodb://192.168.31.3:27017'
const USER_DB = 'sabormineiro'

mongoose.connect(`${USER_URL}/${USER_DB}`,
	{useNewUrlParser: true, useUnifiedTopology:true}

).then(()=>{
	
	console.log("Sucessfully connect to MongoDB")}

).catch(err=>{

	console.log("Connection erro", err),
	process.exit();
})

module.exports = mongoose.connection;
