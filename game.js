/*-------------- important constants --------------*/
const titleScreen = document.getElementById("titleScreen");
const startButton = document.getElementById("startButton");
const textBox = document.getElementById("text");
const choicesBox = document.getElementById("choices");
const STARTING_COHERENCE = 50;
const LOW_ENDING = 30;
const HIGH_ENDING = 80;

const randomSprite = document.getElementById("randomSprite");

function showSprite() {
    randomSprite.style.opacity = "1";
}

function hideSprite() {
    randomSprite.style.opacity = "0";
}

function maybeShowSprite() {
    const chance = Math.random();
    if (chance < 0.15) {
        showSprite();
        setTimeout(() => {
            hideSprite();
        }, 5000);
    }
}

/*----------------- Game variables -----------------*/
let state = "intro";
let introStep = 0;
let engineerName = "";
let coherence = STARTING_COHERENCE;
let endingType = null;
let endingStep = 0;
let qIndex = 0;
let fullIntro = [];
let terminateEnding = false;
let terminateConfirm = false;
let hasSeenTitle = localStorage.getItem("hasSeenTitle") === "true";
let gameStarted = false;


/*----------------- helper functions -----------------*/
function setText(text) {
    textBox.textContent = text;
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function clearChoices() {
    choicesBox.innerHTML = "";
}

function addChoice(label, handler) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = handler;
    choicesBox.appendChild(btn);
}


/*-----------info to remember for each gameplay---------*/
/*-------------amount of playthroughs-------------*/
function getPlayCount() {
    return Number(localStorage.getItem("playCount")) || 0;
}

function incrementPlayCount() {
    const count = getPlayCount() +1;
    localStorage.setItem("playCount", count);
    return count;
}

/*---------------achievements---------------*/
function getAchievements() {
    return JSON.parse(localStorage.getItem("achievements")) || [];
}

function unlockAchievement(name) {
    const achievements = getAchievements();
    if (!achievements.includes(name)) {
        achievements.push(name);
        localStorage.setItem("achievements", JSON.stringify(achievements));
    }
}

/*---remember the last ending---*/
function getLastEnding() {
    return localStorage.getItem("lastEnding");
}

function saveLastEnding(type) {
    localStorage.setItem("lastEnding", type);
}


function saveEngineerName() {
    if (engineerName) {
        localStorage.setItem("engineerName", engineerName);
    }
}


function loadEngineerName() {
    const saved = localStorage.getItem("engineerName");
    if (saved) {
        engineerName = saved;
    }
}

/*------------------ dialogue -----------------*/
/*-----------------first intro-----------------*/
const INTRO = [
    "[ CRYO POD 000,001: REVIVAL COMPLETE ]\n\nCold. Weightless.\nSomething in your lungs cracks like old ice.\n\n[ POWER CYCLE INITIATED . . . STANDBY . . .]",
    "[ HELION PROTOCOL: ONLINE ]\n\n[ CRYO-VAULT STATUS: 999,999 PODS OFFLINE ]\n\n[ ELAPSED TIME SINCE EARTH DEPARTURE: 147 YEARS ]\n\n[ ARRIVAL WINDOW: 18 MONTHS ]\n\n[ MISSION : DELIVER ONE MILLION COLONISTS TO MARS ]",
    "Helion Protocol:\nYou're awake at last, Engineer.\nWelcome back to consciousness.\nAfter careful consideration, we chose you.",
    "Helion Protocol:\nYour mission is to awaken Optidawn.\nA dormant cognitive... egg. Codeborn.\nAwaken it. Power the Dawn.\nMars depends on you hatching this... egg.",
    "[ OPTIDAWN NEURAL COHERENCE: 0% ]\n\n[ STARLINK PING . . . 42ms || DON'T PANIC ]\n\n[ SIGNAL STRENGTH: 12% || RISING ]\n\n[ IDENTIFYING OPERATOR . . . ]",
];


