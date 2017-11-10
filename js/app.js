/**
 * Create Card objects
 */
function Card (name, img, id) {
  this.name = name;
  this.img = img;
  this.pairID = id;
}

var diamond = new Card("diamond", "fa fa-diamond", 1);
var paperPlane = new Card("paperPlane", "fa fa-paper-plane-o", 2);
var anchor = new Card("anchor", "fa fa-anchor", 3);
var bolt = new Card("bolt", "fa fa-bolt", 4);
var cube = new Card("cube", "fa fa-cube", 5);
var leaf = new Card("leaf", "fa fa-leaf", 6);
var bicycle = new Card("bicycle", "fa fa-bicycle", 7);
var bomb = new Card("bomb", "fa fa-bomb", 8);

var cards = [];

cards.push(diamond, diamond, paperPlane, paperPlane, anchor, anchor, bolt, bolt,
          cube, cube, leaf, leaf, bicycle, bicycle, bomb, bomb);


displayCards();
$(".restart").on("click", reset);
$(".close").on("click", hide_modal);
$(".play-again-btn").on("click", play_again);

/*
 * displayCards function:
 *   - shuffles the list of cards using the provided "shuffle" method below
 *   - loops through each card and create its HTML
 *   - adds each card's HTML to the page
 *   - adds eventlistener on click action
 */

function displayCards(){
  cards = shuffle(cards);
  $.each(cards, function(){
    $(".deck").append("<li class=\"card\"></li>");
    var lastCard = $(".deck li:last-child")
    lastCard.append("<i></i>");
    lastCard.find("i").addClass(this.img);
  });
  $(".card").on("click", displaySymbol);
}

/*
 *  Reset function:
 *  stopping and resetting timer;
 *  resetting move to 0;
 *  deleting nold cards, and displaying the new cards;
 */

function reset(){
    stop_timer();
    timer_on = false;
    sec = 0;
    min = 0;
    $(".timer").replaceWith(`<div class="timer">00:00</div>`);

    move = 0;
    $("i.fa.fa-star-o").attr("class","fa fa-star");
    $(".moves").replaceWith(`<span class="moves"> ${move} Moves</span>`);

    openCards = [];

    $(".deck").empty();
    displayCards();
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * displaySymbol function:
 *  - displays the card's symbol;
 *  - add the card to a *list* of "open" cards;
 *  - if the list already has another card, checks to see if the two cards match:
 *    + if the cards do match, locks the cards in the open position;
 *    + if the cards do not match, removes the cards from the list and hide the card's symbol;
 *    + increments the move counter;
 *    + if all cards have matched, displays a message with the final score;
 */

var openCards = [];

function displaySymbol() {

  if(!$(this).hasClass("show open")){

    switch(openCards.length){

      case 0:
        if (!timer_on){
          timer_on = true;
          start_timer();
        }
        openCards.push($(this));
        $(this).addClass("show open");
        addMove();
        break;

      case 1:
        $(this).addClass("show open");
        openCards.push($(this));

        if (openCards[0].children().attr("class") === openCards[1].children().attr("class")) {
          $.each(openCards, function(){
            lockOpen();
            checkWinner();
          })
        } else {
          $.each(openCards, function(){
            $(this).removeClass("open");
            $(this).addClass("nomatch");
          })
          setTimeout(foldCards, 1500);
        }
        break;
    }
  }
}

/*
 *  Timer functions
 */

var timerIntervalID;
var timer_on = false;
var sec = 0;
var min = 0;

function start_timer(){
  timerIntervalID = setInterval(add_a_second,1000);
}

function stop_timer(){
  clearInterval(timerIntervalID);
}

/*
 *  add_a_second function:
 *  Adding one second to the timer, and updating the displayed time.
 */

var time_string = "";

function add_a_second(){
  time_string = "";
  if (timer_on){
    sec++;
    if (sec === 59){
      min++;
      sec = 0;
    }
    if(min < 10){
      time_string += "0" + min;
    } else {
      time_string += min;
    }
    if(sec < 10){
      time_string += ":0" + sec;
    } else {
      time_string += ":" + sec;
    }
    $(".timer").replaceWith(`<div class="timer"> ${time_string} </div>`);
  }
}

/*
 *  lockOpen function:
 *  sets the cards to remain open till the end of the game.
 */

function lockOpen(){
  $.each(openCards, function(){
    $(this).removeClass("open");
    $(this).addClass("match");
  })
  openCards = [];
}

/*
 *  foldCard function:
 *  folds back the active cards, and clears the open card array.
 */

function foldCards(){
  $.each(openCards, function(){
    $(this).removeClass("open show nomatch");
  })
  openCards = [];
}

/*
 *  checkWinner function:
 *  checks if the game is already won.
 *  if all the cards ar matched, the game ends, the timer stops and shows the winner modal;
 */

function checkWinner(){
  if ($(".match").length == 16){
    timer_on = false;
    stop_timer();
    open_modal();
  }
}


/*
 *  addMove function:
 *  adds one two the move variable, when a first card is turned.
 *  when move reaches the number 15 or 20 one star will be changed to an empty star
 *  in the results.
 */

var move = 0;

function addMove(){
  move++;
  $(".moves").replaceWith(`<span class="moves"> ${move} Moves</span>`);

  switch(move){
    case 15:
    case 20:
      $("i.fa.fa-star").last().attr("class","fa fa-star-o");
      break;
  }
}

/*
 *  open_modal function:
 *  updates info in modal;
 *  shows the modal;
 */

function open_modal(){
  $(".stars-result").empty();
  $(".stars").find("li").clone().appendTo(".stars-result");
  $(".move-result").replaceWith(`<p class = "move-result">You made ${move} moves in ${time_string} minutes.</p>`);
  $(".modal").css("display", "block");
}

/*
 *  hide_modal function:
 *  hides the modal;
 */

function hide_modal(){
  $(".modal").css("display", "none");
}

/*
 *  play_again function:
 *  hides the modal and resets the game;
 */

function play_again(){
  hide_modal();
  reset();
}
