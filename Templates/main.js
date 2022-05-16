
document.getElementById("Submit1").onclick= async() =>{
  var passwd =document.getElementById("password").value;
  var name = document.getElementById("username").value;
  var email =document.getElementById("email").value;

  // window.location.replace("Info.html");


  let ret =await eel.Credintial(email ,name , passwd )();
    if (ret==1) {
      window.location.href = "Info.html";
    }
    else
    {
      document.getElementById("warn").innerHTML="Incorrect Credintial";
      let button=document.querySelector("Submit1");
      button.disabled=true;
    }
  
}



function OS(){
  window.location.href = "os.html";
} 

function HARD(){
  window.location.href = "hard.html";
} 
function RAM(){
  window.location.href = "ram.html";
} 
function PROCESS(){
  window.location.href = "processor.html";
} 