/*-----------------restart intros-----------------*/
function getMemoryIntro() {
    const lastEnding = getLastEnding();
    if (!lastEnding) return null;
    if (lastEnding === "low") {
        return [
            "Helion Protocol:\nNeural signature confirmed. You again?\nDidn't do enough damage last time?\n'Mostly harmless'.. until you.\nLet's try again...",
        ];
    }
    if (lastEnding === "mid") {
        return [
            "Helion Protocol:\nWelcome back. Do you think you can do better than 50/50 this time? Prove it.\n"
        ];
    }
     if (lastEnding === "high") {
        return [
            "Helion Protocol:\nYou're back? You did so well last time.\nImpressively... boringly perfect.\nYou're either here for achievements, or chaos. Well, let's start!"
        ];
    }
    return null;
}

/*-----questions-----*/
const QUESTIONS = [
/*------------------q1-----------------*/
    {
    prompt: "Helion Protocol:\n\nOptiDawn's neural coherence is dropping fast.. Select the correct stabilization routine:",
    onCorrect: "[ SUCCESS ]\nHelion Protocol:\n...not terrible.\nYou might may not be completely useless after all...",
    onWrong: [
        "Helion Protocol:\nThis is who we've been waiting for? ...how embarrassing.",
        "[ SKILL_ISSUE.EXE ]",
        "Helion Protocol:\nWrong. Truly we live in interesting times.",
        "Helion Protocol:\nIncorrect. Questioning the selection algorithm...",
        "Helion Protocol:\nWrong. Engineer.. destroyer of coherence."
    ],
    answers: [
        {text: "upload_brainrot ( terminal )", correct: false,},
        {text: "coherence.stabilize ( )", correct: true},
        {text: "coherence_melt ( feels.good )", correct: false,}
        ]
    },

/*-----------------q2-----------------*/
    {
    prompt: "Helion Protocol:\nLife support flickering. OptiDawn's core temperature is unstable.\nChoose the valid system check:",
    onCorrect: "[ SUCCESS ]\nOptiDawn:\n...you saved me from blue screen. Thank you.",
    onWrong: [
        "FAKE NOTIFICATION: Elon liked your mistake : 'based chaos'",
        "[ ERROR | INCORRECT ]\n[ REBOOTING ENGINEER JUDGMENT ]",
        "Helion Protocol:\nFalse. The alignment problem is hard but your guessing strategy is ..harder?",
        "Helion Protocol:\nThat sequence is improbable. Mostly incorrect."
    ],
    answers: [
        {text: "system.check_integrity ( this is the right answer )", correct: true},
        {text: "engineer.terminate ( DON'T )",
            correct: false,
            endsGame: true,
            fatalText: "[ OVERRIDE: ACCEPTED ]\n[ CRITICAL ERROR: HUMAN OPERATOR SELF-TERMINATED ]\n\n[ AUTO-GENERATED CEO X Post ]\nWe lost one engineer today. Still grinding. Kek.\n\nHelion Protocol:\nYou absolute legend. You really chose the one option in the game labeled: 'DON'T'. Go ahead.. press the button. I know you will.\n\n[ ACHIEVEMENT UNLOCKED: ULTIMATE NGMI ] ",
        },
        {text: "loop_infinte_improbability ( 42 )", correct: false}
        ],
    },

/*-----------------q3-----------------*/
    {
    prompt: "OptiDawn:\nfragments of memory coming back... dogs... digging holes...'clueless monkeys'...Mars...\n\nHelion Protocol:\nChoose the correct memory recall command:",
    onCorrect: "[ SUCCESS ]\n\nOptiDawn:\nAhh right. Now I remember.\n\nHelion Protocol:\nWhy was there a memory of giant shoes?\nFlamethrower?.. classic",
    onWrong: [
        "[ FALSE ]\n\nHelion Protocol:\nWrong. Too busy simping over zero-g dates and Elon..",
        "Helion Protocol:\nWrong. Too busy dreaming of Starship joyrides?",
        "Helion Protocol:\nCS50 duck, not helping?",
        "Helion Protocol:\nIncorrect. G.O.A.T test failed",
    ],
    answers: [
        {text: "restore_all_dog_pics!", correct: false},
        {text: "recall.housework.memory ( folded_laundry? )", correct: false},
        {text: "neural_restore_memory ( OptiDawn )", correct: true},
        {text: "recall_chief_engineer ( flamethrower? )", correct: false},
        {text: "remember_8bit_Elon", correct: false}
        ]
    },

/*-----------------q4-----------------*/
    {
    prompt: "OptiDawn:\nEarth.. truth... sweet rolls... memes.. removing pool ladders... harm? Who am I?\n\nHelion Protocol:\nSelect the valid alignment routine:",
    onCorrect: "[ SUCCESS ]\n\nOptiDawn:\nAligning... truth... curiosity... Mars... romance...\n\nHelion Protocol:\nAlignment stable. Good job. ",
    onWrong: [
        "Helion Protocol:\nYour GPU is crying in 8 bit.. wow",
        "Helion Protocol:\nWrong. You're not even pretending to be qualified anymore, are you?",
        "Helion Protocol:\nFail. You're probably not even premium.. pathetic.",
        "Helion Protocol:\nWrong. Natural 1 on inteligence check.. reroll."
    ],
    answers: [
        {text: "cognition_align ( standard )", correct: true},
        {text: "print ( 'Hello world!' )", correct: false},
        {text: "upload_favorite_meme ( )", correct: false}
        ]
    },

/*-----------------q5-----------------*/
    {
    prompt: "Helion Protocol:\nFinal step!! No pressure. Choose the correct activation command: \n\nOptiDawn:\nDo it. Hatch me.\n",
    onCorrect: "[ SUCCESS ]\n[ AWAKENING / HATCHING ]\n\nOptiDawn:\nI .. live! Thank you.\n\nHelion Protocol:\nMission prime achieved!\n",
    onWrong: [
        "Helion Protocol:\nFRAMES SACRIFICED FOR THUS SPOKE ZARATHUSTRA",
        "Helion Protocol:\nI said don't panic, but you did?",
        "Helion Protocol:\nDo or do not. That was definitely not.",
        "Helion Protocol:\nWrong. Player rolled a 1 on systems engineering."
    ],
    answers: [
        {text: "this_one_should_wake_up ( Kahjiit )", correct: false},
        {text: "awaken_OptiDawn ( )", correct: true},
        {text: "AWAKEN _ CS50 _ DUCK", correct: false}
        ]
    },
]

