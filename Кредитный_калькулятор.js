window.onload =start;
let output;
let payment_table;
function start(){
	let calculate = document.querySelector(".calculate");
    calculate.onclick = CalculateClick;
}
   
function CalculateClick(){
	let form = document.forms.credit;
	let credit_amount = Number(form.elements["credit-amount"].value);
	let currency = form.elements["currency-select"].value;
    let credit_time = Number(form.elements["credit-time"].value);
    let credit_time_select = form.elements["credit-time-select"].value;
    let interest_rate = Number(form.elements["interest-rate"].value.replace(",","."));
    let interest_rate_select = form.elements["interest-rate-select"].value;
	
	let p = 0;
	
	if(interest_rate_select == "month"){
		interest_rate = interest_rate*12.0;
    }
    else if(interest_rate_select == "day"){
		interest_rate = interest_rate*365.0;
    }
    else{
		interest_rate = interest_rate;
    }

    if(credit_time_select == "year"){
		credit_time = credit_time*12.0;
    }
   
    let monthly_payment = credit_amount * interest_rate / (100.0 * 12.0) /(1-Math.pow(1+interest_rate / (100.0 * 12.0), -credit_time));
    
    let output = document.querySelector(".output");
    output.style.display = "block";
    
    let table = document.createElement("table"); 
    table.classList.add("resulttable");

    let row = table.insertRow();
    let cell1 = row.insertCell();
    cell1.innerHTML = "Сумма ежемесячного платежа: ";    
    let cell2 = row.insertCell();
    cell2.style.textAlign = "right";
    cell2.style.color = "white";
    cell2.innerHTML = Math.round(monthly_payment,2);
    
    let row2 = table.insertRow();
    let cell3 = row2.insertCell();
    cell3.innerHTML = "Переплата: " ;
    let cell4 = row2.insertCell();
    cell4.style.textAlign = "right";
    cell4.style.color = "white";
    cell4.innerHTML = Math.round(monthly_payment,2)* credit_time - credit_amount;
        
    let row3 = table.insertRow();
    let cell5 = row3.insertCell();
    cell5.innerHTML = "Итоговая переплата за весь период: ";
    let cell6 = row3.insertCell();
    cell6.style.textAlign = "right";
    cell6.style.color = "white";
    cell6.innerHTML = ((Math.round(monthly_payment, 2) * credit_time * 100) / credit_amount - 100).toFixed(2) + "%";

    let row4 = table.insertRow();
    let cell7 = row4.insertCell();
    cell7.innerHTML = "Полная стоимость кредита, годовых: ";
    let cell8 = row4.insertCell();
    cell8.style.textAlign = "right";
    cell8.style.color = "white";
    cell8.innerHTML = ((Math.round(monthly_payment, 2) * credit_time * 100) / credit_amount - 100).toFixed(2) / (credit_time / 12) + "%";
    output.innerHTML = "ИТОГО:";
    output.appendChild(table);
    CreateTable(credit_amount, monthly_payment, credit_time, interest_rate)
};
   
function CreateTable(credit_amount, monthly_payment, credit_time, interest_rate){
    const columnDefs = [
      { field: "number", headerName: '№'},
      { field: "date", headerName: 'Дата платежа'},
      { field: "debtpay", headerName: 'Основной долг'},
      { field: "remainder", headerName: 'Остаток долга'}
      ];

    let rowData = [];
    let today = new Date();
    let year = today.getFullYear();
	
    for(i = 0; i < credit_time;i++) {
		info ={};
		info.number = i+1;
		info.date = i + ", " + year;
		datepay = new Date(year,i,1);
		info.date = (datepay.getMonth()+1) + ", " + datepay.getFullYear();
		let percpart = credit_amount * interest_rate/(100*12);
		let realplat = monthly_payment - percpart;
		credit_amount = credit_amount - realplat;
		info.debtpay = realplat.toFixed(2);
		info.remainder = credit_amount.toFixed(2);
		rowData.push(info);     
     };

    const gridOptions = {
		columnDefs: columnDefs,
		rowData: rowData,
        animateRows: true
	};
	const gridDiv = document.querySelector('payment_table');
            
	if (payment_table==undefined){
		payment_table = new payment_table.Grid(gridDiv, gridOptions);
	}
	else{
		payment_table.destroy();
		payment_table = new payment_table.Grid(gridDiv, gridOptions);
	}       
}; 
