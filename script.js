'use strict';

const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
        currnetScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0 ;
        playerEl0.classList.toggle('player--active');
        playerEl1.classList.toggle('player--active');
}

// Starting conditions

score0.textContent = 0;
score1.textContent = 0;
diceEl.classList.add('hidden');

const array = [0 , 0];
let currnetScore = 0;
let activePlayer = 0;
let playing = true;


//Rolling dice functionality
btnRoll.addEventListener('click',function(){
    if(playing){
    //1 . Generating a random dice roll
    
    const randomDice = Math.trunc(Math.random()*6)+1;

    //2 . Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomDice}.png`;

    //3 . Check for rolled
    if(randomDice!==1){
        //Add dice to current score
        currnetScore += randomDice;
        document.getElementById(`current--${activePlayer}`).textContent = currnetScore;
    }else{
        switchPlayer();
    }
}
})

btnHold.addEventListener('click',function(){
    if(playing){
    //1 . Add current score to active player's score
    array[activePlayer] += currnetScore;
    document.getElementById(`score--${activePlayer}`).textContent = array[activePlayer];
    //2. check if player's score is >=100
    if(array[activePlayer] >= 10){
        playing = false;
        diceEl.classList.add('hidden');
        //Finish the game
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }else{
        //3. Switch to the player
        switchPlayer();
    }
}
})

btnNew.addEventListener('click',function(){
    for(let i =0;i<2;i++){
        document.getElementById(`current--${i}`).textContent = 0;
        document.getElementById(`score--${i}`).textContent = 0;
    }
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
})