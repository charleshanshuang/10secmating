

function mainState(game) {

var awkwardLevel = 0;
var choice1; 
var choice2;
var choice3;
var title;
var labelTitle;
var awkwardBar;
var lockers;
var girl;
var boy;
var timer;

    this.create = function() { 
        game.stage.backgroundColor = "#4488AA";

        game.physics.startSystem(Phaser.Physics.ARCADE);

        title = "SAY A LINE";
        
        labelTitle = this.game.add.text(screenWidth / 2, 20, title, { font: "30px Arial", fill: "#ffffff" });
        labelTitle.anchor.set(0.5);
        labelTitle.stroke = "#000000";
        labelTitle.strokeThickness = 6;
        labelTitle.shadowColor = "#000009";
        labelTitle.shadowOffsetX = 5;
        labelTitle.shadowOffsetY = 5;    
      
        choice1 = this.game.add.text(game.world.centerX - 95, 200, '...!', { font: "30px Arial", fill: "#ffffff" });
        choice1.inputEnabled = true;
        choice1.events.onInputUp.add(approachFemale, this);
        
        choice2 = this.game.add.text(game.world.centerX - 95, 250, 'Um...', { font: "30px Arial", fill: "#ffffff" });
        choice2.inputEnabled = true;
        choice2.events.onInputUp.add(approachFemale, this);
        
        choice3 = this.game.add.text(game.world.centerX - 95, 300, 'Eh...', { font: "30px Arial", fill: "#ffffff" });
        choice3.inputEnabled = true;
        choice3.events.onInputUp.add(approachFemale, this);
        
        
        awkwardBar = this.game.add.sprite(screenWidth / 2, 50, 'bar');
        awkwardBar.height = 50;
        awkwardBar.anchor.setTo(0.5, 0);
        
        
        lockers = game.add.tileSprite(0, 350, 800, 100, 'locker');
        lockers.scale.x = 2;
        lockers.scale.y = 2;
        
        boy = game.add.sprite(350, 400, 'boy');
        boy.animations.add('stand');
        boy.animations.play('stand', 5, true);
        boy.width = 100;
        boy.height = 160;
        
        girl = game.add.sprite(500, 400, 'girl');
        girl.animations.add('stand');
        girl.animations.play('stand', 5, true);
        girl.width = 100;
        girl.height = 160;
        
        
        incrementAwkwardLevel(10);
        timer = game.time.create(false);
        timer.loop(100, function () {
          incrementAwkwardLevel(1);
          if (awkwardLevel === 100) {
            awkwardBar.destroy();
          }
        }, this);
        timer.start();
    };
    

function approachFemale() {
    incrementAwkwardLevel(20);
}


function incrementAwkwardLevel(n) {
    awkwardLevel += n;
    var tw = game.add.tween(awkwardBar);
    tw.to({width: 600 * (awkwardLevel / 100)}, 100, Phaser.Easing.Linear.None);
    tw.start();
    awkwardBar.width = 600 * (awkwardLevel / 100);
}
};