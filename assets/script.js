fetch('https://eldenring.fanapis.com/api/bosses')
.then(response => response.json())
.then(boss => {
  console.log(boss);
});

fetch('https://zelda.fanapis.com/api/bosses')
.then(response => response.json())
.then(boss => {
  console.log(boss);
});

// an object to be stored later
let winnersLosers = {
    winners: [],
    losers: []
}
// check if localstorage has been updated yet
if(localStorage.getItem('winnersLosers')){
    // parse the stored object
    let parsedWinnersLosers = JSON.parse(localStorage.getItem('winnersLosers'));
    // loop through the stored object and update our object with its contents
    for(let winner of parsedWinnersLosers['winners']){
        winnersLosers['winners'].push(winner);
    }
    for(let loser of parsedWinnersLosers['losers']){
        winnersLosers['losers'].push(loser);
    }
// if localstorage hasn't been updated yet, update it with the empty object
}else{
    localStorage.setItem('winnersLosers', JSON.stringify(winnersLosers))
}
const cardsContainer = document.querySelector('cards-container');

function renderWinnersLosers(){
  for(let winner of winnersLosers['winners']){
    // 'winner' var should just be the id of the corresponding character
    // from this id we render an image and styling will be handled in css
    let bossImgURL = '';
    let smallCharacterCard;
    $('.winnersCard').append($(`<div data-id=${winner} class="container small-character-card"><img src=${bossImgURL}></img></div>`));
  }
  for(let loser of winnersLosers['losers']){
    let bossImgURL = '';
    let smallCharacterCard;
    $('.winnersCard').append($(`<div data-id=${loser} class="container small-character-card"><img src=${bossImgURL}></img></div>`));
  }
}

function renderBoss(boss) {
  fetch(eldenring_url);
  .then(response => response.json())
  .then(data => randomBoss.getBoss(data))

     console.log(data);
     console.log('${data.name}');
   }
     
static  getBoss(data);
 const boss = data[Math.floor(Math.random() * data.length)];
 console.log(boss);
 const bossCard = document.getElementById('bossCard');
 bossCard.innerHTML = `
 <div class="bossCard">
 <h2>${boss.name}</h2>
 <img src="${boss.image}" alt="">
<p>${boss.description}</p>
</div>`;


// when a winner button is pressed
$('.winner-button').click(function (e) { 
    e.preventDefault();
    // push the winning card's id into the winner array in the winnersLosers object
    winnersLosers['winners'].push($(e.target).parent().data('id'));
    // push the corresponding losing card's id into the loser array in the winnersLosers object
    winnersLosers['losers'].push($(e.target).parent().attr('id') == 'bossCard' ? $('#bossCard2').data('id') : $('#bossCard').data('id'));
    // store the updated object into local storage
    localStorage.setItem('winnersLosers', JSON.stringify(winnersLosers));
});
// when the clear button is pressed
$('#clear-button').click(function(e){
  e.preventDefault();
  // clear both the winner and loser arrays in the object
  winnersLosers['winners'] = [];
  winnersLosers['losers'] = [];
  // set the localstorage objec to the now empty one
  localStorage.setItem('winnersLosers',JSON.stringify(winnersLosers));
});