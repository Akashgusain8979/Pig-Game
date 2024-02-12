'use strict';

// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;  // it should be outside the function because if we declare it inside the function its value will reset to zero again and again when we click the roll button
let activePlayer = 0;
let playing = true;

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


// Rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){
      // 1. Generating a random dice roll
       const dice = Math.trunc(Math.random() * 6) + 1;
    //    console.log(dice);
    
       // 2. Display dice
       diceEl.classList.remove('hidden');
       diceEl.src = `dice-${dice}.png`;
      
    // 3. check for rolled 1
    if(dice !==1){
        // Add dice to current score
        // currentScore = currentScore + dice;  or we can right it as below
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        // current0El.textContent = currentScore;  //CHANGE LATER
    } else{
        // Switch to next player
        switchPlayer();
}
    }
})

btnHold.addEventListener('click', function(){
    if(playing){
    // console.log('Hold was clicked');
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;    // for understanding scores[1] = scores[1] + currentScore. 
//    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
     
  // 2. Check if player's score is >=100
     if(scores[activePlayer] >= 20){
        //finish the game
        document.querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
        playing = false;
        diceEl.classList.add('hidden');
     } else{
          // 3. switch to next player
         switchPlayer(); 
     }
    }

 
});

// Resetting the game as New game
btnNew.addEventListener('click', function(){
    // console.log('Button is clikced');
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    document.getElementById(`score--${activePlayer}`).textContent = 0;
    diceEl.classList.add('hidden');
    score0El.textContent=0;
    score1El.textContent = 0;
    document.querySelector(`.player--${activePlayer}`)
        .classList.remove('player--winner');
    currentScore = 0;

    player0El.classList.add('player--active');
    // player1El.classList.remove('player--active');

    
})