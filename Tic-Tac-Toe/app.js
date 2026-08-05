let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let count = 0;

const winPatterns =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0){
            box.innerText = "0";
            turn0 = false;
        }else{
            box.innerText="X";
            turn0 = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if(count === 9 && !iswinner){
            gameDraw();
        }
    });
});

const checkWinner = () => {
    for( let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

const resetGame = () => {
   turn0=true;
   count = 0;
   enableButtons();
   msgContainer.classList.add("hide");
};

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    disableButtons();
}

const disableButtons = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableButtons = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `${winner} won the game!`;
    msgContainer.classList.remove("hide");
    disableButtons();
};

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
