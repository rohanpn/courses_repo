// (Logical or) || will return the first truthy and right most falsy value
// Task 1 : Short Circuit logic
// Use short circuit method to reduce ternary conditaionl
// Bad Code
var pocketStuff = ["Dragon Tooth", "Adventure Diary", "Silver Tiger Coin"];
var cluesToThePast = pocketStuff ? pocketStuff : [] ;


// Good Code
var pocketStuff = ["Dragon Tooth", "Adventure Diary", "Silver Tiger Coin"];
var cluesToThePast = pocketStuff || [] ;

// ============================================================================>

// (Logical and) && will return the first falsy value or right most truthy value

// ============================================================================>

// Task 2 : Best practice for switch if more than two cases return same value
// Bad Code
function gotoPath(direction){
  var happensNext;
  switch(direction) {
    case "right hallway" : happensNext = 'On correct path'; break;
    case "left hallway" : happensNext = 'On correct path'; break;
    case "forward hallway" : happensNext = 'On correct path'; break;
    case "lower tunnel" : happensNext = 'On correct path'; break;
    case "hidden door" : happensNext = 'On mysterious path'; break;
    default: happensNext = 'On wrong path';
  }
  return happensNext;
}
gotoPath("forward hallway");

// Good Code
function gotoPath(direction){
  var happensNext;
  switch(direction) {
    case "right hallway" :
    case "left hallway" :
    case "forward hallway" :
    case "lower tunnel" : happensNext = 'On correct path'; break;
    case "hidden door" : happensNext = 'On mysterious path'; break;
    default: happensNext = 'On wrong path';
  }
  return happensNext;
}
gotoPath("forward hallway");


// ============================================================================>

// Task 3: Loop Optimization
var bitersBog = {
  critters: [
    "Nipping Global Variable", "Sneaky For-in", "Bulging Blocking Script"
  ]
};

// Bad Code
var list = "";
// too much object property accessing in each loop iteration
for(var i = 0; i < bitersBog.critters.length; i++){
  list += bitersBog.critters[i];
}

// Good Code : Cache values
var list = "";
for(var i = 0, crittersList = bitersBog.critters, length = crittersList.length; i < length; i++){
  list += crittersList[i];
}


