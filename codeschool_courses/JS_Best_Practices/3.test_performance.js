// Task 1: Put code snippets to start the speed performance
// Task Code
var array = [
  'Hiii,', 'this', 'is', 'a', 'simple', 'line', 'that', 'need', 'to', 'be',
  'joined', '.'
];
var internalThoughts = '';
internalThoughts = array.join(' ');
console.log(internalThoughts);

// Solution Code
// Task Code
var array = [
  'Hiii,', 'this', 'is', 'a', 'simple', 'line', 'that', 'need', 'to', 'be',
  'joined', '.'
];
var internalThoughts = '';
console.time('join');
internalThoughts = array.join(' ');
console.timeEnd('join');
console.log(internalThoughts);

// ============================================================================>
// Task 2: SpeedTest Class
// Create and run a new SpeedTest to test. Just remember, a SpeedTest does not
// start itself. Also, set default repeat as 100000 times.

// Solution Code
// SpeedTest Code
var SpeedTest = function(testImplement,testParams,repetitions){
  this.testImplement = testImplement;
  this.testParams = testParams;
  this.repetitions = repetitions || 10000;
  this.average = 0;
};

SpeedTest.prototype = {
  startTest: function(){
    if( this.testImplement( this.testParams ) === false ){
      alert("Yo, man, that test failed with those parameters.");
      return;
    }
    var beginTime, endTime, sumTimes = 0;
    for (var i = 0, x = this.repetitions; i < x; i++){
      beginTime = +new Date();
      this.testImplement( this.testParams );
      endTime = +new Date();
      sumTimes += endTime - beginTime;
    }
    this.average = sumTimes / this.repetitions;
    return console.log("Average execution across " + this.repetitions + ": " + this.average);
  }
};

// Code to test performance

var numeral = [
      "First", "Second", "Third", "Fourth", "Fifth"
    ],
    greek = ["alpha", "beta", "gamma", "theta"],
    specs = [numeral, greek];

function lister(popn){
  var list = "";
  for(var i = 0, x = popn.length; i < x; i++){
    for(var j = 0; j < popn[i].length; j++){
      list += (popn[i][j] + ", ");
    }
  }
  return list;
}
var concatTest = new SpeedTest(lister, specs, 100000);
concatTest.startTest();
