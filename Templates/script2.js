async function redirect_OS(){
let config= await eel.getConfig()()
 document.getElementById("OS_img").src="os.jpg";
 document.getElementById("OS_name").innerHTML="System Name : "+config["OS_name"];
 document.getElementById("OS_Version").innerHTML="System Version :"+config["Os_Version"]
 document.getElementById("OS_Realese").innerHTML="System Realese :"+config["Os_Release"];
 document.getElementById("User_Name").innerHTML="System User : "+config["User_Name"];
 document.getElementById("Processor").innerHTML="Processor :"+config["Processor"];
}

async function redirect_RAM(){
    let config= await eel.getConfig()()
     document.getElementById("total").innerHTML="Total Ram : "+config["Total_Ram"];
     document.getElementById("empty").innerHTML="Available RAM :"+config["Available_Ram"]
     document.getElementById("used").innerHTML="Used RAM :"+config["Used_Ram"];
     document.getElementById("percentage").innerHTML="Percentage : "+config["Percentage_Used"];
    }
    
async function redirect_processor(){
    let config= await eel.cpu_info()()
    document.getElementById("Pname").innerHTML="Processor Name : "+config["Processor"];
    document.getElementById("phycore").innerHTML="Physical Cores : "+config["Physical_Cores"];
    document.getElementById("total").innerHTML="Total Cores :"+config["Total_cores"]
    document.getElementById("cppuusage").innerHTML="CPU Usage :"+config["CPU_Usage"];


    var table=document.getElementById("table1");
    var i=0;
    table.innerHTML="";
    var row=table.insertRow(0);
    row.insertCell(0).innerHTML="<h3>&nbsp&nbsp &nbsp &nbsp Cores &nbsp&nbsp &nbsp &nbsp</h3>"
    row.insertCell(1).innerHTML="<h3>&nbsp &nbspPercentage Usage&nbsp &nbsp <h3>"
    for(i=1;i<=config["Total_cores"];i++){
            row=table.insertRow(i);
            var cell1=row.insertCell(0);
            var cell2=row.insertCell(1);
            cell1.innerHTML="Core "+i;
            cell2.innerHTML=config["Core_"+i];
    }
    row=table.insertRow(i);
    row.insertCell(0).innerHTML="<h4>&nbspTotal CPU Usage&nbsp<h4>"
    row.insertCell(1).innerHTML="<h4>"+config["CPU_Usage"]+"<h4>"
                
    }

async function redirect_hard(){
        let config= await eel.harddisk()()
        document.getElementById("number").innerHTML=config["Total_Drive"]
        var table=document.getElementById("table1");
        var i=0;
        table.innerHTML=""
        var row=table.insertRow(0);
        row.insertCell(0).innerHTML="<h3>&nbsp&nbsp &nbsp &nbsp Drive Name  &nbsp&nbsp &nbsp &nbsp</h3>"
        row.insertCell(1).innerHTML="<h3>&nbsp &nbspTotal&nbsp &nbsp <h3>"
        row.insertCell(2).innerHTML="<h3>&nbsp &nbspUsed&nbsp &nbsp <h3>"
        row.insertCell(3).innerHTML="<h3>&nbsp &nbspAvailable&nbsp &nbsp <h3>"
        row.insertCell(4).innerHTML="<h3>&nbsp &nbspStorage Type&nbsp &nbsp <h3>"
        row.insertCell(5).innerHTML="<h3>&nbsp &nbspPercentage&nbsp &nbsp <h3>"
        for(i=1;i<=config["Total_Drive"];i++){
                row=table.insertRow(i);
                var cell1=row.insertCell(0);
                var cell2=row.insertCell(1);
                var cell3=row.insertCell(2);
                var cell4=row.insertCell(3);
                var cell5=row.insertCell(4);
                var cell6=row.insertCell(5);
                cell1.innerHTML=config["Drive_"+i];
                cell2.innerHTML=config["Size_"+i];
                cell3.innerHTML=config["Used_"+i];
                cell4.innerHTML=config["Free_"+i];
                cell5.innerHTML=config["File_Type_"+i];
                cell6.innerHTML=config["Percentage_"+i];
            }
        
        }

    async function send_mail(){
        let bool=await eel.send_mail()()
        if (bool==1){
            document.getElementById("send-but").innerHTML="Successfully Sent !";    
            const buton = document.getElementById("send-but");  
            buton.disabled=true;
        }
        else
        {
            document.getElementById("send-but").innerHTML="Error While Sending!";
            document.getElementById("err").innerHTML=bool;
        }
    }