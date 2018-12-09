let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;
let coins;
let platforms;
let cursors;
let score = 0;
let scoreText;

let game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('dude', 'assets/elvisRun.png', { frameWidth: 32, frameHeight: 38 });
    this.load.spritesheet('coin', 'assets/coinSheet.png', { frameWidth: 8, frameHeight: 8 });
}

function create() {
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');
    player.setScale(1);
    player.setBounce(.15);
    player.setCollideWorldBounds(true);

    // Loop through sprite sheets for key actions 
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'idleRight',
        frames: [ { key: 'dude', frame: 9 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'coin',
        frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    coins = this.physics.add.group({
        key: 'coin',
        repeat: 11,
        setXY: {x: 12, y: 0, stepX: 70}
    });

    coins.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(3);
        child.anims.play('coin', true);
    });

    scoreText = this.add.text(16, 16, `score: ${score}`, {fontSize: `32px`, fill: `#000`});

    this.physics.add.collider(player, platforms);  // player and platforms can't collide 
    this.physics.add.collider(coins, platforms);
    this.physics.add.overlap(player, coins, collectCoin, null, this);
}
function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
        goingLeft = true;
        goingRight = false;
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
        goingLeft = false;
        goingRight = true;
    }
    else {
        player.setVelocityX(0);
        player.anims.play('idleRight', true);
   
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

function collectCoin(player,coin){
    coin.disableBody(true, true);

    score+= 10;
    scoreText.setText(`Score: ${score}`);
    console.log(coins.countActive());
}

function creteCoins(){
    coins.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(3);
        child.anims.play('coin', true);
    });
}