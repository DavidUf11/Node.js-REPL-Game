const prompt = require('readline-sync');

// const userName = prompt.question("What is your name? ");

// console.log(userName);


// log "welcom to..." + goal (attain five victory stasrs?) + instructions . Your rivals will either fight or fortify each turn, so they will accumulate victories. Fighting and fortifying go to next turn. Shopping does not. Shop prices fluctuate so lookout for good deals!\n "Each turn you will get a temporary battle effect that applies for the battle"

// allow user to choose their character

// populate battle effects array

// create options for fighting blue and gree

// add character names and game name 'Battle for Wyncode?' Rivals are Will Sara Dan and Katie

// Write welcome and instructions AFTER Character select screen

// write randomizer for starting strength and gold for each character! Your staarting strength: 1000. Their starting strength random multiple of 50 between 750 and 1250. gold should be correlated with starting strength. Perhaps 20%?

// entire code base should be wrapped in playGame() function. User should have option to play again at the end or just quit. 

// write endgame function

console.log("\n\n\n\n\n\n\n\nWelcome to The Battle for Wyncode!");

let charactersList = ["Dan", "Katie", "Sara", "Will", "Ernie"]
let characterSelection = prompt.question(`\nChoose your character.\n\n[1] Dan\n[2] Katie\n[3] Sara\n[4] Will\n\n`);
if (characterSelection != 1 && characterSelection != 2 && characterSelection != 3 && characterSelection != 4 && characterSelection != 5) {
    console.log("Invalid. Please input '1' '2' '3' or '4'.");
    characterSelection = prompt.question(`\nChoose your character.\n\n[1] Dan\n[2] Katie\n[3] Sara\n[4] Will\n\n`);
}

let userCharacter = charactersList[characterSelection - 1];

if (userCharacter === "Ernie") {
    console.log(`\n\n\n\n\n\n\n\nSECRET CHARACTER UNLOCKED! You chose ${userCharacter}!`);
} else {
    console.log(`\n\n\n\n\n\n\n\nYou chose ${userCharacter}!`);
}

console.log("\nThe Battle For Wyncode is a turn-based action game. To win, accumulate 5 victories before any of your rivals.\n\nEach turn, you will choose from three actions:\n\nShop (does not pass a turn) - Purchase items. Prices fluctuate so look out for good deals!\n\nBattle (passes a turn) - Face off against a rival. Before battling, you can roll a die to take on a Battle Effect that will last only for that battle. The winner of each battle will gain a Victory.\n\nFortify (passes a turn) - Gain Strength. Your rivals can still fight and gain Victories while you are fortifying!");


charactersList.splice(charactersList.indexOf(userCharacter), 1);

prompt.question("\nPress 'Enter' to begin.\n\n");


// Only the strongest can emerge as the Champion of Wyncode!

let currentTurn = 1;

let userStrength = 1000;
let currentGold = 1500;
let currentVictories = 0;

let immuneFromPlunder = false;
let battleEffectsMultiplier = 1;

let winners = [];

function displayStats() {
    console.log(`\nStrength: ${userStrength}\nGold: ${currentGold}\nVictories: ${currentVictories}\n`);
}

// let double-dice = false; (REMEMBER TO SET THIS BACK TO FALSE AFTER DICE ROLL)
// let double-plunder = false; (REMEMBER TO SET THIS BACK TO FALSE AFTER A VICTORY)

