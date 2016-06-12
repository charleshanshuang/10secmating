function runningState(game) {
    var pushButton = null;
    var buttonUpTween = null;
    var boy = null;
    var fastRunner = null;
    var runTween = null;
    var awkwardLevel = 10;
    var girl = null;
    var girlTween = null;
    var labelTitle = null;
    this.create = function () {
        game.stage.backgroundColor = "#4488AA";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        title = "PUMP IT UP CLYDE";
        
        labelTitle = this.game.add.text(screenWidth / 2, 20, title, { font: "30px Arial", fill: "#ffffff" });
        labelTitle.anchor.set(0.5);
        labelTitle.stroke = "#000000";
        labelTitle.strokeThickness = 6;
        labelTitle.shadowColor = "#000009";
        labelTitle.shadowOffsetX = 5;
        labelTitle.shadowOffsetY = 5;
        
        this.game.add.text(game.world.centerX - 125, 60, 'AWKWARD LEVEL', { font: "30px Comic Sans MS", fill: "#000000" });
        
        awkwardBar = this.game.add.sprite(screenWidth / 2, 100, 'bar');
        awkwardBar.height = 50;
        awkwardBar.anchor.setTo(0.5, 0);
        
        this.awkwardContainer = this.game.add.sprite(200, 100, 'container');
        this.awkwardContainer.x = screenWidth / 2 - this.awkwardContainer.width / 2;
        
        
        pushButton = game.add.sprite(screenWidth / 2, screenHeight / 2 + 20, 'push_button');
        pushButton.anchor.setTo(0.5, 0.5);
        pushButton.animations.add('flash', [0, 1], 4, true);
        pushButton.play("flash");
        pushButton.inputEnabled = true;
        pushButton.events.onInputUp.add(buttonClicked, this);
        buttonUpTween = game.add.tween(pushButton);
        buttonUpTween.to({y: 200}, 8000);
        buttonUpTween.onComplete.add(wrapUp, this);
        buttonUpTween.start();
        
        fastRunner = game.add.sprite(-100, screenHeight - 40, 'fast_runner');
        fastRunner.scale.setTo(2, 2);
        fastRunner.y -= fastRunner.height;
        fastRunner.animations.add("run", [0, 1], 5, true);
        fastRunner.play("run");
        game.physics.arcade.enable(fastRunner);
        runTween = game.add.tween(fastRunner);
        runTween.to({x: screenWidth}, 2000, Phaser.Easing.Linear.None, true, 0, -1);
        
        boy = game.add.sprite(30, screenHeight - 40, 'boy');
        boy.scale.setTo(2, 2);
        boy.y -= boy.height;
        game.physics.arcade.enable(boy);
        boy.frame = 3;
        game.world.sendToBack(boy);
        
        girl = game.add.sprite(screenWidth + 150, 400, 'girl');
        girl.scale.setTo(2, 2);
        girlTween = game.add.tween(girl);
        girlTween.to({x: screenWidth - 180}, 500, Phaser.Easing.Linear.None, true, 7500);
        
        var track = game.add.tileSprite(0, screenHeight - 200, screenWidth, 200, 'track');
        game.world.sendToBack(track);
        
        game.world.forEach(function (spr) {
            spr.smoothed = false;
        }, this);
    };
    
    this.update = function () {
        game.physics.arcade.overlap(boy, fastRunner, function (boySprite, runnerSprite) {
            awkwardLevel += .2;
        }, null, this);
        
        awkwardBar.width = 600 * (awkwardLevel / 100);
        
        if (boy.body.velocity.x > 0) {
            boy.body.velocity.x -= .7;
        } else {
            boy.body.velocity.x = 0;
        }
    };
    
    function buttonClicked() {
        if (boy.body.velocity.x < 200) {
            boy.body.velocity.x += 8;
        }
        boy.frame = (boy.frame === 3) ? 4 : 3;
        game.sound.play("grunt");
    }
    
    function wrapUp() {
        var buttonAwayTween = game.add.tween(pushButton);
        buttonAwayTween.to({x: screenWidth + 100}, 700);
        buttonAwayTween.onComplete.add(function () {
            game.state.start("end");
        }, this);
        buttonAwayTween.start();
        var awkwardTween = game.add.tween(awkwardBar);
        awkwardTween.to({width: 600}, 700);
        awkwardTween.start();
        var fallingTween = game.add.tween(boy);
        fallingTween.to({rotation: Math.PI / 2, y: boy.y + 100, x: boy.x + 200}, 500, Phaser.Easing.Quadratic.Out);
        fallingTween.start();
        game.sound.play("groan");
    }
}