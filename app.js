/* Enemies function which our player must avoid*/
var Enemy = function(x, y, speed) {
	this.x = x; //x axis position of enemy
	this.y = y + 50; //y axis position of enemy
	this.speed = speed; //controls speed of enemy
	this.sprite = 'images/enemy-bug.png';
	this.xBlock = 101; //From engine.js where one xBlock is of 101 px size.
};

Enemy.prototype.update = function(dt) {
	if (this.x < 505) // total canvas is 505 px wide.
	{
		/* Move forward ; Increment x by speed * dt and multiply any movement by the dt parameter
		which will ensure the game runs at the same speed for all computers.*/
		this.x += this.speed * dt;
	} else {
		this.x = -this.xBlock;
	}
};

/* Function to render the images on the screen where DrawImage is used to draw the enemy on the screen */
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* This is a hero class i.e our player with initial settings and a render fucntion which is used to
draw the player on the screen */
class Hero {
	constructor() {
		this.sprite = 'images/char-boy.png';
		this.xBlock = 101; //x axis initial  pos for hero.
		this.yBlock = 83; //Y axis initial pos for hero.
		this.firstPosX = this.xBlock * 2;
		this.firstPosY = (this.yBlock * 4) + 50;
		this.x = this.firstPosX;
		this.y = this.firstPosY;
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	/* Reset function will be callled to reset user to initial position
	once hero reaches water i.e. Winning Conditon or when player got caught by sprite */
	reset() {
		this.y = this.firstPosY;
		this.x = this.firstPosX;
	}
	/* Function to control the hit by enemy */
	update() {
		for (let enemy of allEnemies) {
			if (this.y === enemy.y && (enemy.x + enemy.xBlock / 2 > this.x && enemy.x < this.x + this.xBlock / 2)) {
				this.reset();
			}
		} //for condition ends
	} // update function ends
	/* Function to conrol the keyboard input by theuser */
	handleInput(input) {
		/* This condition is for the win*/
		if (this.y === 50 && input === 'up') {
			this.reset();
		}
		if (this.x > 0 && input === 'left') {
			this.x -= this.xBlock; //subtract the value of x to move hero to left
		} else if (this.x < this.xBlock * 4 && input === 'right') {
			this.x += this.xBlock; //add the value of x to move hero to right
		} else if (this.y > this.yBlock && input === 'up') {
			this.y -= this.yBlock; //subtract the value of y to move hero to up
		} else if (this.y < this.yBlock * 4 && input === 'down') {
			this.y += this.yBlock; //add the value of y to move hero to down
		}
	} // handleInput ends
} // hero class ends
//instantiate Hero and enemy objects.
const heroObject = new Hero();
const sprite1 = new Enemy(0, 0, 120);
const sprite2 = new Enemy(0, 83, 200);
const sprite3 = new Enemy(0, 83, 130);

const allEnemies = []; // created an array which can hold all our Enemies
allEnemies.push(sprite1, sprite2,sprite3);
// This listens for key presses and sends the keys to your
// heroObject.handleInput() method is used to handle the key board input.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	heroObject.handleInput(allowedKeys[e.keyCode]);
});
