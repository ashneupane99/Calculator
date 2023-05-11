// first grab all the buttons and add event listener

const btns = document.querySelectorAll(".btn")

//display element
const displayElm = document.querySelector(".display")


let strToDisplay = ""
const operators = ["%", "/", "*", "-", "+"]
let lastOperator = ""

const audio = new Audio("./failure1.mp3")
btns.forEach((btn, i)=>{
//attach click event listener
btn.addEventListener("click", ()=> {
    let val = btn.innerText;
  
    displayElm.style.background = ""
    displayElm.style.color = "black"
    displayElm.classList.remove("prank")
    

    if (operators.includes(val) && !strToDisplay.length )
    return
    // console.log(val)
    if (operators.includes(val)){
         lastOperator = val;
        const lastChar = strToDisplay.slice(-1)
        if(operators.includes(lastChar)){
            strToDisplay = strToDisplay.slice(0, -1)
        }
    }
    if (val === "AC"){
        strToDisplay = ""
        return display() 
    }

    if (val === "C"){
        strToDisplay = strToDisplay.slice(0, -1)
        return display(strToDisplay)
    }

    if (val === "="){

        const lastChar = strToDisplay.slice(-1)
        if (operators.includes(lastChar)){
            strToDisplay = strToDisplay.slice(0, -1)
        }

        return total()
    }

    if (val === "."){
       const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator)
       const lastNumberSet = strToDisplay.slice(lastOperatorIndex)
       if (lastNumberSet.includes(".")){
        return
    }
    if (!lastOperator && strToDisplay.includes(".")){
        return
    }
    }
    strToDisplay += val 
    display(strToDisplay)
})
})

const display = (str) =>{
    displayElm.innerText = str || "0.00"
}

const total = () => {
    const pk =randomNumber()
    if (pk){
        audio.play()
        displayElm.style.background = "red"
        displayElm.style.color = "white"
        displayElm.classList.add("prank")
    }
    const ttl = eval(strToDisplay) + pk
    
    display(ttl)
    strToDisplay = ttl.toString()
}

const randomNumber = () => {
    const num = Math.round(Math.random()*10)
    return num <=10 ? num:0
}