function shufflePrices() {    
    let priceA = 4 + Math.floor(Math.random() * 11);
    let priceB = 8 + Math.floor(Math.random() * 41);
    let priceC = 5 + Math.floor(Math.random() * 51);
    if (currentTurn === 1) {
        priceA = 50;
        priceB = 10;
        priceC = 20;
    }
    function showShopItems() {
    let itemChoice = prompt.question(`You have ${currentGold} gold. Make a selection or return to Action Select.\n
 [a] ${priceA} gold - Add 300 to your Strength  \n\n [b] ${priceB} gold - Double the magnitude of your next battle effect \n\n [c] ${priceC} gold - Block rivals from stealing gold on your next defeat\n\n [x] Back to Action Select\n\n`);
    
        if (itemChoice === 'a') {
            if (priceA <= currentGold) {
                currentGold = currentGold - priceA;
                console.log(`\n\n\n\n\n\n\n\nPurchase successful. Strength +300. \n\nRemaining gold: ${currentGold}\n`);
                userStrength += 300;
                console.log(`\nYour Strength is now ${userStrength}.`);
                prompt.question(`Press 'Enter' to return to Action Select.\n\n`);
                askForAction();
            } else {
                console.log("\nNot enough gold! Make another selection or return to Action Select screen.\n ");
                showShopItems();
            }
        } else if (itemChoice === 'b') {
            if (priceB <= currentGold) {
                currentGold = currentGold - priceB;
                battleEffectsMultiplier = 2;
                console.log(`\n\n\n\n\n\n\nPurchase successful. The magnitude of your next battle effect will be doubled. \n\nRemaining gold: ${currentGold}\n`);
                prompt.question(`Press 'Enter to return to Action Select.\n`);
                askForAction();
            } else {
                console.log("\nNot enough gold! Make another selection or return to Action Select screen.\n ");
                showShopItems();
            }
        } else if (itemChoice === 'c') {
            if (priceC <= currentGold) {
                currentGold = currentGold - priceC;
                console.log(`\n\n\n\n\n\n\n\nPurchase Successful. You will be protected from losing gold on your next defeat. \n\nRemaining gold: ${currentGold}\n`);
                immuneFromPlunder = true;
                prompt.question(`Press 'Enter to return to Action Select.\n`);
                askForAction();
            } else {
                console.log("\nNot enough gold! Make another selection or return to Action Select screen.\n");
                showShopItems();
            }
        } else if (itemChoice === 'x') {
            askForAction();
        } else {
            console.log("\nInvalid. Please input 'a' 'b' 'c' or 'x'.\n");
            showShopItems();
        }
    }
    showShopItems();
}

let rivalARandomNum = (Math.floor(Math.random() * 11))
let rivalBRandomNum = (Math.floor(Math.random() * 11))
let rivalCRandomNum = (Math.floor(Math.random() * 11))

let rivalA = {
    name: charactersList[0],
    strength: 750 + (rivalARandomNum * 50),
    gold: 50 + rivalARandomNum * 20,
    victories: 0
}

let rivalB = {
    name: charactersList[1],
    strength: 750 + (rivalBRandomNum * 50),
    gold: 50 + rivalBRandomNum * 20,
    victories: 0
}

let rivalC = {
    name: charactersList[2],
    strength: 750 + (rivalCRandomNum * 50),
    gold: 50 + rivalCRandomNum * 20,
    victories: 0
}

let battleEffectsOnTurn;
let battleEffectsIndex;

function shuffleBattleEffects() {
    battleEffectsOnTurn = [];
    let allBattleEffects = ["Strength +25%", "Strength +300", "Plunder on Victory x2", "Plunder on Victory x2", "Gold +75", "Strength -250", "Strength -100", "Strength +50", "Strength +100", "Gold -50", "No Effect"];
    let i = 1;
    while (i <= 6) { 
        battleEffectsIndex = Math.floor(Math.random() * allBattleEffects.length);
        battleEffectsOnTurn.push(allBattleEffects[battleEffectsIndex]);
        allBattleEffects.splice(battleEffectsIndex, 1);
        i++
    }
}


let currentOpponent;
let battleStrength;
let userDiceRoll;

