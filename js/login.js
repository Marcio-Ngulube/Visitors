
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

	const xhttp = new XMLHttpRequest();
	

   /*
	const xhttp = new XMLHttpRequest();
		xhttp.open("GET", "http://"+localStorage["ip"]+"/login",true);
		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		
		console.log("aguento");
		
		xhttp.onreadystatechange = function () {
			if (xhttp.readyState === 4) {
				const objects = JSON.parse(this.responseText);
				console.log("nos ss"+xhttp.status);
				if (objects['response_code'] === 200) {
					console.log(objects);
					localStorage["data"] = objects['token'];
					var employees = localStorage["data"];
					console.log("Sucesso lista de "+employees);
					alert("Sucess");
					localStorage["username"]=utilizador;
					load_page();
				} else {
					consolee.log("Failed "+objects['descricao']);
					alert("Failed "+objects['descricao']);
				}
			}
		};
		
		*/
}

function load_page(){
	
window.location.href = "principal.html";
};

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
        			console.log(responseText);
        			console.log(objects);
        			document.getElementById("name").innerHTML = "Please Register, Visitor number: "+objects[getQueryStringParameters];
    		}
			
			/*if (xhttp.readyState === 4) {
				const objects = JSON.parse(this.responseText);
				console.log("nos ss"+xhttp.status);
				console.log("devolve "+objects);
				if (objects['response_code'] === 200) {
					console.log("devolve "+objects);
					/*localStorage["data"] = objects['token'];
					var employees = localStorage["data"];
					console.log("Sucesso lista de "+employees);
					alert("Sucess");
					localStorage["username"]=utilizador;
					load_page();
				} else {
					console.log("Failed "+objects);
					//alert("Failed "+objects['descricao']);
				}
			}*/
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
