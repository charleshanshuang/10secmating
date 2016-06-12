function beesState(game) {
    var awkwardLevel = 0;
    var choice1; 
    var choice2;
    var choice3;
    var title;
    var labelTitle;
    var awkwardBar;
    var girl;
    var hand;
    var flowers;
    var bees;
    var timer;
    var sweat;

    this.create = function() {
        game.stage.backgroundColor = "#4488AA";

        game.physics.startSystem(Phaser.Physics.ARCADE);

        title = "WHAT'S WITH THESE FLOWERS, CLYDE";
        
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
        
        flowers = game.add.sprite(100, 200, 'flowers');
        flowers.width = 100;
        flowers.height = 400;
        
        
        hand = game.add.sprite(350, 300, 'hand');
        hand.anchor.y = 0.5;
        hand.width = 75;
        hand.height = 200;
        
        girl = game.add.sprite(500, 200, 'girl_face');
        girl.width = 400;
        girl.height = 500;
        
        bumps = game.add.group();
        
        bees = game.add.emitter(100, 350, 200);
        bees.makeParticles('bee');
        bees.setXSpeed(200, 300);
        bees.setYSpeed(-50, 50);
        bees.height = 300;  
        bees.gravity = 5;
        bees.start(false, 3000, 100);
        bees.setScale(1, 2, 1, 2);
        bees.setRotation(0,0);
        
        bees.on = true;
        
        sweat = game.add.emitter(375, 420, 20);
        //hand.addChild(sweat);
        sweat.makeParticles('sweat');
        sweat.gravity = 300;
        
        incrementAwkwardLevel(10);
        timer = game.time.create(false);
        timer.loop(200, function () {
          incrementAwkwardLevel(1);
        }, this);
        timer.start();
        
        game.physics.enable( [ bees, girl, hand ], Phaser.Physics.ARCADE);
        
        girl.body.immovable = true;
        hand.body.immovable = true;
        
        hand.y = 75;
        hand.body.width = 50;
        hand.body.height = 50;
        
        girl.body.setSize(400, 400, 100, 0);
        
        game.world.forEach(function (spr) {
            spr.smoothed = false;
        }, this);
    };
    
    function approachFemale() {
        incrementAwkwardLevel(20);
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
            awkwardBar.destroy();
        }
    };
    
    
    function onMaxAwkwardness() {
        // do stuff
        console.log("MAX AWKWARDNESS");
        playPayoff();
    };
    
    function playPayoff() {
        var tw = game.add.tween(girl);
        tw.to({x: 1000}, 2000, Phaser.Easing.Linear.None);
        tw.onComplete.add(function () {
            game.state.start('lifting');
        }, this);
        tw.start();
        
        bumps.destroy();
        sweat.destroy();
        bees.destroy();
    };
    
    this.update = function() {
        updateHand();
        game.physics.arcade.collide(bees, girl, null, onBeesGirlOverlap, this);
        game.physics.arcade.collide(bees, hand, null, onBeesHandOverlap, this);
    }
    
    function onBeesGirlOverlap(girl, bee) {
        var bump = bumps.create(bee.x - girl.x, bee.y - girl.y, 'bump');
        bump.scale.x = 0.1;
        bump.scale.y = 0.1;
        bump.x *= bump.scale.x;
        bump.y *= bump.scale.y;
        
        girl.addChild(bump);
        bee.destroy();
        incrementAwkwardLevel(2);
    }
    
    function onBeesHandOverlap(hand, bee) {
        bee.destroy();
    }
    
    function updateHand() {
        hand.y = game.input.mousePointer.y;
    }
};
