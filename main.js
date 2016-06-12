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
    var sweat;
    var playing;

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
      
        choice1 = this.game.add.text(game.world.centerX - 95, 50, '...!', { font: "30px Arial", fill: "#ffffff" });
        choice1.inputEnabled = true;
        choice1.events.onInputUp.add(approachFemale, this);
        
        choice2 = this.game.add.text(game.world.centerX - 95, 100, 'Um...', { font: "30px Arial", fill: "#ffffff" });
        choice2.inputEnabled = true;
        choice2.events.onInputUp.add(approachFemale, this);
        
        choice3 = this.game.add.text(game.world.centerX - 95, 150, 'Eh...', { font: "30px Arial", fill: "#ffffff" });
        choice3.inputEnabled = true;
        choice3.events.onInputUp.add(approachFemale, this);
        
        
        awkwardTitle = this.game.add.text(game.world.centerX - 125, 210, 'AWKWARD LEVEL', { font: "30px Comic Sans MS", fill: "#000000" });
        
        awkwardBar = this.game.add.sprite(screenWidth / 2, 250, 'bar');
        awkwardBar.height = 50;
        awkwardBar.anchor.setTo(0.5, 0);
        
        this.awkwardContainer = this.game.add.sprite(200, 250, 'container');
        this.awkwardContainer.x = screenWidth / 2 - this.awkwardContainer.width / 2;
        
        lockers = game.add.tileSprite(0, 350, 800, 100, 'locker');
        lockers.scale.x = 2;
        lockers.scale.y = 2;
        
        boy = game.add.sprite(350, 400, 'boy');
        boy.animations.add('stand', [0], 5);
        boy.animations.add('bob', [0,1,2], 5, true);
        boy.animations.add('run', [3,4], 5, true);
        boy.animations.play('bob');
        boy.width = 100;
        boy.height = 160;
        
        girl = game.add.sprite(500, 400, 'girl');
        girl.animations.add('bob', [0,1,2], 5);
        girl.animations.add('stand', [0], 5);
        girl.animations.play('bob');
        girl.width = 100;
        girl.height = 160;
        
        sweat = game.add.emitter(375, 420, 20);
        sweat.makeParticles('sweat');
        sweat.gravity = 300;
        
        incrementAwkwardLevel(10);
        timer = game.time.create(false);
        timer.loop(100, function () {
          incrementAwkwardLevel(1);
        }, this);
        timer.start();
        
        game.world.forEach(function (spr) {
            spr.smoothed = false;
        }, this);
        
        playing = true;
    };
    
    function approachFemale(choice) {
        if (playing){
            incrementAwkwardLevel(20);
            choice.destroy();
        }
    };
    
    function incrementAwkwardLevel(n) {
        awkwardLevel += n;
        if (awkwardLevel >= 100) {
            awkwardLevel = 100;
            onMaxAwkwardness();
        }
        var tw = game.add.tween(awkwardBar);
        tw.to({width: 600 * (awkwardLevel / 100)}, 100, Phaser.Easing.Linear.None);
        tw.start();
        awkwardBar.width = 600 * (awkwardLevel / 100);
        
        
        if (!sweat.on && awkwardLevel > 30) {
            sweat.start(false, 1000, 10);
            sweat.on = true;
        }
        
        if (sweat.on && awkwardLevel > 60) {
            sweat.maxParticles = 100;
            sweat.frequency = 1;
            
        }
        
        if (awkwardLevel === 100) {
            timer.stop();
        }
    };
    
    
    function onMaxAwkwardness() {
        // do stuff
        console.log("MAX AWKWARDNESS");
        playPayoff();
    };
    
    function playPayoff() {
        playing = false;
        
        boy.animations.play('run');
        boy.scale.x *= -1;
        sweat.destroy();
        girl.play('stand');
        var tw = game.add.tween(boy);
        tw.to({x: -200}, 2000, Phaser.Easing.Linear.None);
        tw.onComplete.add(onCompletePayoff);
        tw.start();
    };
    
    function onCompletePayoff() {
        awkwardBar.destroy();
        game.state.start("bees");
    }
};
