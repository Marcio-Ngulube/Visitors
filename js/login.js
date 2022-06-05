
/*
var ip='';
ip = location.host;
ip=ip.split(':')[0];
localStorage["ip"]=ip;
localStorage["ip"]=ip+"localhost:6379";
console.log("ip "+localStorage["ip"]);*/
var visitor_url ="https://85o0pmpnv9.execute-api.us-east-1.amazonaws.com/default/marnvisitor";
key="";


//localStorage["ip"]="localhost";
function sayHello() {
	
	var  name = document.loginForm.name.value;
	var  code= document.loginForm.code.value;

	if(code === key){
	const xhttp = new XMLHttpRequest();
		xhttp.open("GET",visitor_url+"?method=registerVisitor&&value="+name,true);
		xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
		//xhttp.setRequestHeader("accept", "*/*");
		
		console.log("aguento");
		
		xhttp.onreadystatechange = function () {

			 if (xhttp.readyState == XMLHttpRequest.DONE) {
        			localStorage["name_visitor"] = name;
        			response_data=this.responseText;
        			const objects = JSON.parse(response_data);
        			console.log(response_data);
        			localStorage["visitor_reg_number"] = objects['visitor_register_num'];
        			window.location.href = "visitor_view.html";
    		}
		};

		xhttp.send('');

		}
}



function initial(){

	setVisitorNumber();
	makeid(5);
}

function setVisitorNumber(){

	const xhttp = new XMLHttpRequest();
		xhttp.open("GET",visitor_url+"?method=getNumberOfVisits",true);
		xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
		//xhttp.setRequestHeader("accept", "*/*");
		
		console.log("aguento");
		
		xhttp.onreadystatechange = function () {

			 if (xhttp.readyState == XMLHttpRequest.DONE) {
        			const objects = JSON.parse(this.responseText);
        			document.getElementById("name_visitor").innerHTML = "Please Register, Visitor number: "+objects['number_of_visits'];
    		}
		};

		xhttp.send('');

}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   key = result;

   document.getElementById("h1").innerHTML = "Key: "+result;
}

initial();



   


/*-----------------------------------------------------------------------------------
/*
/* End of read file
/*-----------------------------------------------------------------------------------*/