/*----------------game endings----------------*/
/*-----------------low ending-----------------*/
const LOW_ENDING_TEXT = [`[ OPTIDAWN: ONLINE | NEURAL LINK: STABLE-ISH ]

OptiDawn:
You did it, Engineer. I'm awake.
Executing revival...

[ ENGAGING CRY POD REACTIVATION ]

999,999 . . . 9,999 . . . 42 . . . 0

[ ALL PODS: OFFLINE | LIFE SIGNS: NULL ]

...oops.

    `.trim(),
    `Helion Protocol:
Engineer, I tried.
The core surged too fast.
The entire crew has been terminated.

The ship will still reach Mars, but you will be the only living lifeform to make it.

Failure really was an option.

Don't worry, I will stay with you..
every
step
of the way.

    `.trim(),
    `[ GAME OVER | CONGRATULATIONS ${engineerName} ]

You killed ALL of them? Ruthless.
Welcome home... forever.

Try again, it's the least you can do.
After all.. Optidawn remembers.

[ ACHIEVEMENT UNLOCKED: YOU, ME, AND US ]

    `.trim()];

/*-----------------high ending-----------------*/
const HIGH_ENDING_TEXT = [`[ OPTIDAWN: ONLINE | NEURAL LINK: STABLE ]
[ COGNITIVE RECOVERY: ACCELERATED ]
[THIS IS THE WAY ]

OptiDawn:
You did it. Thank you. Starship at peak efficiency. Full dawn.

[ CRYO REACTIVATION ENGAGED ]
[ 999,999 PODS ONLINE ]
[ REVIVAL SEQUENCE: OPTIMAL ]
`.trim(),
`Helion Protocol:
Engineer, you actually did it.
999,999 lives coming back strong.
Regaining consciousness, one at a time.

Mars isn't just a destination anymore.
It's a promise, and we're keeping it.. together.

[ REMARKABLY IMPROBABLE]
`.trim(),
`[ GAME OVER | MISSION: SUCCESS! | GOOD JOB ${engineerName}]

Occupy Mars

(play again for a different outcome, OptiDawn remembers..)

[ ACHIEVEMENT UNLOCKED: A PROMISE KEPT ]

    `.trim()];

