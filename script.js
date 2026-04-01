let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector("#newGame");
let resetBtn = document.querySelector("#reset");

let msg = document.querySelector("#msg");
let msgcontainer = document.querySelector(".msg-container");
let timerDisplay = document.querySelector("#timer");
let gameStatus = document.querySelector("#gameStatus");

let player1Input = document.querySelector("#player1");
let player2Input = document.querySelector("#player2");

let turn0 = true;
let count = 0;
let gameOver = false;

let time = 0;
let timerInterval;
let timerStarted = false;

const winpatterns = [
  [0,1,2],[0,3,6],[0,4,8],
  [1,4,7],[2,5,8],[2,4,6],
  [3,4,5],[6,7,8]
];

const startTimer = () => {
  timerInterval = setInterval(() => {
    time++;
    timerDisplay.innerText = time;
  }, 1000);
};

const stopTimer = () => { clearInterval(timerInterval); };
const resetTimer = () => { stopTimer(); time=0; timerDisplay.innerText=0; timerStarted=false; };

const enableboxes = () => {
  boxes.forEach(box => { box.disabled=false; box.innerText=""; box.style.pointerEvents="auto"; });
  count=0;
};
const disableboxes = () => { boxes.forEach(box => { box.disabled=true; box.style.pointerEvents="none"; }); };

const showwinner = (symbol) => {
  let name = symbol === "O" ? (player1Input.value || "Player 1") : (player2Input.value || "Player 2");
  msg.innerText = `🏆 Winner: ${name} (${symbol})`;
  msgcontainer.classList.remove("hide");
  gameOver = true;
  disableboxes();
  stopTimer();
};

const checkwinner = () => {
  for(let pattern of winpatterns){
    let a=boxes[pattern[0]].innerText;
    let b=boxes[pattern[1]].innerText;
    let c=boxes[pattern[2]].innerText;
    if(a!=="" && a===b && b===c){ showwinner(a); return true; }
  }
  return false;
};

boxes.forEach((box)=>{
  box.addEventListener("click",()=>{
    if(gameOver) return;

    if(!timerStarted){ startTimer(); timerStarted=true; gameStatus.innerText="🕹 Game Started!"; gameStatus.style.color="#22c55e"; }

    if(turn0){ box.innerText="O"; turn0=false; } else { box.innerText="X"; turn0=true; }

    box.style.transform="scale(0.9)";
    setTimeout(()=>{ box.style.transform="scale(1)"; },100);

    box.disabled=true; count++;

    let isWinner = checkwinner();
    if(!isWinner && count===9){
      msg.innerText="⚖️ Game Draw!";
      msgcontainer.classList.remove("hide");
      gameOver=true;
      disableboxes();
      stopTimer();
    }
  });
});

const resetGame = () => {
  turn0=true; gameOver=false;
  gameStatus.innerText="Press a box to start the game";
  gameStatus.style.color="#facc15";
  enableboxes();
  msgcontainer.classList.add("hide");
  resetTimer();
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);