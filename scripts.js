
const Modal = {
    open() {
        // Abrir modal
        document.querySelector(".modal-overlay").classList.add('active')
    },
    close() {
        document.querySelector(".modal-overlay").classList.remove('active')
    }
 }

 const Transaction = {
     incomes() {
         // Somar todas as entradas
         let income = 0
         transactions.forEach((transaction) => {
             if(transaction.amount > 0){
              income += transaction.amount
            } 
         })

         return income

     },
     expenses() {
         //Somar as Saídas
         let expenses = 0
         transactions.forEach((transaction) => {
             if(transaction.amount < 0){
              expenses += transaction.amount
            } 
         })

         return expenses

     },
     total() {
        //Entradas - saídas
       const total = Transaction.incomes() + Transaction.expenses()

       return total
     }
 }

 const transactions = [
     {
     id: 1,
     description: "Luz",
     amount: -5000,
     date: '16/11/2021'
 },
     {
     id: 2,
     description: "Criação de website",
     amount: 50000,
     date: '16/11/2021'
 },
     {
     id: 3,
     description: "Internet",
     amount: -20000,
     date: '16/11/2021'
 },
]

const DOM = {

    transactionContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        const transactionContainer = document.querySelector('#data-table tbody')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        
        DOM.transactionContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount < 0 ? "expense" : "income"

        const amount = Utils.formatCurrency(transaction.amount)


        const html = `
				<td class="description">${transaction.description}</td>
				<td class=${CSSclass}>${amount}</td>
				<td class="date">${transaction.date}</td>
				<td>
					<img src="./assets/minus.svg" alt="Remover transação" />
				</td>
        `
     
        return html
    },

    updateBalance() {
        document.getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total())
    }

}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) /100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value

    }
}

transactions.forEach((transaction) => DOM.addTransaction(transaction))

DOM.updateBalance()