function fight() {
    let doublePlunder = false;
    battleStrength = userStrength;
    console.log("\n\n\n\n\nYour Rivals:\n")
    console.log(`${rivalA.name}\nStrength: ${rivalA.strength}\nGold: ${rivalA.gold}\nVictories: ${rivalA.victories}\n`);
    console.log(`${rivalB.name}\nStrength: ${rivalB.strength}\nGold: ${rivalB.gold}\nVictories: ${rivalB.victories}\n`);
    console.log(`${rivalC.name}\nStrength: ${rivalC.strength}\nGold: ${rivalC.gold}\nVictories: ${rivalC.victories}\n`);
    shuffleBattleEffects();    
    let rivalChoice = prompt.question(`Type a rival's name to attack.\nType 'x' to return to Action Select.\n\n`);
    if (rivalChoice === 'x') {
        askForAction();
    }
    if (rivalChoice.toLowerCase() === rivalA.name.toLowerCase()) {
        currentOpponent = rivalA;
        console.log("\n\n\n\n\n\n\nPrepare for battle! Roll the dice for a temporary battle effect.\n");
        battleEffectsOnTurn.forEach(effect => console.log("[" + (battleEffectsOnTurn.indexOf(effect) + 1) + "] " + effect));
        prompt.question("\nType 'roll' to roll the dice.\n");
        userDiceRoll = Math.floor((Math.random() * 6) + 1);
        let userBattleEffect = battleEffectsOnTurn[userDiceRoll - 1];
        console.log(`\n\n\n\n\n\n\nYou roll... ${userDiceRoll}! ${userBattleEffect}.`);
        if (battleEffectsMultiplier === 1) {    
            if (userBattleEffect === "Strength +300") {
                battleStrength += 300;
                console.log(`Your strength for this battle is ${battleStrength}.`);
            }

            if (userBattleEffect === "Gold +40") {
                currentGold += 40;
                console.log(`You now have ${currentGold} gold.`);
            }

            if (userBattleEffect === "Strength +25%") {
                battleStrength = userStrength * 1.25;
                console.log(`Your strength for this battle is ${battleStrength}.`);
            }

            if (userBattleEffect === "Plunder on Victory x2") {
                doublePlunder = true;
            }

            if (userBattleEffect === "Gold +75") {
                currentGold += 75;
                console.log(`You now have ${currentGold} gold.`);
            }
         
            if (userBattleEffect === "Gold -50") {
                currentGold -= 50;
                console.log(`You now have ${currentGold} gold.`);
            }

            if (userBattleEffect === "Strength -250") {
                battleStrength = userStrength -250;
                console.log(`Your strength for this battle is ${battleStrength}.`);
            }
       
            if (userBattleEffect === "Strength -100") {
                battleStrength = userStrength -100;
                console.log(`Your strength for this battle is ${battleStrength}.`);
            }
       
            if (userBattleEffect === "Strength +100") {
                battleStrength = userStrength +100;
                console.log(`Your strength for this battle is ${battleStrength}.`);
            }
       
            if (userBattleEffect === "Strength +50") {
                battleStrength = userStrength +50;
                console.log(`Your strength for this battle is ${battleStrength}.`);
            }

        }   else if (battleEffectsMultiplier === 2) {
            if (userBattleEffect === "Strength +300") {
                battleStrength += 600;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! Your strength for this battle is ${battleStrength}.`);
               
            }

            if (userBattleEffect === "Gold +40") {
                currentGold += 80;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! You now have ${currentGold} gold.`);
              
            }

            if (userBattleEffect === "Strength +25%") {
                battleStrength = userStrength * 1.5;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! Your strength for this battle is ${battleStrength}.`);
               
            }

            if (userBattleEffect === "Plunder on Victory x2") {
                doublePlunder = true;
            }

            if (userBattleEffect === "Gold +75") {
                currentGold += 150;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! You now have ${currentGold} gold.`);
               
            }

            if (userBattleEffect === "Strength -250") {
                battleStrength = userStrength - 500;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! Your strength for this battle is ${battleStrength}.`);
            }

            if (userBattleEffect === "Strength -100") {
                battleStrength = userStrength -200;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! Your strength for this battle is ${battleStrength}.`);
            }

            if (userBattleEffect === "Strength +100") {
                battleStrength = userStrength +200;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! Your strength for this battle is ${battleStrength}.`);
            }

            if (userBattleEffect === "Strength +50") {
                battleStrength = userStrength +100;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! Your strength for this battle is ${battleStrength}.`);
            }

            if (userBattleEffect === "Gold -50") {
                currentGold -= 100;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! You now have ${currentGold} gold.`);
            }
        } 
    }

    if (rivalChoice.toLowerCase() === rivalB.name.toLowerCase()) {
        currentOpponent = rivalB;
        console.log("\n\n\n\n\n\n\nPrepare for battle! Roll the dice for a temporary battle effect.\n");
        battleEffectsOnTurn.forEach(effect => console.log("[" + (battleEffectsOnTurn.indexOf(effect) + 1) + "] " + effect));
        prompt.question("\nType 'roll' to roll the dice.\n");
        userDiceRoll = Math.floor((Math.random() * 6) + 1);
        let userBattleEffect = battleEffectsOnTurn[userDiceRoll - 1];
        console.log(`\n\n\n\n\n\n\nYou roll... ${userDiceRoll}! ${userBattleEffect}.`);
        if (battleEffectsMultiplier === 1) {    
            if (userBattleEffect === "Strength +300") {
                battleStrength += 300;
                console.log(`Your strength for this battle is ${battleStrength}.`);
            }

            if (userBattleEffect === "Gold +40") {
                currentGold += 40;
                console.log(`You now have ${currentGold} gold.`);
            }

            if (userBattleEffect === "Strength +25%") {
                battleStrength = userStrength * 1.25;
                console.log(`Your strength for this battle is ${battleStrength}.`);
            }

            if (userBattleEffect === "Plunder on Victory x2") {
                doublePlunder = true;
            }

            if (userBattleEffect === "Gold +75") {
                currentGold += 75;
                console.log(`You now have ${currentGold} gold.`);
            }
         
            if (userBattleEffect === "Gold -50") {
                currentGold -= 50;
                console.log(`You now have ${currentGold} gold.`);
            }

            if (userBattleEffect === "Strength -250") {
                battleStrength = userStrength -250;
                console.log(`Your strength for this battle is ${battleStrength}.`);
            }
       
            if (userBattleEffect === "Strength -100") {
                battleStrength = userStrength -100;
                console.log(`Your strength for this battle is ${battleStrength}.`);
            }
       
            if (userBattleEffect === "Strength +100") {
                battleStrength = userStrength +100;
                console.log(`Your strength for this battle is ${battleStrength}.`);
            }
       
            if (userBattleEffect === "Strength +50") {
                battleStrength = userStrength +50;
                console.log(`Your strength for this battle is ${battleStrength}.`);
            }

        }   else if (battleEffectsMultiplier === 2) {
            if (userBattleEffect === "Strength +300") {
                battleStrength += 600;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! Your strength for this battle is ${battleStrength}.`);
               
            }

            if (userBattleEffect === "Gold +40") {
                currentGold += 80;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! You now have ${currentGold} gold.`);
              
            }

            if (userBattleEffect === "Strength +25%") {
                battleStrength = userStrength * 1.5;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! Your strength for this battle is ${battleStrength}.`);
               
            }

            if (userBattleEffect === "Plunder on Victory x2") {
                doublePlunder = true;
            }

            if (userBattleEffect === "Gold +75") {
                currentGold += 150;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! You now have ${currentGold} gold.`);
               
            }

            if (userBattleEffect === "Strength -250") {
                battleStrength = userStrength - 500;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! Your strength for this battle is ${battleStrength}.`);
            }

            if (userBattleEffect === "Strength -100") {
                battleStrength = userStrength -200;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! Your strength for this battle is ${battleStrength}.`);
            }

            if (userBattleEffect === "Strength +100") {
                battleStrength = userStrength +200;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! Your strength for this battle is ${battleStrength}.`);
            }

            if (userBattleEffect === "Strength +50") {
                battleStrength = userStrength +100;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! Your strength for this battle is ${battleStrength}.`);
            }

            if (userBattleEffect === "Gold -50") {
                currentGold -= 100;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! You now have ${currentGold} gold.`);
            }
        } 
    }

    if (rivalChoice.toLowerCase() === rivalC.name.toLowerCase()) {
        currentOpponent = rivalC;
        console.log("\n\n\n\n\n\n\nPrepare for battle! Roll the dice for a temporary battle effect.\n");
        battleEffectsOnTurn.forEach(effect => console.log("[" + (battleEffectsOnTurn.indexOf(effect) + 1) + "] " + effect));
        prompt.question("\nType 'roll' to roll the dice.\n");
        userDiceRoll = Math.floor((Math.random() * 6) + 1);
        let userBattleEffect = battleEffectsOnTurn[userDiceRoll - 1];
        console.log(`\n\n\n\n\n\n\nYou roll... ${userDiceRoll}! ${userBattleEffect}.`);
        if (battleEffectsMultiplier === 1) {    
            if (userBattleEffect === "Strength +300") {
                battleStrength += 300;
                console.log(`Your strength for this battle is ${battleStrength}.`);
            }

            if (userBattleEffect === "Gold +40") {
                currentGold += 40;
                console.log(`You now have ${currentGold} gold.`);
            }

            if (userBattleEffect === "Strength +25%") {
                battleStrength = userStrength * 1.25;
                console.log(`Your strength for this battle is ${battleStrength}.`);
            }

            if (userBattleEffect === "Plunder on Victory x2") {
                doublePlunder = true;
            }

            if (userBattleEffect === "Gold +75") {
                currentGold += 75;
                console.log(`You now have ${currentGold} gold.`);
            }
         
            if (userBattleEffect === "Gold -50") {
                currentGold -= 50;
                console.log(`You now have ${currentGold} gold.`);
            }

            if (userBattleEffect === "Strength -250") {
                battleStrength = userStrength -250;
                console.log(`Your strength for this battle is ${battleStrength}.`);
            }
       
            if (userBattleEffect === "Strength -100") {
                battleStrength = userStrength -100;
                console.log(`Your strength for this battle is ${battleStrength}.`);
            }
       
            if (userBattleEffect === "Strength +100") {
                battleStrength = userStrength +100;
                console.log(`Your strength for this battle is ${battleStrength}.`);
            }
       
            if (userBattleEffect === "Strength +50") {
                battleStrength = userStrength +50;
                console.log(`Your strength for this battle is ${battleStrength}.`);
            }

        }   else if (battleEffectsMultiplier === 2) {
            if (userBattleEffect === "Strength +300") {
                battleStrength += 600;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! Your strength for this battle is ${battleStrength}.`);
               
            }

            if (userBattleEffect === "Gold +40") {
                currentGold += 80;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! You now have ${currentGold} gold.`);
              
            }

            if (userBattleEffect === "Strength +25%") {
                battleStrength = userStrength * 1.5;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! Your strength for this battle is ${battleStrength}.`);
               
            }

            if (userBattleEffect === "Plunder on Victory x2") {
                doublePlunder = true;
            }

            if (userBattleEffect === "Gold +75") {
                currentGold += 150;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! You now have ${currentGold} gold.`);
               
            }

            if (userBattleEffect === "Strength -250") {
                battleStrength = userStrength - 500;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! Your strength for this battle is ${battleStrength}.`);
            }

            if (userBattleEffect === "Strength -100") {
                battleStrength = userStrength -200;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! Your strength for this battle is ${battleStrength}.`);
            }

            if (userBattleEffect === "Strength +100") {
                battleStrength = userStrength +200;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! Your strength for this battle is ${battleStrength}.`);
            }

            if (userBattleEffect === "Strength +50") {
                battleStrength = userStrength +100;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! Your strength for this battle is ${battleStrength}.`);
            }

            if (userBattleEffect === "Gold -50") {
                currentGold -= 100;
                console.log(`Battle Effects Multiplier Active! ${userBattleEffect} x2! You now have ${currentGold} gold.`);
            }
        } 
    }

        // add options for fighting rivals 2 and 3 
        if (currentOpponent === rivalA) {        
            console.log(`\nTime for Battle! \n${userCharacter} (${battleStrength} strength)\n         vs.\n${rivalA.name} (${rivalA.strength} strength)\n`);
        } else if (currentOpponent === rivalB) {        
            console.log(`\nTime for Battle! \n${userCharacter} (${battleStrength} strength)\n         vs.\n${rivalB.name} (${rivalB.strength} strength)\n`);
        } else if (currentOpponent === rivalC) {        
            console.log(`\nTime for Battle! \n${userCharacter} (${battleStrength} strength)\n         vs.\n${rivalC.name} (${rivalC.strength} strength)\n`);
        };
        prompt.question(`\nType 'fight' to fight ${rivalA.name}.\n`);
        if (battleStrength > rivalA.strength) {
           
            currentVictories++;
            let plunderAmount = parseInt(rivalA.gold * (Math.floor(Math.random() * 34) / 100));
            if (doublePlunder === false) {
                currentGold += plunderAmount;
                rivalA.gold -= plunderAmount;
                console.log(`\n\n\n\n\n\n\nYou overpower ${rivalA.name} and achieve victory!\nTotal victories: ${currentVictories}
            \nYou manage to plunder ${plunderAmount} of ${rivalA.name}'s gold.\nTotal Gold: ${currentGold}`);
            } else if (doublePlunder === true && battleEffectsMultiplier === 2) {
                currentGold += plunderAmount * 4;
                rivalA.gold -= plunderAmount * 4;
                console.log(`\n\n\n\n\n\n\nYou overpower ${rivalA.name} and achieve victory!\nTotal victories: ${currentVictories}
            \nDouble Plunder active! Battle Effects Multiplier active! You manage to plunder ${plunderAmount * 4} of ${rivalA.name}'s gold.\nTotal Gold: ${currentGold}`);
            } else if (doublePlunder === true) {
                currentGold += plunderAmount * 2;
                rivalA.gold -= plunderAmount * 2;
                console.log(`\n\n\n\n\n\n\nYou overpower ${rivalA.name} and achieve victory!\nTotal victories: ${currentVictories}
            \nDouble Plunder active! You manage to plunder ${plunderAmount * 2} of ${rivalA.name}'s gold.\nTotal Gold: ${currentGold}`);
            }
            newTurn();
        } else if (battleStrength < rivalA.strength) {
            console.log(`\n\n\n\n\n\n\nDefeat! ${rivalA.name} gains a victory.`);
            rivalA.victories++;
            let plunderAmount = parseInt(rivalA.gold * (Math.floor(Math.random() * 34) / 100));
            if (immuneFromPlunder === false) {
                console.log(`${rivalA.name} plundered ${plunderAmount} of your gold!`);
                currentGold -= plunderAmount;
                rivalA.gold += plunderAmount;
            } else if (immuneFromPlunder == true) {
                console.log(`Shop item activated! You were protected you from losing any gold.`)
                immuneFromPlunder = false;
            }
            newTurn();
        } else {
            console.log("\nIt's a draw! Neither combatant gains a victory.");
            newTurn();
        }


} /// add other rivals, plus "else" for invalid input


