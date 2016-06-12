function menuState(game) {
    var background = null;
    var logo = null;
    var button = null;
    this.create = function() {
        background = game.add.tileSprite(0, 0, screenWidth, screenHeight, 'main_menu_background');
        background.animations.add('flash', [0, 1], 4, true);
        background.play('flash');
        
        logo = game.add.image(screenWidth / 2, 20, 'clyde_logo');
        logo.anchor.setTo(0.5, 0);
        
        button = game.add.sprite(screenWidth / 2, screenHeight / 2, 'push_button');
        button.anchor.setTo(0.5, 0.5);
        button.inputEnabled = true;
        button.events.onInputOver.add(function () {
            button.frame = 1;
        }, this);
        button.events.onInputOut.add(function () {
            button.frame = 0;
        }, this);
        button.events.onInputUp.add(function () {
            game.state.start('main');
        })
    };
}