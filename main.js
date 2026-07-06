let computernum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");

playbutton.addeventlistener("click",play);

function pickrandomnum(){
    computernum = Math.floor(Math.random()*100+1);
    console.log("정답",computerNum);
}

function play(){
  let uservalue = userInput.value;
  if(uservalue < computernum){
    console.log("UP")
  }esel if(uservalue > computernum){
    console.log("DOWN!!")
  }else{console.log("맞추셨습니다")}

}
pickrandomnum();