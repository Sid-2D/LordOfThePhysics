var LoTP = LoTP || {};

LoTP.lSelect = function() {};

LoTP.lSelect.prototype = {
    
    preload: function () {
        
        mode = "lS";
        this.back = this.add.sprite(this.world.centerX,this.world.centerY,"back");
        this.back.anchor.setTo(0.5,0.5);
        
        this.btn1 = this.add.sprite(100,250,'1');
        this.btn1.anchor.setTo(0.5,0.5);
        this.btn1.inputEnabled = true;
        this.btn1.events.onInputDown.add(this.listener1,this);
        
        this.btn2 = this.add.sprite(250,250,'2');
        this.btn2.anchor.setTo(0.5,0.5);
        this.btn2.inputEnabled = true;
        this.btn2.events.onInputDown.add(this.listener2,this);
        
        this.btn3 = this.add.sprite(400,250,'3');
        this.btn3.anchor.setTo(0.5,0.5);
        this.btn3.inputEnabled = true;
        this.btn3.events.onInputDown.add(this.listener3,this);
        
        this.btn4 = this.add.sprite(550,250,'4');
        this.btn4.anchor.setTo(0.5,0.5);
        this.btn4.inputEnabled = true;
        this.btn4.events.onInputDown.add(this.listener4,this);
        
        this.btn5 = this.add.sprite(700,250,'5');
        this.btn5.anchor.setTo(0.5,0.5);
        this.btn5.inputEnabled = true;
        this.btn5.events.onInputDown.add(this.listener5,this);
        
        this.btn6 = this.add.sprite(850,250,'6');
        this.btn6.anchor.setTo(0.5,0.5);
        this.btn6.inputEnabled = true;
        this.btn6.events.onInputDown.add(this.listener6,this);
        
        this.btn7 = this.add.sprite(1000,250,'7');
        this.btn7.anchor.setTo(0.5,0.5);
        this.btn7.inputEnabled = true;
        this.btn7.events.onInputDown.add(this.listener7,this);
        
        this.btn8 = this.add.sprite(1150,250,'8');
        this.btn8.anchor.setTo(0.5,0.5);
        this.btn8.inputEnabled = true;
        this.btn8.events.onInputDown.add(this.listener8,this);
        
        this.btn9 = this.add.sprite(100,450,'9');
        this.btn9.anchor.setTo(0.5,0.5);
        this.btn9.inputEnabled = true;
        this.btn9.events.onInputDown.add(this.listener9,this);
        
        this.btn10 = this.add.sprite(250,450,'10');
        this.btn10.anchor.setTo(0.5,0.5);
        this.btn10.inputEnabled = true;
        this.btn10.events.onInputDown.add(this.listener10,this);
        
        this.bk = this.add.sprite(400,450,'bk');
        this.bk.anchor.setTo(0.5,0.5);
        this.bk.inputEnabled = true;
        this.bk.events.onInputDown.add(this.lBk,this);
    },
    lBk: function() {
        mode = "mainGame";
        this.game.state.start('menu');
    },
    listener1: function() {
        this.game.state.start('level1');
    },
    listener2: function() {
        this.game.state.start('level2');
    },
    listener3: function() {
        this.game.state.start('level3');
    },
    listener4: function() {
        this.game.state.start('level4');
    },
    listener5: function() {
        this.game.state.start('level5');
    },
    listener6: function() {
        this.game.state.start('level6');
    },
    listener7: function() {
        this.game.state.start('level7');
    },
    listener8: function() {
        this.game.state.start('level8');
    },
    listener9: function() {
        this.game.state.start('level9');
    },
    listener10: function() {
        this.game.state.start('level10');
    }
};