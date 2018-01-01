
require("./renderer.js");
const fs = require("fs")

var filepath = "Work.csv";

var startTime;
var currentTask = {name: null, duration: null, date: null};

function activeTaskListenerMenu(){
    var html = `
        <div class="form-horizontal">
            <div class="form-group">
                <label class="control-label" for="createTaskInput">Task Name</label>
                <input class="form-control" id="createTaskInput" type="text" placeholder="Play Soccer">
                <br/>
                <button onclick="createTask()" class="btn btn-lg btn-success">Start Task</button>
            </div>
        </div>
    `
    document.getElementById("menu").innerHTML = html
}

function activeTaskMenu() {
    var html = `
        <div class="col-md-6 col-sm-6">
            
            <h4>You are...</h4><h1><strong>`+currentTask.name+`</strong></h1>
            <button onclick="endTask()" class="btn btn-lg btn-danger">End Task</button>
        </div>
    `
    document.getElementById("menu").innerHTML = html
}

function createTask(){
    var DateClass = new Date();
    var field = document.getElementById("createTaskInput")
    currentTask.name = field.value
    currentTask.date = DateClass.getDate() + "/" + (parseFloat(DateClass.getMonth()) + 1).toString()   + "/" + DateClass.getFullYear()
    startTime = [DateClass.getHours(), DateClass.getMinutes()]
    activeTaskMenu()
}

function endTask(){
    var DateClass = new Date();
    t_duration = ((DateClass.getHours() - startTime[0]) * 60) + (DateClass.getMinutes() - startTime[1])
    currentTask.duration = t_duration
    console.log(currentTask)
    saveFile()
    activeTaskListenerMenu()
}


function saveFile(){
    // get old data
    fs.readFile(filepath, "utf-8", (err, data) => {
        if (err){
            console.log(err.message)
        }
        data += currentTask.name+ ","+ currentTask.duration +","+ currentTask.date +"\n"
        fs.writeFile(filepath, data, (err)=> {console.log(err)})
    })
    console.log("Log Updated")
}