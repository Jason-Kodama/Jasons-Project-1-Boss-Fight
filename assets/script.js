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
	$('#boss-card-1').data('id', boss.id);
}

//</-----------------BOSS 1-------------------------->

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
    // fetch request to get a new boss
	fetch("https://eldenring.fanapis.com/api/bosses?limit=100")
        // get the json of the response
        .then((response) => response.json())
        // call getBossData function with this response
        .then((boss) => {
            getBossData(boss);
        });
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