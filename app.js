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
// Adding Exercise 12 -24
add.addEventListener("click",()=>{
   let exe = input__exercise.value;
   let time = input__time.value;
   exeArray.push([exe , time]);
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

const runExercise=(i,count)=>{
  if(i>=count){
    console.log("WorkOut Done")  // Display Work Out Result here
    return;
  }
  view1.style.display = "none";
  view2.style.display = "block";

 let breakTime =10
 const exeElement= document.createElement("h3");
 exeElement.innerText=`start ${exeArray[i][0]} in ${breakTime}`
 view2.innerHTML = ""; 
 view2.appendChild(exeElement)

 let breakTimer= setInterval(()=>{
   breakTime--

if(breakTime==0){

  clearInterval(breakTimer)
  exeElement.innerText=`start ${exeArray[i][0]}`

  const timeElement = document.querySelector("div")
  timeElement.setAttribute("id","countDown")
  timeElement.innerText="0:0"
  view2.appendChild(timeElement)
  beginExercise();
  createDoneBtn(i);
}

  exeElement.innerText = `start ${exeArray[i][0]} in ${breakTime}`
  view2.appendChild(exeElement)
 },1000)
}


const beginExercise=()=>{
const startClock =()=>{
  let time = 0
  let count =document.getElementById("countDown")
  const startTimer =()=>{
      let hrs = Math.floor(time/3600) 
      let mins =Math.floor((time%3600)/60);
      let sec = time%60
      count.innerHTML=`${hrs}:${mins}:${sec}`
      time++
  }
 setInterval(startTimer,1000)
}
startClock()
}

const createDoneBtn =(i)=>{
const doneBtn =document.createElement("button")
doneBtn.setAttribute("id","doneBtn")
doneBtn.innerText="Done"
view2.appendChild(doneBtn)
doneBtn.addEventListener("click",()=>{
  //Sore timing to new array
  runExercise(i + 1, exeArray.length); 
})
}


