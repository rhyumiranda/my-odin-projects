function game(){
    let playerScore = 0;
    let computerScore = 0;

    function playRound() {
        const rockBtn = document.querySelector('.rock');
        const paperBtn = document.querySelecctor('.paper');
        const scisssorBtn = document.querySelector('.scissor');
        const playerOptions = [rockBtn,paperBtn,scisssorBtn];
        const computerOptions = ['rock', 'paper', 'scissors']

        playerOptions.forEach(option => {
            option.addEventListener('click', function(){

                const choiceNumber = Math.floor(Math.random()*3);
                const computerChoice = computerOptions[choiceNumber];

                /* winner */
            })
        })

    }

}