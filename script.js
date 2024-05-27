const checkBoxList= document.querySelectorAll(".custom-checkbox");
const inputField= document.querySelectorAll(".goal-input");
const progressBar= document.querySelector(".progress-bar");
const progressValue= document.querySelector(".progress-value");
const progressLabel=document.querySelector(".progress-label");

const quotes=[
   "Raise the bar by completing your goals!",
    "Well begun is half done!",
    "keep going you are almost there",
    "Just a Step away, Keep going!",
    "Whoa! You just completed all the goals, time for chill :D"
]

const allgoals=JSON.parse(localStorage.getItem("allGoals")) || {
    first:{
        name:'',
        completed:false
    },
    second:{
        name:'',
        completed:false
    },
    third:{
        name:'',
        completed:false
    },
    fourth:{
        name:'',
        completed:false
    }
};

let completedGoalsCount=Object.values(allgoals).filter((goals)=> goals.completed).length;
progressValue.style.width= `${completedGoalsCount /inputField.length *100}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputField.length} Completed`;

progressLabel.innerText=quotes[completedGoalsCount];

checkBoxList.forEach((checkBox)=>{
    checkBox.addEventListener("click",(e)=>{
        const allGoalsAdded = [...inputField].every((input)=>{
            return input.value;
        })

       

        if(allGoalsAdded){
            
            checkBox.parentElement.classList.toggle("completed");
            const InputID=checkBox.nextElementSibling.id;
            allgoals[InputID].completed=!allgoals[InputID].completed;

            completedGoalsCount=Object.values(allgoals).filter((goals)=> goals.completed).length;
            progressValue.style.width= `${completedGoalsCount/inputField.length *100}%`;
            progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputField.length} Completed`;

            localStorage.setItem("allGoals",JSON.stringify(allgoals));
        }else{
            progressBar.classList.add("show-error");
        }
         progressLabel.innerText=quotes[completedGoalsCount];
    })
})

inputField.forEach((input)=>{
    input.value=allgoals[input.id].name;
    if(allgoals[input.id].completed){
        input.parentElement.classList.add("completed")
    }


    input.addEventListener("focus",(e)=>{
        progressBar.classList.remove("show-error");
    })
    input.addEventListener("input",(e)=>{
        if(completedGoalsCount){
            input.value=allgoals[input.id].name;
            return
        }
        
       /* if(allgoals[input.id].completed){
            input.value=allgoals[input.id].name;
            return
        }*/
        
        allgoals[input.id]={
            name:e.target.value || input.value,
            completed:false
        };
        localStorage.setItem("allGoals",JSON.stringify(allgoals));
    })
})
