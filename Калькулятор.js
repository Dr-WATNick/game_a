let val=0;
let compute="";
let memory = 0;

window.onload=function()
	{
	let num_elements = document.querySelectorAll(".number-buttons");
	for (num_elem of num_elements)
		{
			let num_text = num_elem.innerHTML
			num_elem.addEventListener("click",function(){NumberClick(num_text)});
		}
	let memory_elements = document.querySelectorAll(".memory-buttons");
	for (mem_elem of memory_elements)
		{
			let mem_text = mem_elem.innerHTML
			mem_elem.addEventListener("click",function(){MemoryClick(mem_text)});
		}
	let compute_elements = document.querySelectorAll(".compute-buttons");
	for (com_elem of compute_elements)
		{
			let com_text = com_elem.innerHTML
			com_elem.addEventListener("click",function(){ComputeClick(com_text)});
		}
	let AC_button = document.getElementById("AC");
	AC_button.addEventListener("click",function(){ClearClick("AC")});
	let CE_button = document.getElementById("CE");
	CE_button.addEventListener("click",function(){ClearClick("CE")});
	}


function NumberClick(num) {
	let display = document.querySelector(".display");
	let display_text = display.innerHTML;
	if (display_text == "0" & num != ".") {
		display_text = "";
	}
	if (display_text.length > 10) {
		return;
        }
	if (display_text.split(".").length == 2 & num == ".") {
		return;
        }
	display_text = display_text + num;
	display.innerHTML = display_text;
}

function ComputeClick(operation){
	if (operation != "="){
		let display = document.querySelector(".display");
		let display_text = display.innerHTML;
		val = Number(display_text);
		compute = operation;	
		display.innerHTML = "";
	}
	else{
		let display = document.querySelector(".display");
		let display_text = display.innerHTML;
		if (display_text != ""){
			val_2 = Number(display_text);
		}
		switch(compute){
			case "+":
				val = val + val_2;
				display.innerHTML = val;
				break;			
			case "–":
				val = val - val_2;
				display.innerHTML = val;
				break;
			case "×":
				val = val * val_2;
				display.innerHTML = val;
				break;			
			case "÷":
				val = val / val_2;
				display.innerHTML = val;
				break;
			case "%":
				val = val_2 * 100;
				display.innerHTML = val;
				alert(val);
				alert(val_2);
				break;
		}	
	}
}
                
function ClearClick(c_par){
	let display = document.querySelector(".display");
	switch(c_par){
		case "CE":
			display.innerHTML = "";
			break;
		case "AC":
			val = 0;
			compute = "";
			display.innerHTML = "";
			break;
	}
}	
                
function MemoryClick(mem_par){
	let display = document.querySelector(".display");
	let display_text = display.innerHTML;
	val = Number(display_text);
	switch(mem_par){
		case "MC":
			memory = 0;
			break;
		case "M+":
			memory = memory + val;
			break;
		case "M-":
			memory = memory - val;
			break;
		case "MR":
			display.innerHTML = memory;
			break;
	}
}
         
                
                        
                    

                

	
			

		
			