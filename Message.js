var LoTP = LoTP || {};

LoTP.Msg = function() {};

LoTP.Msg.prototype = {
    create: function() {
        this.img = this.add.group();
        this.back = this.add.sprite(this.world.centerX,this.world.centerY,'msg1');
        this.back.anchor.setTo(0.5,0.5);
        this.img.add(this.back);
        this.btn = this.add.sprite(1116,720-150,'btn');
        this.btn.anchor.setTo(0.5,0.5);
        this.btn.inputEnabled = true;
        this.btn.events.onInputDown.add(this.listener,this);
        this.img.add(this.btn);
        this.img.alpha = 0;
        this.add.tween(this.img).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
    },
    listener: function() {
        this.btnp = this.add.sprite(1116,720-150,'btnp');
        this.btnp.anchor.setTo(0.5,0.5);
        this.img.add(this.btnp);
        
        this.add.tween(this.img).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        this.time.events.add(Phaser.Timer.SECOND * 2, function() {
            this.game.state.start('level1');
        }, this);
    }
};