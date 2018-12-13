var mainMenuState = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initalize: function MainMenu(){
        Phaser.Scene.call(this, {key: 'MainMenu'});
    },
    preload: function(){

    },

    create: function(){
        console.log("Preload");
        Gamepad.scene.start("MainMenu");
    },

    update: function(){

    }
});

myGame.scenes.push(mainMenuState);