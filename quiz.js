let question_field = document.querySelector(".question")
let answer_buttons = document.querySelectorAll(".answer")


function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}


let signs = ["+", "-", "*", "/"]
function getRandomSign(){
    return signs[randint(0, 3)]
}


class Question{
    constructor(){
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        //
        if(sign == "+"){
        this.correct = a + b
        }
        else if(sign == "-"){
        this.correct = a - b
        }
        else if(sign == "*"){
        this.correct = a * b
        }
        else if(sign == "/"){
        this.correct =  a / b
        }
        //
        this.answers = [
            randint (this.correct - 15, this.correct - 1),
            randint (this.correct - 15, this.correct - 1),
            this.correct = Math.round(this.correct),
            randint (this.correct + 1, this.correct + 15),
            randint (this.correct + 1, this.correct + 15)
        ]
        shuffle(this.answers)
    }


    display(){
        question_field.innerHTML = this.question
        for(let i = 0; i<5; i+=1){
            answer_buttons[i].innerHTML = this.answers[i]
        }
    }
}


let container_start = document.querySelector(".start")
let container_main = document.querySelector(".main")
let start_btn = document.querySelector(".start_btn")
let container_h1 = document.querySelector(".container_h1")


let total_answers_given
let correct_answers_given


start_btn.addEventListener("click", function(){
    container_start.style.display = "none"
    container_main.style.display = "flex"
    current_question = new Question()
    current_question.display()
    correct_answers_given = 0
    total_answers_given = 0
    //
    setTimeout(function(){
        container_start.style.display = "flex"
        container_main.style.display = "none"
        container_h1.innerHTML = `Ви дали ${correct_answers_given} правильних відповідей із ${total_answers_given}.
        Точність - ${Math.round(correct_answers_given * 100/total_answers_given)}%`
    }, 10000)
})


for(let i = 0; i<5; i+=1){
    answer_buttons[i].addEventListener('click', function() {
        if (answer_buttons[i].innerHTML == current_question.correct) {
            correct_answers_given += 1
            answer_buttons[i].style.background = '#00FF00'
            anime({
                targets: answer_buttons[i],
                background: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        }
        else {
            answer_buttons[i].style.background = '#FF0000'
            anime({
                targets: answer_buttons[i],
                background: '#FFFFFF',
                duratin: 500,
                delay: 100,
                delay: 100,
                easing: 'linear'
            })
        }
        total_answers_given += 1
        current_question = new Question()
        current_question.display()
    })
}


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) { // Цикл повторюється до тих пір, поки залишаються елементи для перемішування
    randomIndex = Math.floor(Math.random() * currentIndex); // Вибираємо елемент, що залишився.
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]; // Міняємо місцями з поточним елементом.
    }
    return array; // Повертаємо перемішаний масив
}

function switchcolor() {
    let body = document.querySelector('body');
    if (body.style.backgroundColor === 'black') {
        body.style.backgroundColor = 'white';
        hi.style.color = 'black';
        btn.style.border = '2px solid black';
        answer_buttons.style.color = 'black';
    } else {
        body.style.backgroundColor = 'black';
        hi.style.color = 'white';
        btn.style.border = '2px solid white';
        answer_buttons.style.color = 'white';
    }
}

let hi = document.querySelector('.container_h1');
let btn = document.querySelector('.switch_btn');
btn.addEventListener('click', switchcolor);
