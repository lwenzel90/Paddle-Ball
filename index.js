// let game = new Phaser.Game(800, 600, Phaser.CANVAS, 'paddle-ball', {preload: preload,
//     create: create, update: update});

let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

let game = new Phaser.Game(config);

function preload (){
    this.load.setBaseURL('http://labs.phaser.io');
    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
}
function create (){
    this.add.image(400, 300, 'sky');
    let particles = this.add.particles('red');
    let emitter = particles.createEmitter({
        speed: 2,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });
    let logo = this.physics.add.image(400, 100, 'logo');
    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);
    emitter.startFollow(logo);
}