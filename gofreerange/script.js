var canvas = document.querySelector("canvas");
var cxt = canvas.getContext("2d");
var Xcenter = 384/2,
    Ycenter = 384/2;

cxt.strokeStyle = "#000000";
cxt.lineWidth = 2;

function hexagon(size) {
  var numberOfSides = 6;

  cxt.beginPath();
  cxt.moveTo(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));
  for (var i = 1; i <= numberOfSides;i += 1) {
    cxt.lineTo(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
  }
  cxt.stroke();

}

function spokes() {
  var size = 384/2;
  cxt.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));

  for (var i = 1; i <= 6;i += 1) {
    cxt.beginPath();
    cxt.moveTo(Xcenter, Ycenter);
    var endX = Xcenter + size * Math.cos(i * 2 * Math.PI / 6);
    var endY = Ycenter + size * Math.sin(i * 2 * Math.PI / 6);
    cxt.lineTo(endX, endY);
    cxt.stroke();

    var branchWidthFactor = 0.4;
    var positionFactor  = 0.3;
    var spokeHeight = 60;
    var subspoke = size * positionFactor + spokeHeight;
    var spokeX = Xcenter + (endX - Xcenter)*positionFactor;
    var spokeY = Ycenter + (endY - Ycenter)*positionFactor;
    cxt.moveTo(spokeX, spokeY);
    cxt.lineTo(Xcenter + subspoke * Math.cos((i-branchWidthFactor) * 2 * Math.PI / 6),
               Ycenter + subspoke * Math.sin((i-branchWidthFactor) * 2 * Math.PI / 6));
    cxt.stroke();
    cxt.moveTo(spokeX, spokeY);
    cxt.lineTo(Xcenter + subspoke * Math.cos((i+branchWidthFactor) * 2 * Math.PI / 6),
               Ycenter + subspoke * Math.sin((i+branchWidthFactor) * 2 * Math.PI / 6));
    cxt.stroke();
  }
}

function spurs(rootStart, length, spread) {
  cxt.moveTo(0, rootStart);
  cxt.lineTo(spread, rootStart + length);
  cxt.stroke();
  cxt.moveTo(0, rootStart);
  cxt.lineTo(-spread, rootStart + length);
  cxt.stroke();
}

function randomBetween(low, high) {
  return Math.floor((Math.random()*high)+low);
}

s1a = randomBetween(30,35);
s1b = randomBetween(50,55);
s1c = randomBetween(40,50);
s2a = randomBetween(65,70);
s2b = randomBetween(35,40);
s2c = randomBetween(20,30);
s3a = randomBetween(90,100);
s3b = randomBetween(25,35);
s3c = randomBetween(15,20);
s4a = randomBetween(130,135);
s4b = randomBetween(10,20);
s4c = randomBetween(5,10);
s5a = randomBetween(145,150);
s5b = randomBetween(15,20);
s5c = randomBetween(5,7);


function spoke() {
  cxt.beginPath();
  cxt.moveTo(0, 0);
  cxt.lineTo(0, 384/2);
  cxt.stroke();

  spurs(s1a, s1b, s1c);
  spurs(s2a, s2b, s2c);
  spurs(s3a, s3b, s3c);
  spurs(s4a, s4b, s4c);
  spurs(s5a, s5b, s5c);
}

function multiSpoke() {
  for (var i = 0; i < 6; i++) {
    cxt.translate(Xcenter, Ycenter);
    cxt.rotate(Math.PI / 3);
    spoke();
    cxt.translate(-Xcenter, -Ycenter);
  }
}

multiSpoke();

cxt.translate(Xcenter, Ycenter);
cxt.rotate(Math.PI / 6);
cxt.translate(-Xcenter, -Ycenter);

function randomHexagon(size) {
  var a = randomBetween(size-5,size+5);
  var b = a + randomBetween(3,10);
  hexagon(a);
  hexagon(b);
}

randomHexagon(30);
randomHexagon(70);
randomHexagon(80);
randomHexagon(90);
