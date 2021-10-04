// Can be used as an identifier, increment each time when you insert a record
let idx = 0; 

/* 
  Please go through the HTML the code first for better understanding
  You don't need to modify HTML to complete this week's task
  No need to worry about the CSS at all
*/
let counta = 0;
let countb = 0;
let countc = 0;
// DOM Selections
const elements = {
  addButton: document.querySelector('.add__btn'),
  selectOption: document.querySelector('.add__type'),
  descBox: document.querySelector('.add__description'),
  budgetValue: document.querySelector('.add__value'),
  totalBudget: document.querySelector('.budget__value'),
  totalIncome: document.querySelector('.budget__income--value'),
  totalExpense: document.querySelector('.budget__expenses--value'),
  totalExpensePer: document.querySelector('.budget__expenses--percentage')

};
// Object to hold the budget records
const budgetRecords = {
  incomes: [], // object structure would be { id, description, value }
  expenses: [],
  incomeTotal: 0,
  expenseTotal: 0,
  remainingBudget: 0,

  addExpense: function (desc, value) {
    // add your code here
    this.expenses.push({'id':this.expenses.length-1, 'desc': desc, 'value': Number(value)})
    // it should push a new object in the 'this.expenses' array
  },

  addIncome: function (desc, value) {
    // add your code here
    // it should push a new object in the 'this.incomes' array
    this.incomes.push({'id':this.incomes.length, 'desc': desc, 'value': Number(value)})
  },

  removeItem: function(el){
      if (el.classList.contains('ion-ios-close-outline')){
        el.parentElement.parentElement.parentElement.parentElement.remove()
      }
  },

  showAlert: function(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.budget');
    const form = document.querySelector('.budget__title');
    container.insertBefore(div, form);
    //vanish in 3 seconds
    setTimeout(()=> document.querySelector('.alert').remove(), 3000 )
    
  },

  calculateTotal: function (data) {
    
    // add your code here
    // find out the values for this.incomeTotal, this.expenseTotal and this.remainingBudget
    if (elements.selectOption.value === 'inc'){
      if(elements.descBox.value === '' || elements.budgetValue.value === '' ) {
       budgetRecords.showAlert('Please fill in all fields', 'info');
       return;
      }
      else {
        let element1 =  `<div class="item clearfix" id="income-${counta}">
        <div class="item__description">${elements.descBox.value}</div>
        <div class="right clearfix">
            <div class="item__value">+ ${elements.budgetValue.value}</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
      </div> `

      
        let para1 = document.querySelector('.income__list');
        para1.insertAdjacentHTML('beforeend',element1);
        // counta += 1;
        // console.log(counta)
        this.incomeTotal += Number(data); 
        this.remainingBudget = this.incomeTotal - this.expenseTotal;

        let element3 = `${this.remainingBudget}`;
        elements.totalIncome.innerHTML = `+ $${this.incomeTotal}`;
          if (element3 >= 0 ){
            elements.totalBudget.innerHTML = ` $${element3}`; 
          }
          else{
            elements.totalBudget.innerHTML = `- $${-1 * element3}`;
          }

        // *************** for the percentage representation **************** //
        if ( this.incomeTotal == 0 && this.expenseTotal == 0){
          elements.totalExpensePer.innerHTML = `0%`
        }
        else if ( this.incomeTotal ==0 && this.expenseTotal > 0 ){
          elements.totalExpensePer.innerHTML = `100%`;
          for ( let i = 0; i < counta; i++){
            document.getElementById(`ind-${i}`).innerHTML = `${((elements.budgetValue.value/this.expenseTotal)*100)}%`
          } 
        }
        else if (this.incomeTotal > 0 && this.expenseTotal > 0 ) {
          let per = ((this.expenseTotal/this.incomeTotal)*100).toFixed(0)
          elements.totalExpensePer.innerHTML = `${per}%`
          for ( let i = 0; i < countb; i++){
            let indExp = document.getElementById(`ind-${i}`)
            console.log(indExp)
           let ver = this.expenses[i].value
            indExp.innerHTML = `${((ver/this.incomeTotal)*100).toFixed(1)}%`
          }
        } 
      

        
          //make the fields blank
          elements.descBox.value ='';
          elements.budgetValue.value ='';
      }
      counta += 1;   
    }
  
    else if(elements.selectOption.value === 'exp'){

      if(elements.descBox.value === '' || elements.budgetValue.value === '') {
       budgetRecords.showAlert('Please fill in all fields', 'info');
       return;
      }

      else {
        let element2 = ` <div class="item clearfix" id="expense-${countb}">
      <div class="item__description">${elements.descBox.value}</div>
      <div class="right clearfix">
          <div class="item__value">- ${elements.budgetValue.value}</div>
          <div class="item__percentage" id = "ind-${countc}" >0%</div>
          <div class="item__delete">
              <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
          </div>
      </div>
  </div>`

      let para2 = document.querySelector('.expenses__list');
      para2.insertAdjacentHTML('beforeend',element2);
      this.expenseTotal += Number(data);
      this.remainingBudget = this.incomeTotal - this.expenseTotal;

      //countb += 1;
      
      if ( this.incomeTotal == 0 && this.expenseTotal == 0){
        elements.totalExpensePer.innerHTML = `0%`
        console.log('1');
      }
      else if ( this.incomeTotal ==0 && this.expenseTotal > 0 ){
        elements.totalExpensePer.innerHTML = `100%`;
        console.log('2');
        for ( let i = 0; i <= countb; i++){
          document.getElementById(`ind-${i}`).innerHTML = `${((elements.budgetValue.value/this.expenseTotal)*100)}%`
        } 
      }
      else if (this.incomeTotal > 0 && this.expenseTotal > 0 ) {
        let per = ((this.expenseTotal/this.incomeTotal)*100).toFixed(0)
        elements.totalExpensePer.innerHTML = `${per}%`
        for ( let i = 0; i <= countb; i++){
          let indExpa = document.getElementById(`ind-${i}`)
           let vera = this.expenses[i].value
            indExpa.innerHTML = `${((vera/this.incomeTotal)*100).toFixed(1)}%`
        } 
        
      }
      countb += 1;
      countc += 1;

      // elements.expenseTotal.innerHTML(``)
      let element3 = `${this.remainingBudget}`;
      elements.totalExpense.innerHTML = `- $${this.expenseTotal}`;
        if (element3 >= 0 ){
         elements.totalBudget.innerHTML = `+ $${element3}`;
        }
        else{
         elements.totalBudget.innerHTML = `- $${-1 * element3}`;
        }

        // make the fields blank
        elements.descBox.value ='';
        elements.budgetValue.value ='';
      }
  }
 }
  };

// Adds the event listener on the check button
// Everything is done in this part, no need to modify. Just try to understand
elements.addButton.addEventListener('click', () => {
  const recordType = elements.selectOption.value;
  const desc = elements.descBox.value;
  const value = elements.budgetValue.value;

  if (recordType === 'inc') {
    budgetRecords.addIncome(desc, value);
    budgetRecords.calculateTotal(value);
  } else {
    budgetRecords.addExpense(desc, value);
    budgetRecords.calculateTotal(value);
  }

  // shows the object in the console
  console.log(budgetRecords);
  
});

document.querySelector('.income__list',).addEventListener('click', (e) => {
  budgetRecords.removeItem(e.target); //specific cause there are many buttons with same class
})

document.querySelector('.expenses__list').addEventListener('click', (e) => {
  budgetRecords.removeItem(e.target); //specific cause there are many buttons with same class 
})



