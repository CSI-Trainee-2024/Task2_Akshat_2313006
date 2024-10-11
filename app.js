const view1 = document.getElementById("view1")
const view2 = document.getElementById("view2")
const input__exercise = document.getElementById("input__exercise")
const input__time =document.getElementById("input__time")
const section1 =document.getElementById("display__exe")
const add = document.getElementById("add");
const end__work =document.getElementById("end__work")
const begin__workout=document.getElementById("begin__work")
const exeArray =[]
const timeStorage=[]
// Adding Exercise 
add.addEventListener("click",()=>{
   let exe = input__exercise.value;
   let time = input__time.value;
   exeArray.push({exe , time});
   console.log(exeArray);
   addToPage(exe,time);
})

const addToPage =(exe,time)=>{
    let element =document.createElement("div")
   element.innerHTML= `<h4>${exe}</h4> <h5>${time}</h5>`
   section1.appendChild(element);
} 

begin__workout.addEventListener("click",()=>{
    if(exeArray.length==0){
        console.log("First Add Something");
        return;
    } 
    startWork(exeArray.length);
})

const startWork=(count)=>{
  let i=0;
  runExercise(i,count)
}
 //MOST IMPORTANT FUNCTION OF WHOLE PROGRAMME
const runExercise=(i,count)=>{
  if(i>=count){
    console.log("WorkOut Done")  // Display Work Out Result here
    displayResult(count,exeArray,timeStorage)
    return;
  }
  view1.style.display = "none";
  view2.style.display ="flex";

 let breakTime =2
 const exeElement= document.createElement("h3");
 exeElement.innerText=`start ${exeArray[i].exe} in ${breakTime}`
 view2.innerHTML = ""; 
 view2.classList.remove("newView")
 view2.classList.add("updateView")
 view2.appendChild(exeElement)

 // For Giving Break After Each Exercise AND at begining
 let breakTimer= setInterval(()=>{
   breakTime--
if(breakTime== 0){
  clearInterval(breakTimer)  // clearing Break if Timer Reaches zeRO
  exeElement.innerText=`START Doing ${exeArray[i].exe}`//Derefering an Object value
  const timeElement = document.createElement("div")
  timeElement.setAttribute("id","countDown")
  timeElement.innerText="0:0"
  view2.appendChild(timeElement)
  const startTime = new Date().getTime();  //Capturing Time of Starting an Exercise
  beginExercise();    
  createDoneBtn(i,startTime); //Once Exercise Begins Create A button to move to next Exercise
  return;   // Important Here otherwise Next Code Block will Execute
}
  exeElement.innerText = `START ${exeArray[i].exe} in ${breakTime}`
  view2.appendChild(exeElement)
 },1000)
}

//Begin Exercise Function
const beginExercise=()=>{
const startClock =()=>{
  let time = 0
  let count =document.getElementById("countDown")
  const startTimer =()=>{
      time++
      let hrs = Math.floor(time/3600) 
      let mins =Math.floor((time%3600)/60);
      let sec = time%60
      count.innerHTML=`${hrs}:${mins}:${sec}`
  }
 setInterval(startTimer,1000)
}
startClock() //Calling to start Stop Watch
}

//Creating a Done Button
const createDoneBtn =(i,startTime)=>{
const doneBtn =document.createElement("button")
doneBtn.setAttribute("id","doneBtn")
doneBtn.innerText="Done"
view2.appendChild(doneBtn)

//Adding What Action to perform After Clicking Done button
doneBtn.addEventListener("click",()=>{
  //Sore timing to new array as an object inside
  const endTime = new Date().getTime();
  const totalTime = Math.floor((endTime-startTime)/1000)
  timeStorage.push({
    exercise: exeArray[i].exe,
    timeTaken: totalTime
  })
  runExercise(i + 1, exeArray.length); //Loop Back to run next exercise
})
}

//Displaying The Result by Making a Table
const displayResult= (count,exeArray,timeStorage)=>{
  view2.innerHTML=""
  const table =document.createElement("table");
  table.setAttribute("class",("wholeTable"))
  table.innerHTML=` <thead>
        <tr>
            <th>Exercise</th>
            <th>Estimate</th>
            <th>Time Taken</th>
        </tr>
    </thead>`
    
     for( let a=0;a<count;a++){
      let newRow =document.createElement("tr")
      newRow.innerHTML=`<td>${exeArray[a].exe}</td>
                        <td>${exeArray[a].time}</td>
                        <td>${timeStorage[a].timeTaken}</td>
                       `
      table.appendChild(newRow);
     }
     const resultHeading =document.createElement("h2");
     resultHeading.setAttribute("Id","tableHeading")
     resultHeading.innerText="Workout Completed!"
     const resultDescription =document.createElement("p");
     resultDescription.setAttribute("Id","tableDescription")
     resultDescription.innerText="Well Done! Here Are Your Workout Stats"
     view2.appendChild(resultHeading);
     resultHeading.appendChild(resultDescription);
     view2.appendChild(table);
}