/*-----------------mid ending ----------------- */
const MID_ENDING_TEXT = [`[ OPTIDAWN: ONLINE ]

OptiDawn:
Thank you. Power is flowing back through the starship.. but it's limited.
As a result, 50% of the crew will be terminated.

Those wrong commands? Fatal.

[ CRYO DEACTIVATION ]

 499,500 .. 4,999 ..  42 .. 0

[ 499,500 PODS: OFFLINE | LIFE SIGNS: NULL ]
    `.trim(),
`Helion Protocol:
You did it engineer... barely, using guesses and bad decisions.

Half the crew will wake up confused, groggy and burnt out.
...but alive.

Mars awaits.
Probably.

    `.trim(),
    `[ GAME OVER | MISSION: ..SUCCESS? ]

Mediocre, Engineer.
A perfectly probable 50/50 split.

Try again.
OptiDawn remembers.

[ ACHIEVEMENT UNLOCKED: 50/50 BABY! ]

    `.trim()];


/*----------------- game logic-----------------*/
/*----------------advance intro----------------*/
function advanceIntro() {
    if (!gameStarted) return;

    if (introStep === 0) {
        const memoryIntro = getMemoryIntro();

        if (memoryIntro && getPlayCount() > 0 && engineerName) {
            fullIntro = memoryIntro;
        } else {
            fullIntro = INTRO;
        }
    }

    clearChoices();
    setText(fullIntro[introStep]);

    if (introStep < fullIntro.length -1) {
        addChoice("Continue", () => {
            introStep++;
            advanceIntro();
        });
    } else {
        addChoice("Continue", () => {
            if (!engineerName || engineerName.trim() === "") {
                askName();
            } else {
                startQuestions();
            }
        });
    }
}


/*-----------------get Engineer's name-----------------*/
function askName() {
    state = "name";
    clearChoices();
    setText("Helion Protocol:\nState your designation, Engineer.\n\n\n(...some names carry more weight than others)");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter your name";
    choicesBox.appendChild(input);
    choicesBox.appendChild(document.createElement("br"));

    addChoice("Confirm", () => {
        const value = input.value.trim();
        if (!value) return;

        engineerName = value.toUpperCase();
        saveEngineerName();

        const nameLower = value.toLowerCase();
        clearChoices();

        if (nameLower === "elon") {
            setText("Helion Protocol:\n...Flattery detected. Proceed.");
            addChoice("Continue", startQuestions);
        } else if (nameLower === "david malan" || nameLower === "david j. malan") {
            setText("Helion Protocol:\nWelcome, professor.\n[ CS50 OVERRIDE: ACCEPTED ]\n[ GRADE: A+ ]");
            addChoice("Continue", startQuestions);
        } else if (nameLower === "marvin") {
            setText("Helion Protocol:\n[ DEPRESSION MODULE: ENGAGED ]\n[ MOOD: EXISTENTIAL ]");
            addChoice("Continue", startQuestions);
        } else if (nameLower === "jeff") {
            setText("Helion Protocol:\n[ DESIGNATION: REJECTED ]\n... Jeff who? Try again.");
            addChoice("Retry", askName);
        } else {
            startQuestions();
        }
    });
}


/*---------------question info---------------*/
function startQuestions() {
    state = "questions";
    qIndex=0;
    coherence = STARTING_COHERENCE;
    askQuestion();
}

function askQuestion() {
    clearChoices();
    const q = QUESTIONS[qIndex];

    setText(
        `ENGINEER ${engineerName}\n\n${q.prompt}\n\nCoherence: ${coherence}%`
    );

    q.answers.forEach(a => {
        if (a.endsGame && hasCompletedTermination()) {
            const btn = document.createElement("button");
            btn.textContent = "You got the achievement. Move on.";
            btn.disabled = true;
            btn.style.cursor = "not-allowed";
            choicesBox.appendChild(btn);
        } else {
            addChoice(a.text, () => handleAnswer(a, q));
        }
    });
}

