fetch('https://eldenring.fanapis.com/api/bosses')
.then(response => response.json())
.then(boss => {
  console.log(boss.results);
});



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