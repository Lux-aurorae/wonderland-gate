// =====================================================
// 🐇 이상한 나라의 숫자 맞추기 - alice.js
// 게임 로직은 이전 버전과 동일! (요구사항 1~9 전부 유지)
// 달라진 건 "화면 연출" 부분이에요:
//   - 토끼가 튀어나오며 UP/DOWN을 외침
//   - 부른 숫자가 트럼프 카드로 쌓임
//   - 정답이면 하트비가 내림
// =====================================================

// ---------- HTML 요소 가져오기 ----------
const playButton = document.getElementById("play-button");
const resetButton = document.getElementById("reset-button");
const userInput = document.getElementById("user-input");
const rabbit = document.getElementById("rabbit");       // 🐇 토끼 본체
const speech = document.getElementById("speech");       // 💬 토끼 말풍선
const clocksArea = document.getElementById("clocks");   // ⏱️ 남은 기회
const historyArea = document.getElementById("history-area");

// ---------- 게임 상태 변수 ----------
let computerNum = 0;
let chances = 5;
let history = [];
let gameOver = false;

// ---------- 1. 랜덤번호 지정 ----------
function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;  // 1~100
  console.log("정답(개발자 확인용):", computerNum);
}

// ---------- 남은 기회를 회중시계로 표시 ----------
function renderChances() {
  // 남은 기회는 ⏱️, 쓴 기회는 💨 (시간이 날아감!)
  clocksArea.textContent = "⏱️".repeat(chances) + "💨".repeat(5 - chances);
}

// =====================================================
// 🐇 토끼 연출 함수
// mode: "up" | "down" | "win" | "talk"
// message: 말풍선에 띄울 문장
// =====================================================
function rabbitSay(mode, message) {
  // ① 이전 애니메이션 클래스를 싹 지우고
  rabbit.classList.remove("jump-up", "dive-down", "party");
  speech.classList.remove("show");

  // ② 브라우저가 "지웠다"를 인식할 틈을 준 뒤 (약간의 시간차)
  //    새 클래스를 붙여야 같은 애니메이션도 다시 재생돼요
  setTimeout(function () {
    speech.textContent = message;
    speech.classList.add("show");              // 말풍선 등장!

    if (mode === "up") rabbit.classList.add("jump-up");     // 폴짝!
    if (mode === "down") rabbit.classList.add("dive-down"); // 다이빙!
    if (mode === "win") rabbit.classList.add("party");      // 춤!
    // mode가 "talk"면 토끼는 안 나오고 말풍선만
  }, 60);
}

// ---------- 부른 숫자를 트럼프 카드로 추가 ----------
function addHistoryCard(num) {
  const suits = ["♥", "♠", "♦", "♣"];               // 무늬 4종을 돌아가며 사용
  const card = document.createElement("div");        // <div> 요소를 새로 만들고
  card.className = "mini-card";                      // 카드 스타일 입히고
  card.innerHTML = num + "<span>" + suits[history.length % 4] + "</span>";
  historyArea.appendChild(card);                     // 화면에 붙이기!
}

// ---------- 🎊 정답 축하: 하트/카드 비 내리기 ----------
function rainConfetti() {
  const items = ["♥️", "🃏", "✨", "🌹", "⏱️", "🎩"];
  for (let i = 0; i < 24; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.textContent = items[i % items.length];
    piece.style.left = Math.random() * 100 + "vw";              // 가로 위치 랜덤
    piece.style.animationDuration = 2 + Math.random() * 2 + "s"; // 떨어지는 속도 랜덤
    document.body.appendChild(piece);
    // 4초 뒤 화면에서 제거 (쌓이면 무거워지니 청소!)
    setTimeout(function () { piece.remove(); }, 4000);
  }
}

// ---------- 2. GO 버튼: 게임의 심장 ----------
function play() {
  const userValue = Number(userInput.value);

  // ---------- 8. 범위 밖 검문소 (기회 안 깎음) ----------
  if (userValue < 1 || userValue > 100 || userInput.value === "") {
    rabbitSay("talk", "1~100 사이라니까! 🫖");
    userInput.value = "";
    return;                                  // 즉시 퇴장 → 기회 보존
  }

  // ---------- 9. 중복 검문소 (기회 안 깎음) ----------
  if (history.includes(userValue)) {
    rabbitSay("talk", "그건 아까 말했잖아~ 🎩");
    userInput.value = "";
    return;
  }

  // 검문 통과! → 기록하고 기회 차감
  history.push(userValue);
  addHistoryCard(userValue);
  chances = chances - 1;
  renderChances();

  // ---------- 3, 4, 5. 판정 (정답부터 검사!) ----------
  if (userValue === computerNum) {
    rabbitSay("win", "🎉 맞췄습니다!");
    rainConfetti();
    finishGame();
  } else if (userValue > computerNum) {
    // 4. 랜덤번호 < 유저번호 → Down!!!
    rabbitSay("down", "⬇️ Down!!!");
  } else {
    // 5. 랜덤번호 > 유저번호 → Up!!
    rabbitSay("up", "⬆️ Up!!");
  }

  // ---------- 7. 기회 소진 → 게임 오버 ----------
  if (chances === 0 && !gameOver) {
    // 토끼의 마지막 한마디 (Down/Up 연출이 끝날 때쯤 띄움)
    setTimeout(function () {
      rabbitSay("talk", `늦었어 늦었어! 정답은 ${computerNum}!`);
    }, 1700);
    finishGame();
  }

  userInput.value = "";
  userInput.focus();
}

// ---------- 게임 종료: 버튼 잠금 ----------
function finishGame() {
  gameOver = true;
  playButton.disabled = true;    // 7. 더 이상 추측 불가
  userInput.disabled = true;
}

// ---------- 6. Reset: 이상한 나라를 처음부터 ----------
function reset() {
  chances = 5;
  history = [];
  gameOver = false;

  historyArea.innerHTML = "";              // 쌓인 트럼프 카드 전부 치우기
  userInput.value = "";
  playButton.disabled = false;
  userInput.disabled = false;
  renderChances();

  rabbit.classList.remove("jump-up", "dive-down", "party");  // 토끼도 굴 속으로
  rabbitSay("talk", "다시 해볼까? 과연 몇 일까?");

  pickRandomNum();                         // 새 랜덤 번호!
  userInput.focus();
}

// ---------- 버튼 연결 ----------
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);

// Enter 키로도 GO
userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !gameOver) {
    play();
  }
});

// ---------- 게임 시작 ----------
pickRandomNum();
renderChances();
rabbitSay("talk", "과연 몇 일까?");
