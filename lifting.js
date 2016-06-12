function liftingState(game) {
    var leftArm = null;
    var rightArm = null;
    var lifterBody = null;
    var gruntFace = null;
    var barbell = null;
    var button = null;
    var awkwardBar = null;
    var barStopper = null;
    var pushButton = null;
    var buttonUpTween = null;
    var awkwardLevel = 30;
    var initialHeight = 0;
    var timesUp = false;
    this.create = function () {
        game.stage.backgroundColor = "#4488AA";

        game.physics.startSystem(Phaser.Physics.ARCADE);
      
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
      
        barStopper = game.add.sprite(lifterBody.x, lifterBody.y + 100, 'sweat');
        barStopper.visible = false;
        game.physics.arcade.enable(barStopper);
        barStopper.body.immovable = true;
        
        pushButton = game.add.sprite(screenWidth / 2, screenHeight / 2 + 100, 'button');
        pushButton.anchor.setTo(0.5, 0.5);
        pushButton.inputEnabled = true;
        pushButton.events.onInputUp.add(function () {
                barbell.body.velocity.y = -20;
        }, this);
        buttonUpTween = game.add.tween(pushButton);
        buttonUpTween.to({y: 200}, 5000);
        buttonUpTween.onComplete.add(wrapUp, this);
        buttonUpTween.start();
        
        awkwardBar = this.game.add.sprite(screenWidth / 2, 50, 'bar');
        awkwardBar.height = 50;
        awkwardBar.anchor.setTo(0.5, 0);
        
        this.awkwardContainer = this.game.add.sprite(200, 50, 'container');
        this.awkwardContainer.x = screenWidth / 2 - this.awkwardContainer.width / 2;
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
        buttonAwayTween.start();
        var awkwardTween = game.add.tween(awkwardBar);
        awkwardTween.to({width: 600}, 500);
        awkwardTween.start();
        barStopper.body.y = screenHeight;
        barbell.body.gravity.y = 500;
    }
}