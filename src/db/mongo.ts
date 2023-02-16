import {MongoClient} from 'mongodb';
import { MONGO_URI } from '$env/static/private';


const client = new MongoClient(MONGO_URI);

export function start_mongo() {
    console.log('starting mongo...');
    return client.connect();
}

export default client.db('my-expenses')