function askForAction(param1) {
    if (param1 != "invalid input") {
    console.log(`\n\n\n\n\n\n\nTurn ${currentTurn}`)
    displayStats();
    let actionSelection = prompt.question(`Select an action.\n[s] Shop   [b] Battle   [f] Fortify\n\n`);
    if (actionSelection === "s") {
            console.log("\nWelcome to the shop.\n")
            shufflePrices();
        } else if (actionSelection ==="b") {
            fight();
        } else if (actionSelection ==="f") {
            fortify();
        } else {
            askForAction("invalid input");
        }
    } else {
        console.log("\n\n\n\n\n\n\nInvalid. Input 'a' 'b' or 'c'");
        console.log(`\nTurn ${currentTurn}`)
        displayStats();
        let actionSelection = prompt.question(`Select an action.\n[s] Shop   [b] Battle   [f] Fortify\n\n`);
        if (actionSelection === "s") {
            console.log("\nWelcome to the shop.\n")
            shufflePrices();
        } else if (actionSelection ==="b") {
            fight();
        } else if (actionSelection ==="f") {
            fortify();
        } else {
            askForAction("invalid input");
        }
    }  
}

askForAction();

function newTurn() {
    battleEffectsMultiplier = 1;
    if (currentOpponent === rivalA) {
        simulateNPCBattle(rivalB, rivalC);
    } else if (currentOpponent === rivalB) {
        simulateNPCBattle(rivalA, rivalC);
    } else if (currentOpponent === rivalC) {
        simulateNPCBattle(rivalA, rivalB);
    };
    if (currentVictories === 4) {
        console.log("\nYou are one victory away from becoming champion!");
    };
 
    if (rivalA.victories === 4) {
        console.log(`\n${rivalA.name} is one victory away from becoming champion!`);
    };
 
    if (rivalB.victories === 4) {
        console.log(`\n${rivalB.name} is one victory away from becoming champion!`);
    };
 
    if (rivalC.victories === 4) {
        console.log(`\n${rivalC.name} is one victory away from becoming champion!`);
    };

    if (currentVictories === 5) {
        console.log("\nYou attained five victories!") 
        winners.push(userCharacter);
    };
 
    if (rivalA.victories === 5) {
        console.log(`\n${rivalA.name} attained 5 victories`);
        winners.push(rivalB.name);
    };
 
    if (rivalB.victories === 5) {
        console.log(`\n${rivalB.name} attained 5 victories!`);
        winners.push(rivalB.name);
    };
 
    if (rivalC.victories === 5) {
        console.log(`\n${rivalC.name} attained 5 victories!`);
        winners.push(rivalC.name);
    };

    if (currentVictories === 5 || rivalA.victories === 5 || rivalB.victories === 5 || rivalC.victories === 5) {
        if (winners.length > 1) {
            console.log(`\nMultiple combatants have reached 5 victories! The winners are:`);
            winners.forEach(element => console.log(element));
            endGame();
        } else if (winners.length === 1) {
            console.log(`\nThe Champion of Wyncode is:\n`)
            console.log(`*****${winners[0]}*****`)
        }    
    }

    // account for rival and user or two rivals reaching 5 victories on the same turn.

    prompt.question("\nPress 'Enter' to go on to the next turn.\n"); 
    currentOpponent = "";    
    currentTurn++;
    // check current victories of all combatants - SWITCH STATEMENT WOULD BE GOOD HERE
        // return '1 more victory to win' if any have four victories
        // display "[rival] won" or "You won" if victories === 5
    askForAction();
}

