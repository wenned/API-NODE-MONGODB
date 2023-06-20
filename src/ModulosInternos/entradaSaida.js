const accessKey = Math.random().toString(36).substring(2,15)

async function entradaSaida(req, res){
    var resp = await insertKey(`${req.params.Mesa}`)
    
    switch(req.params.id){
         
         case 'pagar':
             mongoose.connection.db.collection('mesas').updateOne({Id:`${resp}`},{$set:{[`${req.params.Mesa}`]:"pagar"}})
             res.json(['true'])
             break

         case 'apagar':
             mongoose.connection.db.collection('mesas').updateOne({Id:`${resp}`},{$set:{[`${req.params.Mesa}`]:false}})
             res.json(['true'])
             break
 
         case 'deletar':
             mongoose.connection.db.collection('pedidos').deleteOne({Nu_Pedido:req.params.Mesa})
             res.json(['true'])
             break
 
         case 'abrir':
 
             try{
 
                 var convr = JSON.parse(req.params.Mesa) 
                 var respp = await insertKey(`${convr[1]['Mesa']}`)
 
                 if(resp === undefined){             
                
                     await mongoose.connection.db.collection('mesas').findOne({Id:`${respp}`})
                     .then(doc =>{
                         if( doc[`${convr[1]['Mesa']}`] === convr[0][`accessKey`]){
                             res.json(true)
                         }else{
                             res.json(false)
                         };
                     });
                 }           
             
             }catch(error){
                 
                 if(String(error) === 'SyntaxError: Unexpected token M in JSON at position 0'){
 
                     await mongoose.connection.db.collection('mesas').findOne({Id:`${resp}`})
                     .then(doc =>{
                         if(doc[`${req.params.Mesa}`] === false){
                             req.session.accessKey = accessKey;
                             res.json({accessKey})
                             mongoose.connection.db.collection('mesas').updateOne({Id:`${resp}`},{$set:{[`${req.params.Mesa}`]:`${accessKey}`}})
 
                         }else{
                             if(doc[`${req.params.Mesa}`].length > 0 && req.params.id === doc[`${req.params.Mesa}`]){
                                 res.json({accessKey})
                             }else{
                                 res.json(false)
                             };
                         };          
                     });             
                 };
             };
             break
 
         default:
             break
     };   
};

export default entradaSaida;
