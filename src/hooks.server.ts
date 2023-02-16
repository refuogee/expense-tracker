import { start_mongo } from "$db/mongo";

start_mongo().then(() => {
    console.log('Mongo Started');
}).catch(e => {console.error(e)})