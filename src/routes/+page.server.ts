import { expenses } from '$db/expenses';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import {ObjectId} from 'mongodb';

export const load: PageServerLoad = async function() {
    
    const data = await expenses.find({}, {projection: {_id:{ "$toString": "$_id" }, date:1, title:1, description:1, amount:1 }}).toArray();
    
    return {
            expenses: data    
    }
}

interface Expense {
    amount: number;
    title: string;
    description: string;
    date: Date;
    }

export const actions = {

    new: async ({ request }: { request : HTMLFormElement}) => {
        const data = await request.formData();

        let expense : Expense = {
            amount : parseFloat(data.get('amount')),
            title : data.get('title'),
            description : data.get('description'),
            date : data.get('date'),
        }
        
        const result = await expenses.insertOne(expense);
        console.log(
        `A document was inserted with the _id: ${result.insertedId}`,
        );
        return { success: true }
      },
    
    remove: async ({ request }: { request : HTMLFormElement}) => {
        const remove_data = await request.formData();
        
        const idToDelete = remove_data.get('id');
        console.log(idToDelete);

        const rem_result = await expenses.deleteOne( { "_id" : new ObjectId(idToDelete) } );
        return { success: true }
    }
  };