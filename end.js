var awkwardLevel = 100;

function endState(game) {
    this.create = function() {
        game.stage.backgroundColor = "#4488AA";
        
        var poster = game.add.sprite(screenWidth / 2, screenHeight / 2, 'poster');
        
        poster.anchor.x = 0.5;
        poster.anchor.y = 0.5;
        
        
        title = "GOOD JOB CLYDE";
        
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
        awkwardBar.width = 600 * (awkwardLevel / 100);
        
        this.awkwardContainer = this.game.add.sprite(200, 100, 'container');
        this.awkwardContainer.x = screenWidth / 2 - this.awkwardContainer.width / 2;
        
        
        instructions = this.game.add.text(screenWidth / 2, 200, "CLICK ON MR. WIGGLES TO RESTART", { font: "30px Arial", fill: "#ffffff" });
        instructions.anchor.set(0.5);
        instructions.stroke = "#000000";
        instructions.strokeThickness = 6;
        instructions.shadowColor = "#000009";
        instructions.shadowOffsetX = 5;
        instructions.shadowOffsetY = 5;      
        
        poster.inputEnabled = true;
        poster.events.onInputUp.add(meow, this);
    };
    
    function meow() {
        game.state.start('menu');
    };
    
};