function fortify(source) {
    if (source === 'invalid input') {
        let fortificationAmount = 0;
        console.log(`\n\n\n\n\n\n\nInvalid. Input 'roll' or 'x'\n\nPossible fortifications:\n`);
        let possibleFortificationStrings = ["+100 Strength", "+150 Strength", "+200 Strength", "+250 Strength", "+300 Strength", "+400 Strength", ];
        possibleFortificationStrings.forEach(effect => console.log("[" + (possibleFortificationStrings.indexOf(effect) + 1) + "] " + effect));
        let possibleFortificationNums = [100, 150, 200, 250, 300, 400];
        let fortifyOrNot = prompt.question(`\n\nType 'roll' to roll the die for a random fortifaction and pass a turn.\nType 'x' to return to Action Select.\n\n`)
        if (fortifyOrNot === "roll") {
            userDiceRoll = Math.floor((Math.random() * 6) + 1);
            fortificationAmount = possibleFortificationNums[userDiceRoll - 1];
            userStrength += fortificationAmount;
            console.log(`\n\n\n\n\n\n\nYou roll...${userDiceRoll}! You gained ${fortificationAmount} Strength.\nTotal Strength: ${userStrength}`);
            simulateNPCActionsOnFortification();
            newTurn();
        } else if (fortifyOrNot === 'x') {
            askForAction();
        } else {
            console.log();
            fortify("invalid input");
        }
    } else {
        console.log(`"\n\n\n\n\n\n\nPossible fortifications:\n`);
        let possibleFortificationStrings = ["+100 Strength", "+150 Strength", "+200 Strength", "+250 Strength", "+300 Strength", "+400 Strength", ];
        possibleFortificationStrings.forEach(effect => console.log("[" + (possibleFortificationStrings.indexOf(effect) + 1) + "] " + effect));
        let possibleFortificationNums = [100, 150, 200, 250, 300, 400];
        let fortifyOrNot = prompt.question(`\n\nType 'roll' to roll the die for a random fortifaction and pass a turn.\nType 'x' to return to Action Select.\n\n`)
        if (fortifyOrNot === "roll") {
            userDiceRoll = Math.floor((Math.random() * 6) + 1);
            fortificationAmount = possibleFortificationNums[userDiceRoll - 1];
            userStrength += fortificationAmount;
            console.log(`\n\n\n\n\n\n\nYou roll...${userDiceRoll}! You gained ${fortificationAmount} Strength.\nTotal Strength: ${userStrength}`);
            simulateNPCActionsOnFortification();
            newTurn();
        } else if (fortifyOrNot === 'x') {
            askForAction();
        } else {
            console.log();
            fortify("invalid input");
        }
    }
}