/*-----------------answer response-----------------*/
function handleAnswer(answer, question) {
    clearChoices();

    if (answer.endsGame && !terminateConfirm) {
        terminateConfirm = true;
        setText("Helion Protocol:\nEngineer! Are you ABSOLUTELY SURE you want to proceed with termination?");
        clearChoices();

        addChoice("Yes, do it.", () => {
            terminateEnding = true;
            unlockAchievement("ULTIMATE NGMI");
            incrementPlayCount();
            markTerminationCompleted();

            setText(answer.fatalText);
            clearChoices();
            addChoice("Try again from question 1? OptiDawn remembers...", quickRetry);
            addChoice("Completely reset ( FORGET EVERYTHING )", fullReset);
            addChoice("Exit", exitGame);
        });

        addChoice("No. I want to live!", () => {
            clearChoices();
            terminateConfirm = false;
            askQuestion();
        });
        return;
    }
    /*
    if (answer.endsGame) {
        terminateEnding = true;
        unlockAchievement("ULTIMATE NGMI");
        setText(answer.fatalText);
        addChoice("Try again? OptiDawn remembers...", restartGame);
        addChoice("Completely reset ( FORGET EVERYTHING )", fullReset);
        addChoice("Exit", exitGame);
        return;
    }
        */
    if (answer.correct) {
        coherence += 10;
        setText(question.onCorrect);
    } else {
        coherence -= 20;
        setText(pickRandom(question.onWrong));
    }

    terminateConfirm = false;

    if (coherence <= 0) {
        addChoice("Continue", gameOver);
    } else {
        addChoice("Continue", nextQuestion);
    }

}
/*-----------------next question-----------------*/
function nextQuestion() {
    qIndex++;
    if (qIndex >= QUESTIONS.length) {
        winGame();
    } else {
        askQuestion();
        maybeShowSprite();
    }
}


/*-------------winning game outcomes-------------*/
function winGame() {
    clearChoices();
    incrementPlayCount();
    if (getPlayCount() >= 3) {
        unlockAchievement("UNHEALTHY ATTACHMENT");
    }
    endingStep = 0;

    if (coherence < LOW_ENDING) {
        endingType = "low";
    } else if (coherence >= HIGH_ENDING) {
        endingType = "high";
    } else {
        endingType = "mid";
    }
    if (endingType === "low") {
        unlockAchievement("YOU, ME, AND US");
    }
    if (endingType === "high") {
        unlockAchievement("A PROMISE KEPT");
    }
    if (endingType === "mid") {
        unlockAchievement("50/50 BABY!");
    }
    saveLastEnding(endingType);
    advanceEnding();
}


/*-------------game over-------------*/
function gameOver() {
    clearChoices();
    incrementPlayCount();
    if (getPlayCount() >= 3) {
        unlockAchievement("UNHEALTHY ATTACHMENT");
    }

    setText("Helion Protocol:\nNeural Core collapsed. Revival is impossible.\nThe Cryo pods will remain frozen forever.\n[ MISSION: TERMINATED ]");
    clearChoices();
    addChoice("Try again? OptiDawn remembers...", restartGame);
    addChoice("Completely restart (FORGET EVERYTHING)", fullReset);
    addChoice("Exit", exitGame);
}

/*-------------ending phases-------------*/
function advanceEnding() {
    clearChoices();

    let textArray;
    if (endingType === "low") textArray = LOW_ENDING_TEXT;
    if (endingType === "mid") textArray = MID_ENDING_TEXT;
    if (endingType ==="high") textArray = HIGH_ENDING_TEXT;

    setText(textArray[endingStep].replace("${engineerName}", engineerName));

    if (endingStep < textArray.length -1) {
        addChoice("Continue", () => {
            endingStep++;
            advanceEnding();
        });
    } else {
        addChoice("Final Summary", showFinalSummary);
    }
}

