<<<<<<< HEAD
let startButton = document.getElementById("startGame");

startButton.addEventListener("click", function(){
    game();
});

=======
>>>>>>> rps-ui
function game(){
    let playerScore = 0;
    let computerScore = 0;

    function playRound() {
        const rockBtn = document.querySelector('#rock');
        const paperBtn = document.querySelector('#paper');
        const scisssorBtn = document.querySelector('#scissors');
        const playerOptions = [rockBtn,paperBtn,scisssorBtn];
        const computerOptions = ['rock', 'paper', 'scissors'];

        playerOptions.forEach(option => {
            option.addEventListener('click', function(){

                const choiceNumber = Math.floor(Math.random()*3);
                const computerChoice = computerOptions[choiceNumber];

                winner(this.innerText, computerChoice);

            });
        });

    }

    function winner(player, computer) {
        const result = document.querySelector('.result');
        const playerScoreBoard = document.querySelector('#playerText');
        const computerScoreBoard = document.querySelector('#computerText');
        player = player.toLowerCase();
        computer = computer.toLowerCase();

        if(player === computer){
            result.textContent = 'Tie';
        } else if (
        player === 'rock' && computer === 'scissor' ||
        player === 'paper' && computer === 'rock' ||
        player === 'scissors' && computer === 'paper'
        ){
            result.textContent = 'Player Won';
            playerScore++;
            playerScoreBoard.textContent = playerScore;
        } else {
            result.textContent = 'Computer Won';
            computerScore++;
            computerScoreBoard.textContent = computerScore;
        }
    }

<<<<<<< HEAD
    console.log("Game over!");
    if(playerScore > computerScore){
        console.log(`You are the winner! With a score of ${playerScore} points`);
    } else if (playerScore < computerScore){
        console.log(`You lost, computer won! With a score of ${computerScore} points`);
    } else if (playerScore == computerScore){
        console.log("It is a tie, nobody won!");
    }
}

function playRound(playerSelection, computerSelection){
    const winner = getWinner(playerSelection, computerSelection);

    if (winner == "Tie"){
        console.log("It is a tie!");
    } else if (winner == "Player"){
        console.log(`You win ${playerSelection} beats ${computerSelection}`);
    } else if (winner == "Computer"){
        console.log(`You lost, ${computerSelection} beats ${playerSelection}`);
    }
}

function getUserChoice(){
    const userInput = false;
    
    while(userInput == false){
        const userChoice = prompt("Rock Paper Scissors");
        if(userChoice == null){
            continue;
        }
        const userChoiceLower = userChoice.toLowerCase();
        if (options.includes(userChoiceLower)){
            userInput == true;
            return userChoiceLower;
        }
    }       
}

const options = ["rock", "paper", "scissors"];

function getComputerChoice(){
    const choices = options[Math.floor(Math.random() * options.length)];
    return choices;
}

function getWinner(playerSelection, computerSelection){
    if(playerSelection === computerSelection){
        return "Tie";
    } else if(
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ){
        return "Player";
    } else {
        return "Computer";
    }
} 
=======
    playRound();

}

game();
>>>>>>> rps-ui
