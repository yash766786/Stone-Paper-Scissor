let user = ''
let ai = ''
let comment = ''
let state = 0    // 0(draw), 1(user wins), -1(ai wins)
let btn1 = document.getElementById("stone")
let btn2 = document.getElementById("paper")
let btn3 = document.getElementById("scissor")
let userScore = document.querySelector(".userScore")
let aiScore = document.querySelector(".aiScore")
let roundNumber = document.querySelector(".roundNumber")

function generateRandomCard() {
    const randomNumber = Math.random() * 10
    if (randomNumber < 3.4)    return "stone"
    else if (randomNumber >= 3.4 && randomNumber < 6.7)    return "paper"
    else    return "scissor"
}

function matchSummary(state){
    // show comment
    if(state===1)    comment = "You win"
    else if(state===-1)   comment = "Computer win"
    else if(state===0)    comment = "Match draw"
    
    let commentBox = document.createElement("div")
    commentBox.innerHTML = `<div class="commentBox">
                                <h2>${comment}</h2>
                            </div>`
    document.querySelector(".left").append(commentBox)
    setTimeout(()=>{
        commentBox.style.display= "none"
    },1500)

    // update round number
    let score = Number(roundNumber.innerText)
    score += 1
    roundNumber.innerHTML= null
    roundNumber.append(score)

    // update scoreboard 
    if(state===1){
        let score = Number(userScore.innerText)
        score += 1
        userScore.innerHTML= null
        userScore.append(score)   
    }
    else if(state===-1){
        let score = Number(aiScore.innerText)
        score += 1
        aiScore.innerHTML= null
        aiScore.append(score)        
    }   
}

const checkWinner = () => {
    ai = generateRandomCard()

    if (user === 'paper') {
        if (ai === 'stone')    state = 1 
        else if (ai === 'scissor')   state = -1
        else   state = 0   
    }
    else if (user === 'stone') {
        if (ai === 'scissor')    state = 1 
        else if (ai === 'paper')   state = -1
        else   state = 0
    }
    else if (user === 'scissor') {
        if (ai === 'paper')    state = 1
        else if (ai === 'stone')    state = -1
        else   state = 0
    }

    // to show Ai card(store paper scissor)
    let aiCard = document.createElement("div")
    aiCard.className = "box"
    aiCard.innerHTML = `<img src="assets/${ai}.svg" alt="${ai}">`
    document.querySelector("h1").after(aiCard)
    matchSummary(state)
    setTimeout(()=>{
        aiCard.style.display= "none"
    },1500)
    return state
}

// onclick
// 1. button diabled
// 2. show -> ai card and comment
// 3. update -> scoreboard and round no. 
// 4. after 1.5sec, button albe and display none -> ai card, comment
document.querySelector(".right").addEventListener("click", (e) => {
    user = e.target.id
    btn1.setAttribute("disabled","true")
    btn2.setAttribute("disabled","true")
    btn3.setAttribute("disabled","true")
    if (user === "stone" || user === "paper" || user === "scissor") {
        const state =  checkWinner()
        const abc = document.getElementById(user)
        abc.style.removeProperty("background-color")
        if(state===1){
            e.target.style.backgroundColor = "green"
            abc.style.backgroundColor = "green"
        }
        else if(state===0){
            e.target.style.backgroundColor = "orange"
            abc.style.backgroundColor = "orange"
        }
        else{
            e.target.style.backgroundColor = "red"
            abc.style.backgroundColor = "red"
        }

        setTimeout(()=>{
            e.target.style.removeProperty("background-color")
            abc.style.removeProperty("background-color")
            btn1.removeAttribute("disabled")
            btn2.removeAttribute("disabled")
            btn3.removeAttribute("disabled")
        },1500)
    }
})

// 5. reset button to restart match
document.querySelector(".reset").addEventListener("click", (e) =>{
    let score = 0;
    userScore.innerHTML= null
    userScore.append(score)
    aiScore.innerHTML= null
    aiScore.append(score)
    roundNumber.innerHTML= null
    roundNumber.append(score)
})