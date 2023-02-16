import {MongoClient} from 'mongodb';
import { MONGO_URI } from '$env/static/private';


const client = new MongoClient(MONGO_URI);

export function start_mongo() {    
    return client.connect();
}

// Initially I didn't signal which database to use and couldn't figure out why it wasn't working

export default client.db('my-expenses')