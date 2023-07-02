function makeid(...args){

	let result = '';
    
	const characters = 'ABCDEFGHIJLMNOPQRSTUVXZWYabdcedefghijlmnopqrstuvzxyw0123456789';
    
	const charactersLength = characters.length;
    
	let counter = 0;

	while (counter < args){
		result+= characters.charAt(Math.floor(Math.random()*charactersLength));
        counter+=1
    }

    return result;
}

export default makeid;
