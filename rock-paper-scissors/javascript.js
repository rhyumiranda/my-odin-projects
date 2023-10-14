/*
1. Connect game() function to start button.
2. If the button is connected, try to rewrite the code to connect userChoice into the buttons
3. After you connected userChoice button, try to check on console if it is working
4. If it is working, try to use dom to print out scores, and winners.
5. Test if all of them is working, add some css styling.
6. Done.
*/

let startButton = document.getElementById("startGame");

startButton.addEventListener("click", function(){
    game();
});

function game(){

    let playerScore = 0;
    let computerScore = 0;
    let tieScore = 0;

    for (let i = 0; i < 5; i++){
        const playerSelection = getUserChoice();
        const computerSelection = getComputerChoice();
        playRound(playerSelection, computerSelection);
        if (getWinner(playerSelection, computerSelection) == "Player"){
            playerScore++;
        } else if(getWinner(playerSelection, computerSelection) == "Computer"){
            computerScore++;
        } else if(getWinner(playerSelection, computerSelection) == "Tie"){
            tieScore++;
        }
    }

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

