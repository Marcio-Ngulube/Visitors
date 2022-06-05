

var visitor_url ="https://85o0pmpnv9.execute-api.us-east-1.amazonaws.com/default/marnvisitor";
key="";


function sayHello() {
	
				window.location.href = "index.html";
  	
}




function getVisitorNameAndRegNumber(){

	const xhttp = new XMLHttpRequest();
		xhttp.open("GET",visitor_url+"?method=getVisitor&&value="+localStorage["visitor_reg_number"],true);
		xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
		
		console.log("aguento");
		
		xhttp.onreadystatechange = function () {

			 if (xhttp.readyState == XMLHttpRequest.DONE) {
			 	      response_data=this.responseText;
			 	      console.log(response_data);
			 	      console.log(visitor_url+"?method=getVisitor&&value="+localStorage["visitor_reg_number"]);
        			const objects = JSON.parse(response_data);
        			document.getElementById("visitor_name").innerHTML = "Thank you for registering: "+objects['visitor_name'];
        			document.getElementById("visitor_reg_number").innerHTML = "Register Number: "+objects['visitor_register_num'];
    		}
		};

		xhttp.send('');

}


getVisitorNameAndRegNumber();



   


/*-----------------------------------------------------------------------------------
/*
/* End of read file
/*-----------------------------------------------------------------------------------*/
