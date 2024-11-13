//1. deposit some money
//2. determine number of lines to bet on
//3. collect bet amount
//4. spin the slot machine
//5. check if user won
//6. give the user their winning
//7. play again

// function deposit() {
//     return 1  
// }

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  "A" : 2,
  "B" : 4,
  "C" : 6,
  "D" : 8,
}

const SYMBOL_VALUES = {
  "A" : 5,
  "B" : 4,
  "C" : 3,
  "D" : 2,
}



const deposit = () => {
  while (true){
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
      console.log("Invalid deposit amount, try again.");
  } 
    else {
    return numberDepositAmount;
    }
    }
}; 

const getNumberOfLines = () => {
  while (true){
    const lines= prompt("Enter the number of lines to bet on (1-3): ");
    const NumberOfLines = parseFloat(lines);

    if (isNaN(NumberOfLines) || NumberOfLines <= 0 || NumberOfLines > 3 ){
      console.log("Invalidnumber of lines, Try again.");
  } 
    else {
    return NumberOfLines;
    }
    }
};

const getBet = (balance, lines) => {
  while (true){
    const bet = prompt("Enter the bet per line: ");
    const NumberBet = parseFloat(bet);

    if (isNaN(NumberBet) || NumberBet <= 0 || NumberBet > (balance / lines) ){
      console.log("Invalid bet, Try again.");
  } 
    else {
    return NumberBet;
    }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0; i < count; i++){
          symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i = 0; i < COLS; i++){
      reels.push([]);    
      const reelSymbols = [...symbols]; // copies symbols  array
      for (let j = 0; j < ROWS; j++){
        const randomIndex = Math.floor(Math.random() * reelSymbols.length)
        const selectedsymbol = reelSymbols[randomIndex];
        reels[i].push(selectedsymbol);
        reelSymbols.splice(randomIndex, 1);// 1 means remove 1 elemnt
      }
    }
    return reels;
};
const transpose = (reeLs) => {
  const rows = [];
  for (let i = 0; i < ROWS;i++ ){
    rows.push([]);
    for (let j = 0; j < COLS;j++){
      rows[i].push(reeLs[j][i]);
    }
  }
  return rows;
}

const printRows = (rows) => {
    for (const row of rows){
      let rowstring = "";
      for(const [i, symbol ] of row.entries()){
        rowstring += symbol
        if (i != row.length -1){
          rowstring += " | "
        }
      }
      console.log(rowstring);
    }
};
 
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for(let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allsame = true;
        for (const symbol of symbols){
          if (symbol != symbols[0]){
            allsame = false;
            break;
          }
        }
        if (allsame){
          winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
  }

const game = () => {
  let balance = deposit();

  while (true) {
  console.log("You have a balance of $" + balance);
  const NumberOfLines = getNumberOfLines();
  const bet = getBet(balance, NumberOfLines);
  balance -= bet * NumberOfLines;
  const reels =spin();
  const rows = transpose(reels);
  console.log(reels);
  console.log(rows);
  printRows(rows);
  const winnings = getWinnings(rows, bet, NumberOfLines);
  balance += winnings
  console.log("You won, $" + winnings.toString());

  if (balance <= 0){
    console.log("You ran out of money!");
    break;
  }

  const playAgain = prompt("Do you want to play again (y/n)?");

  if (playAgain != "y") break;
  }
};

game();




