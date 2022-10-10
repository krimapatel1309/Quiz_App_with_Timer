// setting cookie
const setcookie = (name, value, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + 60 * 1000);
    let expires = "expires" + d.toUTCString();
    document.cookie = name + "=" + (value || " ") + ";" + expires + "; path=/";
};

// getting/retriving coookie
const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
// checking whether cookie is present or not
const checkCookie = () => {
    console.log("hey");
    let user = getCookie("username");
    if (user != "") {
        console.log("heyq1");
        alert("Welcome Again " + user);
    } else {
        console.log("heyq11s");
        user = prompt("Please Enter Your Name: ");
        if (user != "" && user != null) {
            setcookie("username", user, 30);
        }
    }
};

window.onload = () => {
    //once window loaded
    checkCookie();
};

//Start Section
let start = document.querySelector("#start");

//guide Section
let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");

//Quiz Section
let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");

//question Section
let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

//Multiple Choices Of Questions
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

//correct and next Button
let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");

//Result Section
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let quit = document.querySelector("#quit");
let startAgain = document.querySelector("#startAgain");

//Get All 'H4' From Quiz Section (MCQS)
let choice_que = document.querySelectorAll(".choice_que");

let index = 0;
let timer = 0;
let interval = 0;

//total points
let correct = 0;

//store Answer Value
let UserAns = undefined;

//what happen when 'Start' Button Will Click
start.addEventListener("click", () => {
    start.style.display = "none";
    guide.style.display = "block";
});

//what happen when 'Exit' Button Will Click
exit.addEventListener("click", () => {
    start.style.display = "block";
    guide.style.display = "none";
});

//Creating Timer For Quiz Timer Section

let countDown = () => {
    if (timer === 20) {
        clearInterval(interval);
        next_question.click();
    } else {
        timer++;
        time.innerText = timer;
    }
};

//setInterval(countDown,1000);

let loadData = () => {
    questionNo.innerText = index + 1 + ". ";
    questionText.innerText = MCQS[index].question;
    option1.innerText = MCQS[index].choice1;
    option2.innerText = MCQS[index].choice2;
    option3.innerText = MCQS[index].choice3;
    option4.innerText = MCQS[index].choice4;

    //    timer start
    timer = 0;
};

loadData();

//what happen when 'Continue' Button Will Click
continueBtn.addEventListener("click", () => {
    quiz.style.display = "block";
    guide.style.display = "none";

    interval = setInterval(countDown, 1000);
    loadData();

    //    remove All Active Classes When Continue Button Will Click

    choice_que.forEach((removeActive) => {
        removeActive.classList.remove("active");
    });

    total_correct.innerHTML = `${(correct = 0)} Out Of ${
        MCQS.length
    } Questions`;
});

choice_que.forEach((choices, choiceNo) => {
    choices.addEventListener("click", () => {
        choices.classList.add("active");
        //check answer
        if (choiceNo === MCQS[index].answer) {
            correct++;
        } else {
            correct += 0;
        }
        //stop Counter
        clearInterval(interval);

        //disable All Options When User Select An Option
        for (i = 0; i <= 3; i++) {
            choice_que[i].classList.add("disabled");
        }
    });
});

////what happen when 'Next' Button Will Click
next_question.addEventListener("click", () => {
    //    if index is less then MCQS.length
    if (index !== MCQS.length - 1) {
        index++;
        choice_que.forEach((removeActive) => {
            removeActive.classList.remove("active");
        });

        //question
        loadData();

        //result
        total_correct.style.display = "block";
        total_correct.innerHTML = `${correct} Out Of ${MCQS.length} Questions`;
        clearInterval(interval);
        interval = setInterval(countDown, 1000);
    } else {
        index = 0;

        //when Quiz Question Complete Display Result Section
        clearInterval(interval);
        quiz.style.display = "none";
        points.innerHTML = `You Got ${correct} Out Of ${MCQS.length}`;
        result.style.display = "block";
    }
    for (i = 0; i <= 3; i++) {
        choice_que[i].classList.remove("disabled");
    }
});

//what happen when 'Quit' Button Will Click
quit.addEventListener("click", () => {
    start.style.display = "block";
    result.style.display = "none";
});

//Start Again When 'Start Again' Button Will Clicked
startAgain.addEventListener("click", () => {
    guide.style.display = "block";
    result.style.display = "none";
});
