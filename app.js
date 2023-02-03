"use strict"

// Get DOM elements
const $body = document.querySelector('body');

const $rock = document.getElementById('R');
const $paper = document.getElementById('P');
const $scissors = document.getElementById('S');

const $userScore = document.getElementById('user-score');
const $computerScore = document.getElementById('computer-score');

const $result = document.querySelector('.result > p');

const $actionMessage = document.getElementById('action-message');



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

    // Used to render the result, current score and makes a simple animation
    renderResult() {
        $userScore.innerHTML = this.userScore;
        $computerScore.innerHTML = this.computerScore;
        $actionMessage.innerHTML = `Computer chose ${this.letterToWord(this.computerChoice)}.`;

        let text = '';

        switch (this.result) {
            case 'W':
                $body.classList.add('bg-win');
                setTimeout(() => {
                    $body.classList.remove('bg-win');
                }, 500);

                text = `${this.letterToWord(this.userChoice)} beats ${this.letterToWord(this.computerChoice)}, you win!`;
                break;

            case 'L':
                $body.classList.add('bg-lose', 'shake');
                setTimeout(() => {
                    $body.classList.remove('bg-lose', 'shake');
                }, 500);

                text = `${this.letterToWord(this.computerChoice)} beats ${this.letterToWord(this.userChoice)}, you lose!`;
                break;

            case 'T':
                $body.classList.add('bg-tie');
                setTimeout(() => {
                    $body.classList.remove('bg-tie');
                }, 500);

                text = `${this.letterToWord(this.userChoice)} equals ${this.letterToWord(this.computerChoice)}, it's a tie!`;
                break;

            default:
                break;
        }

        $result.innerHTML = text;
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
    $rock.addEventListener('click', () => {
        game.play('R');
    });
    $paper.addEventListener('click', () => {
        game.play('P');
    });
    $scissors.addEventListener('click', () => {
        game.play('S');
    });
}


main();