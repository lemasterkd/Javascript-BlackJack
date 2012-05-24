// Card Constructor
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

var deal = function () {
        var ranSuit = Math.floor(Math.random() * 4 + 1);
        var ranNum = Math.floor(Math.random() * 13 + 1);
        return new Card(ranSuit, ranNum);
};


function Hand () {
    var cards = [];
    cards[0] = deal();
    cards[1] = deal();
    this.getHand = function () {
        return cards;
    };
    this.score = function () {
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
    this.printHand = function() {
        var result = "";
        for(i = 0; i < cards.length; i++){
            if (cards[i].getSuit() === 1){
                result += cards[i].getNumber()+" of diamonds,";
            } else if (cards[i].getSuit() === 2){
                result += cards[i].getNumber()+" of spades,";
            } else if (cards[i].getSuit() === 3){
                result += cards[i].getNumber()+" of hearts,";
            } else {
                result += cards[i].getNumber()+" of clubs,";
            }
        }
        return result.slice(0, result.length-1);
    };
    this.hitMe = function () {
        cards.push(deal());
    };
}
var playAsDealer = function (){
    var dealHand = new Hand();
    while (dealHand.score() < 17){
        dealHand.hitMe();
    }
    return dealHand;
};
var playAsUser = function () {
    var userHand = new Hand();
    while (confirm(userHand.printHand())){
        userHand.hitMe();
    }
    return userHand;
};
var declareWinner = function (userHand, dealerHand){
    var userScore = userHand.score();
    var dealerScore = dealerHand.score();
    if (userScore > 21){
        if (dealerScore > 21){
            return "You tied!";
        } else{
            return "You lose!";
        }
    } else if (dealerScore > 21){
        return "You win!";
    } else if (userScore > dealerScore){
        return "You win!";
    } else if (userScore < dealerScore){
        return "You lose!";
    } else {
        return "You tied!";
    }
};

var playGame = function (){
    var userHand = playAsUser();
    var dealerHand = playAsDealer();
    console.log("Your hand:"+userHand.printHand());
    console.log("Their hand:"+dealerHand.printHand());
    console.log(declareWinner(userHand, dealerHand));
};
playGame();