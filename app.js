let chosenNumbers = [];
let maxNumbers = 10;
let button = document.querySelector('button');
let randomNum = getRandomNumber();
let tries = 1;
let level = 1;

function getRandomNumber(){
    let randomNum = parseInt(Math.random() * maxNumbers + 1);
    let amountOfNumbers = chosenNumbers.length;

    if(amountOfNumbers == maxNumbers){
        chosenNumbers = [];
    }  

    if (chosenNumbers.includes(randomNum)){
        return getRandomNumber();
    } else {
        chosenNumbers.push(randomNum);
        console.log(chosenNumbers);
        return randomNum;
    }
}

function changeElement(tag, text){
    let element = document.querySelector(tag);
    element.innerHTML = text;
    responsiveVoice.speak(text, 'UK English Male', {rate: 1.1});
}

function selectElement(tag){
    let element = document.querySelector(tag);
    return element;
}

function clean(){
    let inputGuess = document.querySelector('input');
    inputGuess.value = '';
}

function resetGame(){
    level++;
    clean();
    randomNum = getRandomNumber();
    tries = 1;
    showInitialMessage();
    document.getElementById('reset').setAttribute('disabled', 'true');
}

function showInitialMessage(){
    changeElement('h1', `Secret Number Game - Level ${level}`);
    changeElement('p', 'Choose a number between 1 and 10');
}

showInitialMessage();

function verifyGuess(){
    let userGuess = parseInt(document.querySelector('#user_guess').value);
    if (userGuess == randomNum){
        let wordTries = tries > 1 ? 'tries' : 'try';
        changeElement('h1', 'Congratulations!');
        changeElement('p', `You discovered the secret number in ${tries} ${wordTries}!`);
        document.getElementById('reset').removeAttribute('disabled');
    } else {
        let classNum = userGuess > randomNum ? 'less' : 'greater';
        changeElement('p', `The secret number is ${classNum} than ${userGuess}!`);
        tries++;
        clean();
    }
}