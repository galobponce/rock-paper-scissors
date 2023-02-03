"use strict"

// Get DOM elements
const rock_div = document.getElementById('R');
const paper_div = document.getElementById('P');
const scissors_div = document.getElementById('S');

const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');

const result_p = document.querySelector('.result').firstElementChild;

const actionMessage_p = document.getElementById('action-message');



class Game {

    constructor() {
        this.userScore = 0;
        this.computerScore = 0;

        this.userChoice = null;
        this.computerChoice = null;
        this.result = null;
    }


    letterToWord(letter) {
        if (letter === 'R') return 'Rock';
        if (letter === 'P') return 'Paper';
        if (letter === 'S') return 'Scissors';
    }


    // Methods to update the score and result of the game
    win() {
        this.result = 'W';
        this.userScore++;
    }
    lose() {
        this.result = 'L';
        this.computerScore++;
    }
    tie() {
        this.result = 'T';
    }


    calculateComputerChoice() {
        const choices = ['R', 'P', 'S'];

        // Random number between 0 and 2
        const randomNumber = Math.floor(Math.random() * 3);
        this.computerChoice = choices[randomNumber];
    }


    calculateResult() {
        switch (this.userChoice + this.computerChoice) {

            // Lose cases
            case 'RP':
            case 'PS':
            case 'SR':
                this.lose();
                break;


            // Win cases
            case 'RS':
            case 'PR':
            case 'SP':
                this.win();
                break;


            // Tie cases
            default:
                this.tie()
                break;
        }
    }

    // Used to render the result and the current score
    renderResult() {
        userScore_span.innerHTML = this.userScore;
        computerScore_span.innerHTML = this.computerScore;
        actionMessage_p.innerHTML = `Computer chose ${this.letterToWord(this.computerChoice)}.`;

        let text = '';

        switch (this.result) {
            case 'W':
                text = `${this.letterToWord(this.userChoice)} beats ${this.letterToWord(this.computerChoice)}, you win!`;
                break;

            case 'L':
                text = `${this.letterToWord(this.computerChoice)} beats ${this.letterToWord(this.userChoice)}, you lose!`;
                break;

            case 'T':
                text = `${this.letterToWord(this.userChoice)} equals ${this.letterToWord(this.computerChoice)}, it's a tie!`;
                break;

            default:
                break;
        }

        result_p.innerHTML = text;
    }


    // Game Logic
    play(userChoice) {
        this.userChoice = userChoice;
        this.calculateComputerChoice();
        this.calculateResult();
        this.renderResult();
    }
}


const main = () => {
    const game = new Game();

    // Passes the user choice to the game
    rock_div.addEventListener('click', () => {
        game.play('R');
    });
    paper_div.addEventListener('click', () => {
        game.play('P');
    });
    scissors_div.addEventListener('click', () => {
        game.play('S');
    });
}


main();