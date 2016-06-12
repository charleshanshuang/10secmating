function runningState(game) {
    var pushButton = null;
    var buttonUpTween = null;
    var boy = null;
    var fastRunner = null;
    var runTween = null;
    var awkwardLevel = 0;
    this.create = function () {
        game.stage.backgroundColor = "#4488AA";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        pushButton = game.add.sprite(screenWidth / 2, screenHeight / 2 + 100, 'push_button');
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
        runTween = game.add.tween(fastRunner);
        runTween.to({x: screenWidth}, 2000, Phaser.Easing.Linear.None, true, 0, -1);
        
        boy = game.add.sprite(30, screenHeight - 40, 'boy');
        boy.scale.setTo(2, 2);
        boy.y -= boy.height;
        game.physics.arcade.enable(boy);
        boy.frame = 3;
        game.world.sendToBack(boy);
        
        game.world.forEach(function (spr) {
            spr.smoothed = false;
        }, this);
    };
    
    this.update = function () {
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
    }
    
    function wrapUp() {
        console.log('wrapUp');
    }
}