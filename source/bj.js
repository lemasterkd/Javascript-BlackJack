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
        if (number > 10){
            return 10;
        } else if (number === 1){
            return 11;
        } else {
            return number;
        }
    };
}

function Deck (shoeSize) {

	var shoe = [];
	//filling the shoe with enough decks of correct cards
	for (i = 0; i < shoeSize; i++) {
		for(i = 1; i <= 4; i++) {
			for(j = 1; j <= 13; j++) {
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

function Player (deck) {
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
function Dealer (deck) {
	//dealer's rules for auto play
	this.hit = function () {
		if (this.getScore() >= 17) {
			return false;
		} else {
			cards.push(deck.deal());
		}
	};
}

var startGame = function (hands) {
	//initializing the deck, all of the players, and the dealer
	var master = new Deck(8);
	var players = [];
	for (i = 0; i < hands; i++) {
		players.push(new Player(master));
	}
	var deal = new Dealer(master);
};

//for displaying the hands and such, create a display function which iterates through all of the players, drawing their hand (or upturned card?) to the board
//this can be called at the beginning of the game, after every update refresh (ie, player presses hit or stay) and at the end of the game for the final reveal
