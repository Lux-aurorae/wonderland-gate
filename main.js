let computernum = 0
let play button = document.getElementById("play-button");
let userinput = document.getElementById(
    user-input");

playbutton.addeventlistener("click",play);

function pickrandomnum(){
    computernum = Math.floor(Math.random())*100+1;
    console.log("정답",computernum);

}

function paly() {
    let uservalue = userinput.ariaValueMax;
    if(uservalue < computernum) {
        consloe.log("Up!!!")
    } else if (uservalue > computerNum) {
        console.log("Down!!");
    } else { console.log("맞추셨습니다!!!")};
}
}
pickrandomnum();