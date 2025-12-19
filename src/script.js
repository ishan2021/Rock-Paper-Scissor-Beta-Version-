let rhand = document.querySelector(".rimg");
let lhand = document.querySelector(".limg");
let resultText = document.querySelector("#result");
let para = document.querySelector(".para");
let p2choiceText = document.querySelector("#p2choice");
const limages = ["Assets/rock.png", "Assets/paper.png", "Assets/scissors.png"];
const rimages = [
  "Assets/Rrock.png",
  "Assets/Rpaper.png",
  "Assets/Rscissors.png",
];
let p1Sboard = document.querySelector(".user-score");
let p2Sboard = document.querySelector(".computer-score");
let p1Score = 0;
let p2Score = 0;
let pressbutton = document.querySelectorAll(".btn"); // FIXED: Declare pressbutton

let currentround = 0;
let round_no = 0;

let index = 0;
let cycleInterval;
//start menu
let start = document.querySelector("#start");
let cancel = document.querySelector("#cancel");

let menu = document.querySelector(".menu");
let wrap = document.querySelector(".hello");
start.addEventListener("click", () => {
  menu.classList.add("hidden");
  wrap.classList.remove("!hidden");
});
cancel.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "/";
  }, 200);
});

// round-selection
const roundButtons = document.querySelectorAll(".round-btn");
roundButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const isSelected = btn.classList.contains("border-green-400");

    roundButtons.forEach((b) => {
      b.classList.remove("border-green-400");
      b.classList.add("border-[#6280A8]");
      b.classList.add("hover:border-blue-400");
    });

    if (!isSelected) {
      btn.classList.add("border-green-400");
      btn.classList.remove("border-[#6280A8]");
      btn.classList.remove("hover:border-blue-400");
      round_no = parseInt(btn.innerHTML);
      console.log(round_no);
      currentround = 0;
    }
  });
});

let roundshow = document.querySelector(".round_show");
pressbutton.forEach((element) => {
  element.addEventListener("click", async (event) => {
    if (event.currentTarget.disabled) return; // Prevent clicks when disabled

    playSound(); // Play sound only if button is enabled

    let btnIndex = Array.from(pressbutton).indexOf(event.currentTarget);
    await playRound(btnIndex);
  });
});

async function playRound(player1) {
  console.log("Button clicked!");
  console.log("before: ", currentround);
  console.log(round_no);

  // await check();
  // if (currentround > round_no) {
  //   // pressbutton.forEach((btn) => (btn.disabled = true));

  //   wrap.classList.add("!hidden");
  //   console.log("Game Over");
  //   return;
  // }
  roundshow.innerHTML = `<span class="text-4xl text-white font-poppins font-bold"> Round ${
    currentround + 1
  } </span>`;

  currentround++;

  let choice = ["Rock", "Paper", "Scissors"];
  para.innerHTML = "Opponent is choosing...";
  p2choiceText.innerHTML = ""; // FIXED: Use innerHTML instead of .text

  // Disable all buttons to prevent multiple clicks
  pressbutton.forEach((btn) => (btn.disabled = true));

  var cstop = cycleImages();

  setTimeout(() => {
    rhand.src = rimages[player1]; // Show player choice
    clearInterval(cstop);

    let player2 = pThink();
    let determine = roundGameCheck(player1, player2);

    para.innerHTML = `Opponent is choosing a ${choice[player2]}`;

    let finalRes = winCheck(player1, player2);

    if (finalRes === null) {
      resultText.innerHTML = `Draw`;
    } else if (finalRes === true) {
      p1Score++;
      resultText.innerHTML = `You Win`;
    } else {
      p2Score++;
      resultText.innerHTML = `You Lose`;
    }

    // Update score display
    p1Sboard.innerHTML = p1Score;
    p2Sboard.innerHTML = p2Score;

    p2choiceText.innerHTML = `${choice[player2]}`;
    gsap.fromTo(
      rhand,
      {
        opacity: 0,
      },
      {
        duration: 0.5,
        opacity: 1,
        ease: "power1.inOut",
        transformOrigin: "right center",
      }
    );
    lhand.src = limages[player2];

    // Enable buttons after round finishes
    setTimeout(() => {
      pressbutton.forEach((btn) => {
        btn.disabled = false;
        btn.style.opacity = "1";
      });
    }, 1000);
  }, 2000);

  if (currentround >= round_no) {
    setTimeout(() => {
      if (parseInt(p1Sboard.innerHTML) > parseInt(p2Sboard.innerHTML)) {
        console.log("You win1");

        resultText.innerHTML = `You Won the Game`;
      } else if (parseInt(p1Sboard.innerHTML) < parseInt(p2Sboard.innerHTML)) {
        console.log("You win2");
        resultText.innerHTML = `You Lost the Game`;
      } else if (parseInt(p1Sboard.innerHTML) == parseInt(p2Sboard.innerHTML)) {
        console.log("You win3");
        resultText.innerHTML = `The Game was a Draw`;
      }
      wrap.classList.add("!hidden");
      console.log("Game Over");
    }, 2000);
    return;
  }
}

function pThink() {
  var randomIndex = Math.floor(Math.random() * 3);
  lhand.src = limages[randomIndex];
  gsap.fromTo(
    lhand,
    { opacity: 0.9 },
    {
      opacity: 1,
      duration: 0.5,
      ease: "power1.inOut",
      transformOrigin: "left center",
    }
  );
  return randomIndex;
}

function winCheck(x, y) {
  return x === y ? null : x === (y + 1) % 3 ? true : false;
}

function roundGameCheck(player_1, player_2) {
  if (player_1 === player_2) return null;
  if (player_1 === 3 && player_2 !== 3) return true;
  else return false;
}

function cycleImages() {
  if (cycleInterval) clearInterval(cycleInterval);
  cycleInterval = setInterval(function () {
    gsap.fromTo(
      lhand,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.3,
        transformOrigin: "left center",
      }
    );
    index = (index + 1) % limages.length;
    lhand.src = limages[index];
  }, 120);
  return cycleInterval;
}

function playSound() {
  let audio = new Audio("Assets/Sounds/start.mp3");
  audio.play();
}
// async function check() {
//   if (currentround == round_no) {
//     // pressbutton.forEach((btn) => (btn.disabled = true));

//     wrap.classList.add("!hidden");
//     console.log("Game Over");
//     return;
//   }
// }
