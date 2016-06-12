function hifiveState(game) {
    var awkwardLevel = 0;
    var title;
    var labelTitle;
    var awkwardBar;
    var girl;
    var girlhand;
    var girlTween;
    var boy;
    var boyhand;
    var timer;
    var playing;

    this.create = function() {
        game.stage.backgroundColor = "#4488AA";

        game.physics.startSystem(Phaser.Physics.ARCADE);

        title = "LET'S HI FIVE AMELIA";
        
        labelTitle = this.game.add.text(screenWidth / 2, 20, title, { font: "30px Arial", fill: "#ffffff" });
        labelTitle.anchor.set(0.5);
        labelTitle.stroke = "#000000";
        labelTitle.strokeThickness = 6;
        labelTitle.shadowColor = "#000009";
        labelTitle.shadowOffsetX = 5;
        labelTitle.shadowOffsetY = 5;      
        
        // Awkward Bar
        awkwardTitle = this.game.add.text(game.world.centerX - 125, 60, 'AWKWARD LEVEL', { font: "30px Comic Sans MS", fill: "#000000" });
        
        awkwardBar = this.game.add.sprite(screenWidth / 2, 100, 'bar');
        awkwardBar.height = 50;
        awkwardBar.anchor.setTo(0.5, 0);
        
        this.awkwardContainer = this.game.add.sprite(200, 100, 'container');
        this.awkwardContainer.x = screenWidth / 2 - this.awkwardContainer.width / 2;
        
        girl = game.add.sprite(600, 300, 'girl_face');
        girl.animations.add('face', [0]);
        girl.animations.add('ouch', [1]);
        girl.animations.play('face');
        girl.width = 200;
        girl.height = 300;
        
        boyhand = game.add.sprite(350, 300, 'hand');
        boyhand.anchor.y = 0.5;
        boyhand.width = 75;
        boyhand.height = 200;
        boyhand.scale.x *= -1;
        
        girlhand = game.add.sprite(500, 400, 'hand');
        girlhand.anchor.y = 0.5;
        girlhand.width = 75;
        girlhand.height = 200;
        
        girlTween = game.add.tween(girlhand);
        girlTween.to({x: 400}, 800, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
        
        boy = game.add.sprite(20, 300, 'boy_face');
        boy.animations.add('face', [0]);
        boy.animations.add('oh', [1]);
        boy.animations.play('face');
        boy.width = 200;
        boy.height = 300;
        
        sweat = game.add.emitter(0, 0, 20);
        sweat.makeParticles('sweat');
        sweat.gravity = 300;
        
        incrementAwkwardLevel(10);
        timer = game.time.create(false);
        timer.loop(100, function () {
          incrementAwkwardLevel(1);
        }, this);
        timer.start();
        
        playing = true;
        
        game.world.forEach(function (spr) {
            spr.smoothed = false;
        }, this);
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
        playHitFace();
    };
    
    function playHitFace() {
        var tw = game.add.tween(boyhand);
        tw.to({x: 600, y: 350}, 1000, Phaser.Easing.Cubic.None);
        tw.onComplete.add(girlRun);
        tw.start();
    }
    
    function girlRun() {
        girl.animations.play('ouch');
        boy.animations.play('oh');
        
        var tw = game.add.tween(girl);
        tw.to({x: 1000}, 2000, Phaser.Easing.Linear.None);
        tw.onComplete.add(function () {
            game.state.start('running');
        }, this);
        tw.start();
    }
    
    this.update = function() {
        updateBoyHand();
    }
    
    function updateBoyHand() {
        if (playing) {
            boyhand.x = game.input.mousePointer.x;
            boyhand.y = game.input.mousePointer.y;
            sweat.x = boyhand.x;
            sweat.y = boyhand.y;   
        }
    }
};
