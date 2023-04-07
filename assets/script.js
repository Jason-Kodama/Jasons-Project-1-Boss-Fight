// an object to be stored later
let winnersLosers = {
    winners: [],
    losers: [],
};
// check if localstorage has been updated yet
if (localStorage.getItem("winnersLosers")) {
    // parse the stored object
    let parsedWinnersLosers = JSON.parse(localStorage.getItem("winnersLosers"));
    // loop through the stored object and update our object with its contents
    for (let winner of parsedWinnersLosers["winners"]) {
        winnersLosers["winners"].push(winner);
    }
    for (let loser of parsedWinnersLosers["losers"]) {
        winnersLosers["losers"].push(loser);
    }
    // if localstorage hasn't been updated yet, update it with the empty object
} else {
    localStorage.setItem("winnersLosers", JSON.stringify(winnersLosers));
}
const cardsContainer = document.querySelector("cards-container");

//<-----------------BOSS 1-------------------------->

function getBossData(data) {
    // get a random boss from the json
    var boss = data["data"][Math.floor(Math.random() * 100)];
    // set the boss image
	$('#boss-1-img').attr('src', boss.image);
    // set the alt of the image to the name of the boss
	$('#boss-1-img').attr('alt', `Image of ${boss.name}`);
    // set the boss name
	$('#boss-1-name').text(boss.name);
    // set the boss description
	$('#boss-1-desc').text(boss.description);
    // set the boss id
	$('#boss-card-1').data('id', boss.name);
}

//</-----------------BOSS 1-------------------------->
function getVillianData(data) {
    // get a random villian from the json
  var villian = data[Math.floor(Math.random() * 10)];
//  set the villian image
$('#boss-2-img').attr('src', villian.images.sm);
//  set the alt of the image to the name of the villian
$('#boss-2-img').attr('alt', `Image of ${villian.name}`);
//  set the villian name
$('#boss-2-name').text(villian.name);
//  set the villian description
 $('#boss-2-desc').text(villian.connections.groupAffiliation);
 // set the villian id
 $('#boss-card-2').data('id', villian.name);

};


//<-----------------BOSS 2-------------------------->

function renderWinnersLosers() {
    for (let winner of winnersLosers["winners"]) {
        // 'winner' var should just be the id of the corresponding character
        // from this id we render an image and styling will be handled in css
        let bossImgURL = "";
        let smallCharacterCard;
        $(".winnersCard").append(
            $(
                `<div data-id=${winner} class="container small-character-card"><img src=${bossImgURL}></img></div>`
            )
        );
    }
    for (let loser of winnersLosers["losers"]) {
        let bossImgURL = "";
        let smallCharacterCard;
        $(".winnersCard").append(
            $(
                `<div data-id=${loser} class="container small-character-card"><img src=${bossImgURL}></img></div>`
            )
        );
    }
}

// when a winner button is pressed
$(".winner-button").click(function (e) {
    e.preventDefault();
    // push the winning card's id into the winner array in the winnersLosers object
    winnersLosers["winners"].push($(e.target).parent().parent().data("id"));
    // push the corresponding losing card's id into the loser array in the winnersLosers object
    winnersLosers["losers"].push(
        $(e.target).parent().parent().attr("id") == "boss-card-1"
            ? $("#boss-card-2").data("id")
            : $("#boss-card-1").data("id")
    );
    // store the updated object into local storage
    localStorage.setItem("winnersLosers", JSON.stringify(winnersLosers));

    document.getElementById("winner-display").text = localStorage.getItem("winners")
    document.getElementById("loser-display").text = localStorage.getItem("losers")
   
});
// when the clear button is pressed
$("#clear-button").click(function (e) {
    e.preventDefault();
    // clear both the winner and loser arrays in the object
    winnersLosers["winners"] = [];
    winnersLosers["losers"] = [];
    // set the localstorage objec to the now empty one
    localStorage.setItem("winnersLosers", JSON.stringify(winnersLosers));
});
$(".boss-img").on('load', function(e){
	const canvas = document.createElement('canvas');
	var canvasContext = canvas.getContext('2d');
	canvasContext.drawImage(e.target, 0, 0, 400, 300)
	$('#bossImage').attr('src',  canvas.toDataURL(e.target.files[0].type))
})
const bossBtn = document.querySelector('.btn');
const bossContainer = $('.boss-card-container');
bossBtn.addEventListener('click', () => {

    if(bossContainer.css('display') === 'none') {
      bossContainer.css('display','inline-flex') 
    }
    else {
      (bossContainer.css('display', 'none'))
    };
    // fetch request to get a new boss
	fetch("https://eldenring.fanapis.com/api/bosses?limit=100")
        // get the json of the response
        .then((response) => response.json())
        // call getBossData function with this response
        .then((boss) => {
            getBossData(boss);
        });


    // fetch request to get a new villian

    // setting the api key and host
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fea0e301c7msh89b111c775c3102p173a8bjsn36e3ea9b29f3',
            'X-RapidAPI-Host': 'superhero-search.p.rapidapi.com'
        }
    };
    // fetch request to get a new villian
    fetch("https://superhero-search.p.rapidapi.com/api/villains", options)
        // get the json of the response
        .then(response => response.json())              
        // call getVillianData function with this response
        .then ((villian) => {
            getVillianData(villian)
            console.log(villian);
        });
});


