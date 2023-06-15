const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const connect = require('./conectMongo');

async function removerADicional(...args) {
  
	console.log(args)
	connect.on('open', async ()=>{
		try {
			const mesas = await mongoose.connection.db.collection('mesas').find().toArray();
			console.log(mesas);
			mongoose.connection.close();
			} catch (err) {
				console.log(err);
				}
	})
}

module.exports = removerADicional;

