var screenWidth = 800;
var screenHeight = 600;

var awkwardLevel = 0;
var choice1; 

var mainState = {

    init: function() {
    
    },
    
    
    preload: function() { 
        game.load.image('bar', 'assets/visual/awkward_bar.png');
    },

    create: function() { 
        game.stage.backgroundColor = "#4488AA";

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.title = "APPRAOCH THE FEMALE!";
        
        this.labelTitle = this.game.add.text(screenWidth / 2, 20, this.title, { font: "30px Arial", fill: "#ffffff" });
        this.labelTitle.anchor.set(0.5);
        this.labelTitle.stroke = "#000000";
        this.labelTitle.strokeThickness = 6;
        this.labelTitle.shadowColor = "#000009";
        this.labelTitle.shadowOffsetX = 5;
        this.labelTitle.shadowOffsetY = 5;    
      
        choice1 = this.game.add.text(game.world.centerX - 95, 400, '...', { font: "30px Arial", fill: "#ffffff" });
        choice1.inputEnabled = true;
        choice1.events.onInputUp.add(approachFemale, this);
        
        this.awkwardBar = this.game.add.sprite(screenWidth / 2, 50, 'bar');
        this.awkwardBar.height = 50;
        
        incrementAwkwardLevel(10);
        
    },
    
    update: function() {
        
    },


    restartGame: function() {
        game.state.start('main');
    },
    
};

function approachFemale() {
    this.labelTitle.text = "FEMALE APPRAOCHED!";
    incrementAwkwardLevel(20);
}


function incrementAwkwardLevel(n) {
    awkwardLevel += n;
    mainState.awkwardBar.width = 600 * (n / 100);
}

var game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, 'gameDiv');

game.state.add('main', mainState);  
game.state.start('main'); 