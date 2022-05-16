import platform
import eel
import psutil
import winsound
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
import ssl


eel.init('Templates')


d1={}
Uemail=""


@eel.expose
def Credintial(email,username,password,):
    my_id={"piyusha":"2427",
            "payal":'161718',
            "gaurav":'9595',
            "Don":"7020"}
    global Uemail
    Uemail=email
    for key in my_id:
        if username==key  and password==my_id[key]:
            return 1
    return 0

@eel.expose    
def getConfig():
    def size_utility(size,initials="B"):
        factor=1024
        for memory_unit in ["","k","M","G","T","P"]:
         if size<factor:
            return(f"{size:.2f}{memory_unit}{initials}")
         size/=factor
    system=platform.uname()
    data={}
    data.update({"-------------------- Operating System -------------------":""})

    data.update({"OS_name":system.system})
    data.update({"User_Name":system.node})
    data.update({"Os_Release":system.release})
    data.update({"Os_Version":system.version})
    data.update({"Processor":system.machine})
    data.update({"Processor Category":system.processor})
    data.update({"-------------------- RAM -------------------":""})
    memory_info = psutil.virtual_memory()
    data.update({"Total_Ram":size_utility(memory_info.total)})
    data.update({"Available_Ram":size_utility(memory_info.available)})
    data.update({"Used_Ram":size_utility(memory_info.used)})
    data.update({"Percentage_Used":str(memory_info.percent)+"%"})
    global d1
    d1.update(data)
    return data

@eel.expose
def cpu_info():
    
    data={}
    system=platform.uname()
    data.update({"-------------------- Processor -------------------":""})

    data.update({"Processor":system.machine})
    data.update({"Physical_Cores":psutil.cpu_count(logical=False)})
    data.update({"Total_cores":psutil.cpu_count(logical=True)})

    
    for i , percentage in enumerate(psutil.cpu_percent(percpu=True)):
        data.update({"Core_"+str(i+1):str(percentage)+"%"})

    data.update({"CPU_Usage":str(psutil.cpu_percent())+"%"})
    d1.update(data)
    return data


@eel.expose
def harddisk():
    data={}
    def size_utility(size,initials="B"):
        factor=1024
        for memory_unit in ["","k","M","G","T","P"]:
         if size<factor:
            return(f"{size:.2f}{memory_unit}{initials}")
         size/=factor
    partition_info=psutil.disk_partitions()
    i=1
    data.update({"-------------------- Harddisk -------------------":""})

    data.update({"Total_Drive":len(partition_info)})
    for partition in partition_info:
        try:
         drive_size=psutil.disk_usage(partition.mountpoint)
         data.update({f"Drive_{i}":partition.mountpoint})
         data.update({f"Size_{i}":size_utility(drive_size.total)})
         data.update({f"Used_{i}":size_utility(drive_size.used)})
         data.update({f"Free_{i}":size_utility(drive_size.free)})
         data.update({f"File_Type_{i}":str(partition.fstype)})
         data.update({f"Percentage_{i}":str(drive_size.percent)+"%"})
        except:
            pass
        i=i+1
    d1.update(data)
    return data

import urllib.request

def connected():
        try:
            urllib.request.urlopen('http://google.com') 
            return True
        except:
            return False

@eel.expose
def send_mail():
    if(not connected()):
        return "Connection Error : No internet Available !"
    try:

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls(context=ssl.create_default_context())
        server.login("gaurav.arun.pekhale@gmail.com","11June2001")

        msg = MIMEMultipart()
        my_Messege="The Below Attachment contains Brief Overview of System"

        message = f'{my_Messege}\n\nFor Further Communication Connect with me \n-Gaurav Arun Pekhale\npekhaleg1122@gmail.com'
        msg['Subject'] ="Platform Analyzer -Report"
        msg['From'] = 'gaurav.arun.pekhale@gmail.com'
        msg['To'] = Uemail
        fp=open("report.txt",'w')
        for key in d1:
            fp.write(f"{key}\t-\t{d1[key]}\n\n")
        fp.close()
        msg.attach(MIMEText(message, "plain"))
        with open("report.txt", "rb") as f:
            attach = MIMEApplication(f.read(),_subtype="txt")
        attach.add_header('Content-Disposition','attachment',filename=str("report.txt"))
        msg.attach(attach)
        server.send_message(msg)
        winsound.Beep(900,700)
        return 1
        
    except Exception as E:
        return str(E)


eel.start("index.html",cmdline_args=['--start-fullscreen'])

