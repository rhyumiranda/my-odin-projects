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

    playRound();

}

game();
