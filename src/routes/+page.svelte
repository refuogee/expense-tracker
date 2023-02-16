<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData
    
    export let expenseTotal = 0;

    let expensesArray = data.expenses;
    
    expensesArray.forEach(expenseItem => {        
        expenseTotal += expenseItem.amount;
    })

    $: ({ expenses } = data)
</script>

<div class="container mx-auto relative h-screen min-h-full">
    
    <div class="container flex flex-row mx-auto bg-gray-100 rounded-xl shadow border p-8 m-2">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-100 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <div class="text-xl p-1 m-1 font-medium">Expense Tracker</div>

    </div>

    <div class="container mx-auto bg-gray-100 rounded-xl shadow border p-8 m-10 relative">
        <p class="text-xl p-1 mb-0 font-medium underline">Expenses</p>
        <p class="text-base p-1 mb-6 font-light">The below is a list of your expenses. To remove an expense press the red delete sign. To add an expense input the required info below.</p>

        <div class="container mx-auto bg-gray-100 rounded-xl shadow border p-8 m-10">
            <p class="text-xl p-1 mb-0 font-medium">Add an Expense</p>
            <p class="text-base p-1 mb-6 font-light">To add an expense input the required info and press add.</p>
            <form method="POST" action="?/new">
                
                <div class="flex flex-col md:flex-row -mx-3 mb-2">
                    
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                        Date:
                      </label>
                      <input class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="date" placeholder="yyyy/mm/dd"  name="date" required>
                    </div>
            
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                            Title
                        </label>          
                        <input class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="What did you buy?"  name="title" required>            
                    </div>
            
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                          Description
                        </label>                                  
                        <textarea rows = "2" class="appearance-none block w-full disabled:bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Any extra purchase info..."  name="description" required></textarea>
                    </div>
            
                      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                          Amount
                        </label>          
                       <input class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="number" placeholder="Expense Amount" name="amount" step="0.01" required>            
                      </div>
                      <button class="bg-green-600 hover:bg-green-700 h-10  text-white font-bold mt-7 py-2 px-4 rounded">Add</button>  
                </div>
            </form>
        </div>
    
        <div class="container mx-auto bg-gray-100 rounded-xl shadow border p-8 m-10 overflow-auto h-96">
            {#each expenses as expense}
    
                <form method="POST" action="?/remove">        
                    <div class="flex flex-col md:flex-row -mx-3 mb-5 border-2 p-5 rounded bg-gray-200">
                        <input type="hidden" name="id" value={expense._id}>
            
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Date:
                        </label>
                        <input class="appearance-none block w-full disabled:bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" value="{new Date(expense.date).toLocaleDateString("en-GB", {weekday: "long", year: "numeric", month: "long", day: "numeric"})}"  name="date" disabled>
                        </div>
                
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                Title
                            </label>                          
                            <input class="appearance-none block w-full disabled:bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" value="{expense.title}"  name="title" disabled>            
                        </div>
                
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                            Description
                            </label>                                      
                            <textarea rows = "2" class="appearance-none block w-full disabled:bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value="{expense.description}"  name="description" disabled></textarea>
                        </div>
                
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                            Amount
                        </label>          
                        <input class="appearance-none block w-full disabled:bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="{ (expense.amount).toLocaleString('en-US', { style: 'currency', currency: 'ZAR' }) }" name="amount" step="0.01" disabled>            
                        </div>
                        <button class="bg-red-500 h-10 hover:bg-red-700 text-white font-bold mt-7 py-2 px-4 rounded mx-auto"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg></button>        
                    </div>
                </form>
            {/each}
        </div>
        
        
        <div class="container mx-auto bg-gray-100 rounded-xl shadow border p-8 mt-10 mb-1 flex justify-end">
            <p class="text-xl p-1 mb-0 font-medium">Total: <span class="underline underline-offset-4"> { (expenseTotal).toLocaleString('en-US', { style: 'currency', currency: 'ZAR' }) } </span></p>
        </div>
    </div>
    
    

</div>



  