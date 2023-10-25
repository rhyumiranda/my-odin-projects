function game(){
    const playerScoreBoard = document.querySelector('#playerText');
    const computerScoreBoard = document.querySelector('#computerText');
    const result = document.querySelector('.result');
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
        player = player.toLowerCase();
        computer = computer.toLowerCase();

        if(player === computer){
            result.textContent = 'It is a Tie!';
        } else if (
        player === 'rock' && computer === 'scissors' ||
        player === 'paper' && computer === 'rock' ||
        player === 'scissors' && computer === 'paper'
        ){
            result.textContent = `Player's ${player} beats Computer's ${computer}`;
            playerScore++;
            playerScoreBoard.textContent = playerScore;
        } else {
            result.textContent = `Computer's ${computer} beats Player's ${player}`;
            computerScore++;
            computerScoreBoard.textContent = computerScore;
        }

        if(playerScore === 5){
            result.textContent = `You are the Winner of the game!`;
            restart();
        } else if(computerScore === 5){
            result.textContent = `Computer won the game!`;
            restart();
        }
    }

    


    function restart(){
        playerScore = 0;
        computerScore = 0;
        playerScoreBoard.textContent = playerScore;
        computerScoreBoard.textContent = computerScore;
    }


    playRound();

}

game();
