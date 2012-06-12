/* New blackjack implementation -- multiple hands vs dealer with dealer rules. 
   Classes required -- player, dealer, deck, card 
   Game logic currently in progress in javascript -- should all be in jquery? Furthermore, need
   to conceptualize how jquery fits into the logic if it needs to*/
 function Card (s, n) {
    var suit = s;
    var number = n;
    
    this.getSuit = function() {
        return suit;
    };
    this.getNumber = function() {
        return number;
    };
    this.getValue = function() {
        if (number > 9){
            return 10;
        } else if (number === 0){
            return 11;
        } else {
            return number + 1;
        }
    };
}

function Deck (shoeS) {

	var shoe = [];
	var shoeSize = shoeS;
	//filling the shoe with enough decks of correct cards
	for (i = 0; i < shoeSize; i++) {
		for(i = 0; i < 4; i++) {
			for(j = 0; j < 13; j++) {
				shoe.push(new Card(i,j));
			}
		}
	}
	
	this.getRemainingCards = function () {
		return shoe.length;
	};
	this.deal = function () {
		var r = Math.floor(Math.random() * this.getRemainingCards());
		return shoe.splice(r,1);
	};
}

function Player (d) {
	var deck = d;
	var cards = [deck.deal(), deck.deal()];
	
	this.getHand = function () {
		return cards;
	};
	this.getScore = function () {
		var result = 0;
        var aces = 0;
        for (i = 0; i < cards.length; i++){
            if (cards[i].getValue() === 11){
                aces++;
            }
                result += cards[i].getValue();
        }
        while (result > 21 && aces > 0){
            result = result - 10;
            aces--;
        }
        return result;
	};
	this.hit = function () {
		cards.push(deck.deal());
	};
}
Dealer.prototype = new Player();
Dealer.prototype.constructor = Dealer; //something to do with constructors? investigate if things are wonky..
function Dealer (d) {
	//dealer's rules for auto play
	var deck = d;
	this.hit = function () {
		if (this.getScore() >= 17) {
			return false;
		} else {
			cards.push(deck.deal());
		}
	};
}

var display = function (p) {
	var hand;
	var $playerDiv;
	var players = p;
	for (i = 0; i < players.length; i++){
		hand = players[i].getHand();
		$playerDiv = $("#player"+i);
		for (j = 0; j < hand.length; j++){
			//<img src="../assets/cards.png">
			$playerDiv.html($playerDiv.html() + "<img src='../assets/cards.png'>");
			$($playerDiv + ' img').css("top",hand[j].getSuit() * -120);
			$($playerDiv + ' img').css("left",hand[j].getNumber() * -80);
			$($playerDiv + ' img').css("width",80);
			$($playerDiv + ' img').css("height",120);
		}
	}

};

var startGame = function (h) {
	//initializing the deck, all of the players, and the dealer
	var master = new Deck(8);
	var players = [];
	var hands = h;
	for (i = 0; i < hands; i++) {
		players.push(new Player(master));
	}
	var deal = new Dealer(master);
	display(players);
};

$('document').ready(function() {
	startGame(4);

});

//for displaying the hands and such, create a display function which iterates through all of the players, drawing their hand (or upturned card?) to the board
//this can be called at the beginning of the game, after every update refresh (ie, player presses hit or stay) and at the end of the game for the final reveal
