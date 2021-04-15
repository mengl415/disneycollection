const colors = ["#B9F1FF", "#CD7DFF", "#B7BAFF", "#B6FFE0", "#FFFFFF"];

const numBalls = 50;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100) - 10}vw`;
  ball.style.top = `${Math.floor(Math.random() * 100) - 20}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;
  
  balls.push(ball);
  document.body.append(ball);
}

// Keyframes
balls.forEach((el, i, ra) => {
  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12
  };

  let anim = el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` }
    ],
    {
      duration: (Math.random() + 1) * 2000, // random duration
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
});


function RandomObjectMover(obj, container) {
	this.$object = obj;
  this.$container = container;
  this.container_is_window = container === window;
  this.pixels_per_second = 175;
  this.current_position = { x: 0, y: 0 };
  this.is_running = false;
}

/*// Set the speed of movement in Pixels per Second.
RandomObjectMover.prototype.setSpeed = function(pxPerSec) {
	this.pixels_per_second = pxPerSec;
}*/

RandomObjectMover.prototype._getContainerDimensions = function() {
   if (this.$container === window) {
       return { 'height' : this.$container.innerHeight, 'width' : this.$container.innerWidth };
   } else {
   	   return { 'height' : this.$container.clientHeight, 'width' : this.$container.clientWidth };
   }
}

RandomObjectMover.prototype._generateNewPosition = function() {

	// Get container dimensions minus div size
  var containerSize = this._getContainerDimensions();
	var availableHeight = containerSize.height - this.$object.clientHeight;
  var availableWidth = containerSize.width - this.$object.clientHeight;
    
  // Pick a random place in the space
  var y = Math.floor(Math.random() * availableHeight);
  var x = Math.floor(Math.random() * availableWidth);
    
  return { x: x, y: y };    
}

RandomObjectMover.prototype._calcDelta = function(a, b) {
	var dx   = a.x - b.x;         
  var dy   = a.y - b.y;         
  var dist = Math.sqrt( dx*dx + dy*dy ); 
  return dist;
}

RandomObjectMover.prototype._moveOnce = function() {
		// Pick a new spot on the page
    var next = this._generateNewPosition();
    
    // How far do we have to move?
    var delta = this._calcDelta(this.current_position, next);
    
		// Speed of this transition, rounded to 2DP
		var speed = Math.round((delta / this.pixels_per_second) * 100) / 100;
    
    //console.log(this.current_position, next, delta, speed);
          
    this.$object.style.transition='transform '+speed+'s linear';
    this.$object.style.transform='translate3d('+next.x+'px, '+next.y+'px, 0)';
    
    // Save this new position ready for the next call.
    this.current_position = next;
  
};

RandomObjectMover.prototype.start = function() {

	if (this.is_running) {
  	return;
  }

	// Make sure our object has the right css set
  this.$object.willChange = 'transform';
  this.$object.pointerEvents = 'auto';
	
  this.boundEvent = this._moveOnce.bind(this)
  
  // Bind callback to keep things moving
  this.$object.addEventListener('transitionend', this.boundEvent);
  
  // Start it moving
  this._moveOnce();
  
  this.is_running = true;
}

RandomObjectMover.prototype.stop = function() {

	if (!this.is_running) {
  	return;
  }
  
  this.$object.removeEventListener('transitionend', this.boundEvent);
  
	this.is_running = false;
}


// Init it
var circleGC = new RandomObjectMover(document.getElementById('circleGucciC'), window);
var circleCC = new RandomObjectMover(document.getElementById('circleCoachC'), window);
var circleELC = new RandomObjectMover(document.getElementById('circleELC'), window);
var circlePC = new RandomObjectMover(document.getElementById('circlePandoraC'), window);
var circleP2C = new RandomObjectMover(document.getElementById('circlePandora2C'), window);
var circleZC = new RandomObjectMover(document.getElementById('circleZaraC'), window);


/*
// Toolbar stuff
document.getElementById('start').addEventListener('click', function(){
	circleU.start();
  circleC.start();
});
document.getElementById('stop').addEventListener('click', function(){
	circleU.stop();
  circleC.stop();
});
document.getElementById('speed').addEventListener('keyup', function(){
  if (parseInt(this.value) > 3000 ) {
 		alert('Don\'t be stupid, stupid');
    this.value = 250;
  }
	circleU.setSpeed(parseInt(this.value));
  circleC.setSpeed(parseInt(this.value));
});*/


// Start it off

circleGC.start(); 
circleCC.start();
circleELC.start(); 
circlePC.start();
circleP2C.start();
circleZC.start();


document.getElementById("circleGucciC").addEventListener("mouseover", function(){
  circleGC.stop();
});
document.getElementById("circleGucciC").addEventListener("mouseout", function(){
  circleGC.start();
});



document.getElementById("circleCoachC").addEventListener("mouseover", function(){
  circleCC.stop();
});
document.getElementById("circleCoachC").addEventListener("mouseout", function(){
  circleCC.start();
});



document.getElementById("circleELC").addEventListener("mouseover", function(){
  circleELC.stop();
});
document.getElementById("circleELC").addEventListener("mouseout", function(){
  circleELC.start();
});



document.getElementById("circlePandoraC").addEventListener("mouseover", function(){
  circlePC.stop();
});
document.getElementById("circlePandoraC").addEventListener("mouseout", function(){
  circlePC.start();
});



document.getElementById("circlePandora2C").addEventListener("mouseover", function(){
  circleP2C.stop();
});
document.getElementById("circlePandora2C").addEventListener("mouseout", function(){
  circleP2C.start();
});



document.getElementById("circleZaraC").addEventListener("mouseover", function(){
  circleZC.stop();
});
document.getElementById("circleZaraC").addEventListener("mouseout", function(){
  circleZC.start();
});


