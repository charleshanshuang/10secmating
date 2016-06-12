function runningState(game) {
    var pushButton = null;
    var buttonUpTween = null;
    var boy = null;
    this.create = function () {
        game.stage.backgroundColor = "#4488AA";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        pushButton = game.add.sprite(screenWidth / 2, screenHeight / 2 + 100, 'push_button');
        pushButton.anchor.setTo(0.5, 0.5);
        pushButton.animations.add('flash', [0, 1], 4, true);
        pushButton.play();
        pushButton.inputEnabled = true;
        pushButton.events.onInputUp.add(buttonClicked, this);
        buttonUpTween = game.add.tween(pushButton);
        buttonUpTween.to({y: 200}, 8000);
        //buttonUpTween.onComplete.add(wrapUp, this);
        buttonUpTween.start();
        
        
    };
    
    function buttonClicked() {
        console.log('buttonClicked');
    }
}