

var ip='';
ip = location.host;
ip=ip.split(':')[0];
localStorage["ip"]=ip;
localStorage["ip"]=ip+"localhost:6379";
console.log("ip "+localStorage["ip"]);
//localStorage["ip"]="localhost";
function sayHello() {
	
	var  utilizador = document.loginForm.username.value;
	var  senha= document.loginForm.password.value;

	console.log("ip in: "+ip);

	const xhttp = new XMLHttpRequest();
		xhttp.open("POST", "http://"+localStorage["ip"]+"/login",true);
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
		
		xhttp.send(JSON.stringify(
			{
				"username" : ""+utilizador,
				"password" : ""+senha
			}
		));	
}

function load_page(){
	
window.location.href = "principal.html";
};

   


/*-----------------------------------------------------------------------------------
/*
/* End of read file
/*-----------------------------------------------------------------------------------*/
