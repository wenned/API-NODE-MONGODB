const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const connect = require('../conectMongo');



async function retornoOne(args) {
	
	await connect.on('open', async () => {

	try {
		const res = await mongoose.connection.db.collection('estoques').findOne({ [args]: { $gt: 0 } });

		if (res === null) {
        } else {
          return true;
        }
    } catch (err) {
        console.log(err);
    } finally {
		mongoose.connection.close();
    }
})
}

async function retornoTwo(b) {

	await connect.on('open', async () => {


	try {
        let cont = 0;

        for (const item of b) {
          const res = await mongoose.connection.db.collection('estoques').findOne({ [item]: { $gt: 0 } });

          if (res === null) {
            cont++;
          }
        }

        if (cont === 0) {
          return true;
        }
    } catch (err) {
        console.log(err);
    } finally {
        mongoose.connection.close();
    }
})
}


module.exports = { retornoOne, retornoTwo };

