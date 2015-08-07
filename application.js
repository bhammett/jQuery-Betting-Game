var numberSelected;
var totalBet = [];
var message = "";
var coinsWon;
var coinsLost;
var coinsMaintained;
var currentCoins = 10;


//Make the number squares selectable
$(".squares").on("click", "li", function () {
  $(this).siblings().removeClass("selected");
  $(this).addClass("selected");
  numberSelected = $(this).val();
  $("#message-area p").remove();
});

//Make the coins draggable
$(".coin").draggable();
                
//Make the betting area droppable
$("#bet-area").droppable({
  accept: ".coin",
  drop: function(event, ui){
   totalBet.push(ui.draggable);
   (ui.draggable).addClass("dropped");
    if($(".reset-btn").css("visibility") == "hidden") {
      $(".bet-btn").css("visibility", "visible");
    }
  }
}); 


//Placing the bet
$(".bet-btn").on("click", function() {
  if (totalBet.length > 0 && numberSelected !== undefined) {
    var randomNumber = Math.floor(Math.random() * 10) + 1;
    var message = "";
    
    $(".random-number img").fadeOut('slow', function() { 
        $(".question-mark").remove();
        $(".random-number").append("<h2>" + randomNumber + "</h2>").addClass("white-box"); 
    
         setTimeout(function() {
              $(".white-box").fadeOut(1000, function() {
              $(".white-box").detach();
              $("#message-area p").remove();
              });
          }, 2000);

     
      });
    if (numberSelected === randomNumber) {
      coinsWon = (totalBet.length * 2);
     
      addCoins(coinsWon);
      removeCoins(totalBet.length);
      message += "<p>YOU WIN!!</p>";
      currentCoins += coinsWon;
      console.log("You have " + currentCoins);
   
    } else if ((randomNumber - numberSelected === 1) || (randomNumber - numberSelected === -1 )) {
    
      coinsMaintained = totalBet.length;
      removeCoins(coinsMaintained);
      addCoins(coinsMaintained);
      message += "<p>Almost.</p>";
    } else {
      coinsLost = totalBet.length;
      removeCoins(coinsLost);
      currentCoins -= coinsLost;
      console.log("You have " + currentCoins);
      message += "<p>Sorry. You lose.</p>";
    }
      message += "<p>You chose: " + numberSelected + "</p>";
      message += "<p> The number was: " + randomNumber + "</p>";
      $(message).appendTo("#message-area");
      $(".bet-btn").css("visibility", "hidden");
  }
  if (numberSelected === undefined) {
    message = "<p>You must chose a number</p>";
    $(message).appendTo("#message-area");
  }
  // totalBet = [];
  setTimeout(function() {
    $(".reset-btn").css("visibility", "visible");
  }, 5000);
});

 //Add coins on win 
function addCoins(bet) {
  for (var i = 0; i < bet; i++) {
    $('<img src="super_mario_coin.png" img class="coin" value="1">').draggable().appendTo(".coins");
  }
}
//Remove coins on loss
function removeCoins(bet) {
 $(".dropped").remove();
}

// Reset game
$(".reset-btn").on("click", function(event){
  event.preventDefault();
  location.reload();
  });