function simulateNPCBattle(NPC1, NPC2) {
    let NPCBattleDecider = (Math.floor(Math.random() * 10) + 1);
    if (NPCBattleDecider > 2) {
        console.log(`\nAnother battle took place this turn: ${NPC1.name} vs. ${NPC2.name}.`);
        let NPC1BattleStrength = NPC1.strength + ((Math.floor(Math.random() * 3) + 1) * 100);
        let NPC2BattleStrength = NPC2.strength + ((Math.floor(Math.random() * 3) + 1) * 100);
        // console.log(`${NPC1.name} battlestrength: ${NPC1BattleStrength}. ${NPC2.name} battlestrneght: ${NPC2BattleStrength}`)
        if (NPC1BattleStrength > NPC2BattleStrength) {
            NPC1.victories++;
            console.log(NPC1.name + ` emerged victorious. ${NPC1.name}'s Victories: ${NPC1.victories}`);
        } else if (NPC2BattleStrength > NPC1BattleStrength) {
            NPC2.victories++;
            console.log(NPC2.name + ` emerged victorious. ${NPC2.name}'s Victories: ${NPC2.victories}.`);
        } else {
        console.log("The battle ended in a draw! Neither combatant gains a victory.");
        }
    } else {
        let NPC1FortificationAmount = ((Math.floor(Math.random() * 4) + 1) * 100);
        NPC1.strength += NPC1FortificationAmount;
        let NPC2FortificationAmount = ((Math.floor(Math.random() * 4) + 1) * 100);
        NPC2.strength += NPC2FortificationAmount; 
        console.log(`\n\nNo other battle took place this turn. ${NPC1.name} and ${NPC2.name} both fortified.\n${NPC1.name} +${NPC1FortificationAmount} Strength\n${NPC2.name} +${NPC2FortificationAmount}`);
    }
}

