var screenWidth = 800;
var screenHeight = 600;

var awkwardLevel = 0;
var choice1; 
var choice2;
var choice3;

var mainState = {

    init: function() {
    
    },
    
    
    preload: function() { 
        game.load.image('bar', 'assets/visual/awkward_bar.png');
        game.load.image('locker', 'assets/visual/locker.png');
        game.load.spritesheet('boy', 'assets/visual/boy.png', 50, 80, 3);
        game.load.spritesheet('girl', 'assets/visual/girl.png', 50, 80, 3);
    },

    create: function() { 
        game.stage.backgroundColor = "#4488AA";

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.title = "SAY A LINE";
        
        this.labelTitle = this.game.add.text(screenWidth / 2, 20, this.title, { font: "30px Arial", fill: "#ffffff" });
        this.labelTitle.anchor.set(0.5);
        this.labelTitle.stroke = "#000000";
        this.labelTitle.strokeThickness = 6;
        this.labelTitle.shadowColor = "#000009";
        this.labelTitle.shadowOffsetX = 5;
        this.labelTitle.shadowOffsetY = 5;    
      
        choice1 = this.game.add.text(game.world.centerX - 95, 200, '...!', { font: "30px Arial", fill: "#ffffff" });
        choice1.inputEnabled = true;
        choice1.events.onInputUp.add(approachFemale, this);
        
        choice2 = this.game.add.text(game.world.centerX - 95, 250, 'Um...', { font: "30px Arial", fill: "#ffffff" });
        choice2.inputEnabled = true;
        choice2.events.onInputUp.add(approachFemale, this);
        
        choice3 = this.game.add.text(game.world.centerX - 95, 300, 'Eh...', { font: "30px Arial", fill: "#ffffff" });
        choice3.inputEnabled = true;
        choice3.events.onInputUp.add(approachFemale, this);
        
        
        this.awkwardBar = this.game.add.sprite(screenWidth / 2, 50, 'bar');
        this.awkwardBar.height = 50;
        
        
        this.lockers = game.add.tileSprite(0, 350, 800, 100, 'locker');
        this.lockers.scale.x = 2;
        this.lockers.scale.y = 2;
        
        this.boy = game.add.sprite(350, 400, 'boy');
        this.boy.animations.add('stand');
        this.boy.animations.play('stand', 5, true);
        this.boy.width = 100;
        this.boy.height = 160;
        
        this.girl = game.add.sprite(500, 400, 'girl');
        this.girl.animations.add('stand');
        this.girl.animations.play('stand', 5, true);
        this.girl.width = 100;
        this.girl.height = 160;
        
        
        incrementAwkwardLevel(10);
        
    },
    
    update: function() {
        
    },


    restartGame: function() {
        game.state.start('main');
    },
    
};

function approachFemale() {
    incrementAwkwardLevel(20);
}


function incrementAwkwardLevel(n) {
    awkwardLevel += n;
    mainState.awkwardBar.width = 600 * (awkwardLevel / 100);
    mainState.awkwardBar.x = screenWidth / 2 - mainState.awkwardBar.width / 2;
}

var game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, 'gameDiv');

game.state.add('main', mainState);  
game.state.start('main'); 