let computernum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let result = document.getElementById("result-area");

playbutton.addeventlistener("click",play);

function pickrandomnum(){
    computernum = Math.floor(Math.random()*100+1);
    console.log("정답",computerNum);
}

function play(){
  let uservalue = userInput.value;
  if(uservalue < computernum){
    resultarea.textcontent = "UP!!";
  }else if(uservalue > computernum){
    resultarea.textcontent = "DOWN!!";
  }else{
    resultarea.textcontent = "맞추셨습니다!";
  }

}
pickrandomnum();