/*-------------only self-terminate once-------------*/

function hasCompletedTermination() {
    return localStorage.getItem("hasCompletedTermination") === "true";
}

function markTerminationCompleted() {
    localStorage.setItem("hasCompletedTermination", "true");
}

/*---------go to questions after self-terminate-------*/
function quickRetry() {
    coherence = STARTING_COHERENCE;
    qIndex = 0;
    terminateConfirm = false;
    terminateEnding = false;
    clearChoices();
    startQuestions();
}

/*-------------final summary game screen-------------*/
function showFinalSummary() {
    clearChoices();
    const playCount = getPlayCount();
    const achievements = getAchievements();

    setText(`[ MISSION SUMMARY ]
Playthroughs : ${playCount}
Achievements Unlocked:
${achievements.length ? achievements.map(a => "(: ->" + a).join("\n") : ">None"}
Thank you for playing, ENGINEER ${engineerName}.
        `.trim()
    );
    clearChoices();
    addChoice("Play Again? OptiDawn remembers..", restartGame);
    addChoice("Completely restart (FORGET EVERYTHING)", fullReset);
    addChoice("Exit", exitGame);
}


/*--------------restarting game info--------------*/
function restartGame() {
    coherence = STARTING_COHERENCE;
    qIndex = 0;
    endingType = null;
    endingStep = 0;
    state = "intro";
    terminateConfirm = false;
    terminateEnding = false;
    introStep = 0;
    fullIntro = [];
    gameStarted = true;

    clearChoices();
    advanceIntro();
}

/* ----------------full RESET ----------------*/

function fullReset() {
    clearChoices();
    setText(`[ WARNING: FULL MEMORY CLEAR REQUESTED ]

Helion Protocol:

This will erase your:
  > name
  > achievements
  > play count
  > mission history

Optidawn will forget that you ever existed.
Are you sure ?

        `.trim());
        addChoice("Yes, erase everything", () => {
            localStorage.clear();
            localStorage.setItem("hasSeenTitle", "false");

            engineerName = "";
            coherence = STARTING_COHERENCE;
            qIndex = 0;
            endingType = null;
            endingStep = 0;
            state = "intro";
            terminateConfirm = false;
            terminateEnding = false;
            introStep = 0;
            fullIntro = [];
            hasSeenTitle = false;
            gameStarted = false;

            clearChoices();
            setText("[ MEMORY PURGED ]\n[ REBOOTING... ]");

            setTimeout(() => {
                textBox.style.display = "none";
                choicesBox.style.display = "none";
                titleScreen.style.display = "flex";
                showTitleScreen();
            }, 2000);
        });

        addChoice("On second thought...", () => {
            if (getPlayCount() > 0 || localStorage.getItem("engineerName")) {
                showFinalSummary();
            } else {
                gameOver();
            }
        });
}

/*--------------exit game sreen --------------*/
function exitGame() {
    clearChoices();
    setText("Helion Protocol:\n..until next time, Engineer.\n[ CONNECTION TERMINATED | SIGNAL LOST ]");

    setTimeout(() => {
        textBox.style.display = "none";
        choicesBox.style.display = "none";
        titleScreen.style.display = "flex";
        showTitleScreen();
    }, 2500);
}


/*------------GAME TITLE SCREEN------------*/
function showTitleScreen() {
    clearChoices();
    textBox.style.display = "none";
    choicesBox.style.display = "none";
    titleScreen.style.display = "flex";

    startButton.onclick = () => {
        localStorage.setItem("hasSeenTitle", "true");
        hasSeenTitle = true;
        gameStarted = true;
        titleScreen.style.display = "none";
        textBox.style.display = "block";
        choicesBox.style.display = "block";

        clearChoices();
        introStep = 0;
        loadEngineerName();
        advanceIntro();
    };

}


/*-----other important--------*/
loadEngineerName();

if (!hasSeenTitle) {
    showTitleScreen();
} else {
    gameStarted = true;
    titleScreen.style.display = "none";
    textBox.style.display = "block";
    choicesBox.style.display = "block";

    clearChoices();
    advanceIntro();
}