function simulateNPCActionsOnFortification() {
    let rivalsArray = [rivalA, rivalB, rivalC];
    // console.log(rivalsArray);
    let NPCBattleDecider = (Math.floor(Math.random() * 10) + 1);
    if (NPCBattleDecider > 2) {
        let combatant1 = rivalsArray[Math.floor(Math.random() * 3)];
        rivalsArray.splice(rivalsArray.indexOf(combatant1), 1);
        let combatant2 = rivalsArray[Math.floor(Math.random() * 2)];
        rivalsArray.splice(rivalsArray.indexOf(combatant2), 1);
        console.log(`\nA battle took place this turn between ${combatant1.name} and ${combatant2.name}.`);
        let combatant1Strength = combatant1.strength + ((Math.floor(Math.random() * 3) + 1) * 100);
        let combatant2Strength = combatant2.strength + ((Math.floor(Math.random() * 3) + 1) * 100);
        if (combatant1Strength > combatant2Strength) {
            combatant1.victories++;
            let plunderAmount = parseInt(combatant2.gold * (Math.floor(Math.random() * 34) / 100));
            combatant1.gold += plunderAmount;
            combatant2.gold -= plunderAmount;
            console.log(combatant1.name + ` emerged victorious and plundered ${plunderAmount} gold. ${combatant1.name}'s Victories: ${combatant1.victories}.`);
        } else if (combatant2Strength > combatant1Strength) {
            combatant2.victories++;
            let plunderAmount = parseInt(combatant1.gold * (Math.floor(Math.random() * 34) / 100));
            combatant2.gold += plunderAmount;
            combatant1.gold -= plunderAmount;
            console.log(combatant2.name + ` emerged victorious and plundered ${plunderAmount} gold. ${combatant2.name}'s Victories: ${combatant2.victories}.`);
        } else {
        console.log("The battle ended in a draw! Neither combatant gains a victory.");
        }
        let fortifyingRival = rivalsArray[0];
        let fortifyingRivalFortification = ((Math.floor(Math.random() * 4) + 1) * 100);
        fortifyingRival.strength += fortifyingRivalFortification;
        // console.log(rivalsArray);
        console.log(`\n${fortifyingRival.name} fortified and gained ${fortifyingRivalFortification} Strength.`);
    }
    else {
        let rivalAFortificationAmount = ((Math.floor(Math.random() * 4) + 1) * 100);
        let rivalBFortificationAmount = ((Math.floor(Math.random() * 4) + 1) * 100);
        let rivalCFortificationAmount = ((Math.floor(Math.random() * 4) + 1) * 100);
        
        rivalA.strength += rivalAFortificationAmount;
        rivalB.strength += rivalBFortificationAmount;
        rivalC.strength += rivalCFortificationAmount;
        
        console.log(`\nNo battles took place this turn. All rivals fortified.\n${rivalA.name} +${rivalAFortificationAmount} Strength\n${rivalB.name} +${rivalBFortificationAmount} Strength\n${rivalC.name} +${rivalCFortificationAmount} Strength\n`);
    } 
}

function endGame() {
    // get prompt asking if user wants to play again or just quit
        // play again? run rungame function which encompasses everything except instructions. 
}