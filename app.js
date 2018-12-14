// Enemies funciotn which our player must avoid
var Enemy = function(x, y , speed) {
  this.x=x; //x axis position of enemy
  this.y = y +50;//y axis position of enemy
  this.speed = speed;//controls speed of enemy
  this.sprite = 'images/enemy-bug.png';
  this.xBlock =101; //From engine.js where one xBlock is of 101 px size.
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

  if (this.x < 505 ) // total canvas is 505 px wide.
  {
/* Move forward ; Increment x by speed * dt and multiply any movement by the dt parameter
which will ensure the game runs at the same speed for all computers.*/
  this.x +=this.speed * dt;
  }
else
{
  this.x =-this.xBlock ;
}
// reset pos to start
};

// DrawImage is used to draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This class requires an update(), render() and
// a handleInput() method.
class Hero {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.xBlock = 101; //x axis initial  pos for hero.
    this.yBlock =83;//Y axis initial pos for hero.
    this.firstPosX = this.xBlock * 2 ;
    this.firstPosY = (this.yBlock * 4) + 50;
    //  console.log('position of hero inside hero class' , this.firstPosY);
    this.x = this.firstPosX;
    this.y =this.firstPosY;

  }

  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

reset()
{
  this.y=this.firstPosY;
  this.x=this.firstPosX;
}

update ()
{
// Enemy collision here
for (let enemy of allEnemies)
  {
   //console.log('position of enemy' , enemy.y);
    console.log('position of hero' , this.y);
//console.log('movement of enemy at x' , enemy.x);
  //  console.log('value of  xblock' , enemy.xBlock/2);
    //console.log('value of this.x' , this.x);
    //console.log('value of this at xblock' , this.xBlock/2);
  if (this.y === enemy.y && (enemy.x + enemy.xBlock/2 > this.x && enemy.x < this.x + this.xBlock/2))
  //if (this.y === enemy.y)
      {
this.reset();

}

//check win here
//if (this.y === 50 )
//{
//  console.log('inside 50 condition');
  //console.log(this.y);
  //this.reset();
//} // win condition ends


}//for condition ends
} // update function ends
handleInput(input){

  if (this.x >0 && input === 'left') {
  this.x -=this.xBlock; //subtract the value of x to move hero to left
  }
  else if (this.x < this.xBlock * 4  && input === 'right'){
    this.x +=this.xBlock; //add the value of x to move hero to right
  }
  else if (this.y > this.yBlock && input === 'up')
  {
    this.y -=this.yBlock; //subtract the value of y to move hero to up
  }else  if (this.y  < this.yBlock * 4 && input === 'down')
  {
  this.y +=this.yBlock; //add the value of y to move hero to down
}

} // handleInput ends
} // hero class ends

//instantiate Hero and enemy objects.
const heroObject= new Hero();
const sprite1 = new Enemy(0, 0, 70);
const sprite2 = new Enemy( 0, 83, 150);
//const sprite3 = new Enemy( 01,183, 50);

const allEnemies =[]; // created an array which can hold all our Enemies
allEnemies.push(sprite1,sprite2);
//allEnemies.push(sprite1,sprite2,sprite3);

// This listens for key presses and sends the keys to your
// heroObject.handleInput() method is used to handle the key board input.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        50: 'down'
    };
    heroObject.handleInput(allowedKeys[e.keyCode]);
});
