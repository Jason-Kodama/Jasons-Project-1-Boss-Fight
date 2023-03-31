fetch('https://eldenring.fanapis.com/api/bosses')
.then(response => response.json())
.then(boss => {
  console.log(boss.results);
});

let winnersLosers = {
    winners: [],
    losers: []
}
if(localStorage.getItem('winnersLosers')){
    var parsedWinnersLosers = JSON.parse(localStorage.getItem('winnersLosers'));
    for(let winner of parsedWinnersLosers['winners']){
        winnersLosers['winners'].push(winner);
    }
    for(let loser of parsedWinnersLosers['losers']){
        winnersLosers['losers'].push(loser);
    }
}else{
    localStorage.setItem('winnersLosers', JSON.stringify({
        winners: [],
        losers: []}))
}
const cardsContainer = document.querySelector('cards-container');


function renderBoss(boss) {
  boss.forEach(boss => {
    const name  = document.createElement('h3'); 
    const image = document.createElement('img');
    const description = document.createElement('p');
    const div = document.createElement('div');     
    const like = document.createElement('button');

    div.classList = 'card'
    image.classList = 'card-img'
    like.classList = 'empty'
    image.src = boss.image
    name.innerText = `Name: ${boss.name}`
    description.innerText =`Description: ${boss.description}`
    like.textContent = 'like'
    div.appendChild(image)
    div.appendChild(name)
    div.appendChild(description)
    div.appendChild(like)
    cardsContainer.appendChild(div)
  })};

$('.winner-button').click(function (e) { 
    e.preventDefault();
    winnersLosers['winners'].push($(e.target).parent().data('id'));
    winnersLosers['losers'].push($(selector).attr('id') === '');
});