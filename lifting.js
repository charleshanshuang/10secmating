function liftingState(game) {
    var leftArm = null;
    var rightArm = null;
    var lifterBody = null;
    var gruntFace = null;
    var barbell = null;
    var coolBarbell = null;
    var labelTitle = null;
    var button = null;
    var awkwardBar = null;
    var barStopper = null;
    var pushButton = null;
    var buttonUpTween = null;
    var girl = null;
    var girlTween = null;
    var awkwardLevel = 30;
    var initialHeight = 0;
    var timesUp = false;
    var coolLoop = null;
    this.create = function () {
        game.stage.backgroundColor = "#4488AA";

        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        title = "GETTIN SWOLE";
        
        labelTitle = this.game.add.text(screenWidth / 2, 20, title, { font: "30px Arial", fill: "#ffffff" });
        labelTitle.anchor.set(0.5);
        labelTitle.stroke = "#000000";
        labelTitle.strokeThickness = 6;
        labelTitle.shadowColor = "#000009";
        labelTitle.shadowOffsetX = 5;
        labelTitle.shadowOffsetY = 5;      
        
        awkwardTitle = this.game.add.text(game.world.centerX - 125, 60, 'AWKWARD LEVEL', { font: "30px Comic Sans MS", fill: "#000000" });
        
        awkwardBar = this.game.add.sprite(screenWidth / 2, 100, 'bar');
        awkwardBar.height = 50;
        awkwardBar.anchor.setTo(0.5, 0);
        
        this.awkwardContainer = this.game.add.sprite(200, 100, 'container');
        this.awkwardContainer.x = screenWidth / 2 - this.awkwardContainer.width / 2;
        
      
        lifterBody = game.add.sprite(screenWidth / 2, screenHeight - 20, 'lifter_body');
        lifterBody.anchor.setTo(0.5, 0);
        lifterBody.scale.setTo(2, 2);
        lifterBody.y -= lifterBody.height;

        leftArm = game.add.sprite(lifterBody.x - 30, lifterBody.y + 100, 'lifter_arm');
        leftArm.scale.setTo(2, 2);
        leftArm.rotation = 3 * Math.PI / 2;

        rightArm = game.add.sprite(lifterBody.x + 10, lifterBody.y + 100, 'lifter_arm');
        rightArm.scale.setTo(2, 2);
        rightArm.rotation = 3 * Math.PI / 2;
      
        barbell = game.add.sprite(lifterBody.x, leftArm.y - 120, 'lame_barbell');
        barbell.anchor.setTo(0.5, 0);
        barbell.scale.setTo(2, 2);
        game.physics.arcade.enable(barbell);
        barbell.body.gravity.y = 150;
        game.world.sendToBack(leftArm);
        game.world.sendToBack(rightArm);
        game.world.sendToBack(barbell);
        initialHeight = barbell.y;
        
        coolBarbell = game.add.sprite(-220, 350, 'barbell');
        coolBarbell.scale.setTo(2, 2);
        coolLoop = game.add.tween(coolBarbell);
        coolLoop.to({y: 420}, 800, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
      
        barStopper = game.add.sprite(lifterBody.x, lifterBody.y + 100, 'sweat');
        barStopper.visible = false;
        game.physics.arcade.enable(barStopper);
        barStopper.body.immovable = true;
        
        pushButton = game.add.sprite(screenWidth / 2, screenHeight / 2 + 100, 'push_button');
        pushButton.anchor.setTo(0.5, 0.5);
        pushButton.animations.add('flash', [0, 1], 4, true);
        pushButton.play("flash");
        pushButton.inputEnabled = true;
        pushButton.events.onInputUp.add(function () {
                barbell.body.velocity.y = -20;
        }, this);
        buttonUpTween = game.add.tween(pushButton);
        buttonUpTween.to({y: 200}, 8000);
        buttonUpTween.onComplete.add(wrapUp, this);
        buttonUpTween.start();
        
        girl = game.add.sprite(screenWidth + 150, 400, 'girl');
        girl.scale.setTo(2, 2);
        girlTween = game.add.tween(girl);
        girlTween.to({x: screenWidth - 180}, 500, Phaser.Easing.Linear.None, true, 7500);
        
        game.world.forEach(function (spr) {
            spr.smoothed = false;
        }, this);
    };
  
    this.update = function () {
        game.physics.arcade.collide(barbell, barStopper);
        if (!timesUp) {
            leftArm.y = barbell.y + 140;
            rightArm.y = barbell.y + 140;

            awkwardLevel = 30 - (initialHeight - barbell.y);
            awkwardBar.width = 600 * (awkwardLevel / 100);
        }
    };
    
    function wrapUp() {
        timesUp = true;
        var buttonAwayTween = game.add.tween(pushButton);
        buttonAwayTween.to({x: screenWidth + 100}, 500);
        buttonAwayTween.onComplete.add(onPayoffComplete);
        buttonAwayTween.start();
        var awkwardTween = game.add.tween(awkwardBar);
        awkwardTween.to({width: 600}, 500);
        awkwardTween.start();
        barStopper.body.y = screenHeight;
        barbell.body.gravity.y = 500;
    };
    
    function onPayoffComplete() {
        game.state.start('hifive');
    }
}