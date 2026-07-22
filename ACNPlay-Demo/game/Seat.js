const { CS_FOLD, CS_CHECK, CS_RAISE, WINNER, CS_CALL } = require('./actions');

class Seat {
  constructor(id, player, buyin, stack) {
    this.id = id;
    this.player = player;
    this.buyin = buyin;
    this.stack = stack;
    this.hand = [];
    this.bet = 0;
    this.turn = false;
    this.checked = true;
    this.folded = true;
    this.lastAction = null;
    this.sittingOut = false;
  }

  fold() {
    this.bet = 0;
    this.folded = true;
    this.lastAction = CS_FOLD;
    this.turn = false;
  }

  check() {
    this.checked = true;
    this.lastAction = CS_CHECK;
    this.turn = false;
  }

  raise(amount) {
    const reRaiseAmount = amount - this.bet;
    if (reRaiseAmount > this.stack) return;

    this.bet = amount;
    this.stack -= reRaiseAmount;
    this.turn = false;
    this.lastAction = CS_RAISE;
  }
  placeBlind(amount) {
    this.bet = amount;
    this.stack -= amount;
  }

  callRaise(amount) {
    let amountCalled = amount - this.bet;
    if (amountCalled >= this.stack) amountCalled = this.stack;

    this.bet += amountCalled;
    this.stack -= amountCalled;
    this.turn = false;
    this.lastAction = CS_CALL;
  }
  winHand(amount) {
    this.bet = 0;
    this.stack += amount;
    this.turn = false;
    this.lastAction = WINNER;
  }
}

module.exports = Seat;
