import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

function carregarEnv(){

	const envPath = path.resolve(_dirname, '../../.env');
	const env = fs.readFileSync(envPath,'utf-8');

	env.split('\n').forEach( linha => {
		const [chave, valor] = linha.split('=');
		if (chave && valor && !process.env[chave]){
			process.env[chave.trim()] = valor.trim();
		}
	});
};

carregarEnv();

export const config = {
	couchdbUrl: process.env.COUCHDB_URL,
	userId: process.env.USER_ID,
	userKey: process.env.USER_KEY
};
