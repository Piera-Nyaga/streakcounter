import Todo from "./inerfce/interface";

let Home = document.getElementById('home')! as HTMLDivElement;
let best=document.getElementById('showup')! as HTMLDivElement;
let btnAdd = document.getElementById('adds')! as HTMLButtonElement;
let Info= document.getElementById('pr')! as HTMLHeadingElement;
let pr= document.getElementById('pp')! as HTMLHeadingElement;
let Form = document.getElementById('form')! as HTMLDivElement;
let btnReset = document.getElementById('resets')! as HTMLButtonElement;
let Err = document.getElementById('err')! as HTMLDivElement;
let Title1 = document.getElementById('title')! as HTMLInputElement;
let Image1 = document.getElementById('image')! as HTMLInputElement;
let Date1 = document.getElementById('date')! as HTMLInputElement;
let btnAdds = document.getElementById('addts')! as HTMLButtonElement;
let Display = document.getElementById('display')! as HTMLDivElement;
let displayOne = document.getElementById('dispOne')! as HTMLDivElement;




let Tasks: Todo[] = []

let bestStreak: Todo;


class Streak {
    startDate: Date;
    constructor(startDate: Date) {
        this.startDate = startDate;
    }
}

class StreakDays extends Streak {
    private streaks: number = 0;
    streakDays(date: Date) {
        let difference = this.startDate.getTime() - new Date().getTime() + 1;
        return (this.streaks = Math.ceil(difference / (1000 * 3600 * 24)));
    }
}

class HighestStreaks {
    static highestStreaks() {
      let bestTask: Todo = Tasks[0];
  
      Tasks.forEach((task) => {
        if (task.Days > bestTask.Days) {
          bestTask = task;
        }
      });
      return bestTask;
    }
  }
// class HighestStreaks {
//     static highestStreaks(streakArr: number[]) {
//         const maxStreak: number = Math.max(...streakArr);
//         return maxStreak;
//     }
// }

Form.style.display = 'none'
displayOne.style.display = "none"
// Info.style.display='none'
pr.style.display='block'

btnAdd.addEventListener('click', e => {
    e.preventDefault()
    showform()

    function showform() {
        Home.style.display = 'none'
        Form.style.display = 'block'
        Form.style.display = 'flex'

    }
})


btnReset.addEventListener('click', e => {
    e.preventDefault()
    closeform()

    function closeform() {
        Form.style.display = 'none'
        Home.style.display = 'block'
        Home.style.display = 'flex'
    }

})


btnAdds.addEventListener('click', e => {
    e.preventDefault()
    addtask()

    function addtask() {
        const Title = Title1.value
        const Image = Image1.value
        const date = Date1.value
        let streak = new StreakDays(new Date(date));
    // let streakdays = streak.streakDays(new Date());
    let Days = streak.streakDays(new Date());

        if (Title == '' || Image == '' || date == '') {
            const p = document.createElement('p')
            p.textContent = 'Please fill in all Fields'
            p.style.color = 'red'
            p.id = 'error-message'
            Err.insertAdjacentElement('afterbegin', p)

            setTimeout(() => {
                p.style.display = 'none'
            }, 5000)

        } else {
            
            let singleTask: Todo = { Title, Image, date, Days, id: Math.random() * 10000 }
            Tasks.push(singleTask)
            showtasks()
            Title1.value=''
            Image1.value=''
            Date1.value=''
            showBest()

        }
    }
})


function showtasks() {
    if (Tasks.length == 0) {
        Display.innerHTML = ''
        const p = document.createElement('p')
        p.textContent = 'You dont have any activities!!'
        p.style.color = 'red'
        Display.insertAdjacentElement('afterbegin', p)
    } else {
        Display.innerHTML = ''
        // Info.style.display='block'
        const pr = document.createElement('p')
        pr.textContent = 'Activities!!'
        pr.style.color = 'black'
        Display.insertAdjacentElement('afterbegin', pr)
        Tasks.forEach((a) => {
            let html = `
            <div style=" align-content:center; padding-left:20px; padding-top:10px; width: 12rem; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);" onclick="popOne (${a.id})">
                <img src=" ${a.Image} " alt=" no photo!!" style="width: 100px; height: 70px;">
                <p>${a.date}</p>
                <h1>${a.Title}</h1>
        
                </div>
            `

            Display.innerHTML += html

        })
    }
}


function popOne(id: number) {
    displayOne.style.display = "block"
    displayOne.innerHTML = ''
    const onetask: Todo[] = Tasks.filter(a => a.id === id)
    // console.log(streakdays);
    onetask.forEach((a) => {
        let streak = new StreakDays(new Date(a.date));
        let streakdays = streak.streakDays(new Date());
        let html = `
            <img src=" ${a.Image} " alt=" no photo!!" style="width: 100px; height: 160px;">
            <h1>${a.Title}</h1>
            <p>${a.date}</p>
            <p>${Math.abs(streakdays)} Days</p> 
            <div class="btn">
                <button onclick="closeTask(${a.id})" >Close</button>
                <button onclick="deleteTask(${a.id})" >Delete</button>
            </div>
        `
        displayOne.innerHTML += html
        Form.style.display = 'none'
        Home.style.display = 'block'
        Home.style.display = 'flex'

    })

}

function closeTask() {
    displayOne.style.display = "none"

}

function deleteTask(id: number) {
    const index = Tasks.findIndex(a => a.id === id)
    console.log(index);
    Tasks.splice(index, 1)
    displayOne.style.display = "none"
    showBest()
    showtasks()
}

function showBest(){
    showtasks()
    bestStreak = HighestStreaks.highestStreaks();
    console.log(bestStreak)
    
      if(Tasks.length > 0){
          best.style.display = "block"
          best.innerHTML = ""
          const taskbest: Todo = bestStreak
          let html = `
        <div class="task" style ="display:flex;flex-direction:column;gap:5px; margin-left:50px;" onclick="popTask(${taskbest.id})" >                      
              <h3>Congratulations bbg!!! this is your best streak ever</h3>
        <img src="${bestStreak.Image}" style="width:98%;height:100px">
                <p>${bestStreak.date}</p>  
                <p>${bestStreak.Title}</p>   
                <p>${Math.abs(bestStreak.Days)} Streaks</p>  
                            
        </div>`;
        
        best.innerHTML += html;
      }
      else{
        best.style.display = "none"
      }
     
      //  best.innerHTML = ""
    
        
    }


