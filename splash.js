var LoTP = LoTP || {};

LoTP.Splash = function(){};

LoTP.Splash.prototype = {
  
    preload: function () {

        // Here we load the assets required for our preloader (in this case a 
        // background and a loading bar)
        this.load.image('back', 'asset/Background.png');
        this.load.image('phy','asset/PhysicsTitle.png');
        this.load.image('box','asset/TitleBox.png');
        this.load.image('start','asset/Start.png');
        this.load.image('startp','asset/StartPressed.png');
        this.load.image('ls','asset/ls.png');
        this.load.image('lsp','asset/lsp.png');
        this.load.image('less','asset/lc.png');
        this.load.image('lessp','asset/LessonsPressed.png');
        this.load.image('gS','asset/Common/gSlider.png');
        this.load.image('gH','asset/Common/gHelp.png');
        this.load.image('gX','asset/Common/gX.png');
        this.load.image('gY','asset/Common/gY.png');
        this.load.image('rT','asset/Common/rT.png');
        this.load.image('fr','asset/Common/fric.png');
        this.load.image('pass','asset/Common/pass.png');
        this.load.image('fail','asset/Common/fail.png');
        this.load.image('screw','asset/Common/screws.png');
        this.load.image('gbox','asset/Common/Box.png');
        this.load.image('bbox','asset/Common/bBox.png');
        this.load.image('gball','asset/Common/gBall.png');
        this.load.image('bball','asset/Common/bBall.png');
        this.load.image('pause','asset/Common/pauseB.png');
        this.load.image('reset','asset/Common/reset.png');
        this.load.image('bme','asset/Common/backmenu.png');
        this.load.image('msg1','asset/Msg1.png');
        this.load.image('btn','asset/btn.png');
        this.load.image('btnp','asset/btnp.png');
        this.load.image('ft','asset/Common/frictionText.png');
        this.load.image('gravHelp','asset/gravHelp.png');
        this.load.image('p1','asset/P1Intro.png');
        this.load.image('p2','asset/P2Intro.png');
        this.load.image('over','asset/overlay1.png');
        this.load.image('avo','asset/AngVhelp.png');
        
        this.load.image('splashi','asset/splash.png');
        
        // Clouds
        this.load.image('c1','asset/Clouds/cloud1.png');
        this.load.image('c2','asset/Clouds/cloud2.png');
        this.load.image('c3','asset/Clouds/cloud3.png');
        this.load.image('c4','asset/Clouds/cloud4.png');
        this.load.image('c5','asset/Clouds/cloud5.png');
        this.load.image('c6','asset/Clouds/cloud6.png');
        
        // lvl1
        this.load.image('back1','asset/Level1/l1Back.png');
        this.load.image('ban1','asset/Level1/l1Ban.png');
        this.load.image('l1fH','asset/Level1/l1fH.png');
             
        // lvl2
        this.load.image('back2','asset/Level2/l2Back.png');
        this.load.image('ban2','asset/Level2/l2Ban.png');
        this.load.image('l2fH','asset/Level2/l2fH.png');
        
        // lvl3
        this.load.image('back3','asset/Level3/l3Back.png');
        this.load.image('ban3','asset/Level3/l3Ban.png');
        this.load.image('l3fH','asset/Level3/l3fH.png');
        
        // lvl4
        this.load.image('back4','asset/Level4/l4back.png');
        this.load.image('ban4','asset/Level4/l4Ban.png');
        this.load.image('l4fH','asset/Level4/l4fH.png');
        this.load.image('l4gxH','asset/Level4/l4gxH.png');
        this.load.image('l4gyH','asset/Level4/l4gyH.png');
        
        // lvl5
        this.load.image('back5','asset/Level5/l5Back.png');
        this.load.image('ban5','asset/Level5/l5Ban.png');
        this.load.image('l5fH','asset/Level5/l5fH.png');
        this.load.image('l5gxH','asset/Level5/l5gxH.png');
        
        // lvl 6
        this.load.image('back6','asset/Level6/l6Back.png');
        this.load.image('fS','asset/Level6/bigSlider.png');
        this.load.image('smS','asset/Level6/smallSlider.png');
        this.load.image('ban6','asset/Level6/l6Ban.png');
        this.load.image('fH','asset/Level6/fricHelp.png');
        this.load.image('rH','asset/Level6/rHelp.png');
        this.load.image('gxH','asset/Level6/graHelp.png');
        
        // lvl 7 
        this.load.image('back7','asset/Level7/l7Back.png');
        this.load.image('ban7','asset/Level7/l7Ban.png');
        this.load.image('l7fH','asset/Level7/l7fH.png');
        this.load.image('l7gxH','asset/Level7/l7gxH.png');
        this.load.image('avButtonP','asset/Level7/aVp.png');
        
        // lvl 8
        this.load.image('ban8','asset/Level7/l8Ban.png');
        
        // lvl 9
        this.load.image('back9','asset/Level9/l9Back.png');
        this.load.image('ban9','asset/Level9/l9Ban.png');
        this.load.image('l9fH','asset/Level9/l9fH.png');
        this.load.image('l9gyH','asset/Level9/l9gyH.png');
        
        // lvl 10
        this.load.image('back10','asset/Level9/l10Back.png');
        this.load.image('ban10','asset/Level9/l10Ban.png');
        
        // levelS
        for(var i=1;i<=10;i++) {
            this.load.image(i,'asset/levelS/'+i+'.png');
        }
        this.load.image('bk','asset/levelS/back.png');
    },
    create: function() {
        this.input.maxPointers = 1;
        this.scale.pageAlignVertically = true;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        var img = this.add.sprite(this.world.centerX,this.world.centerY,'splashi');
        //img.scale = 0.5;
        img.anchor.setTo(0.5,0.5);
        img.alpha=0;
        this.add.tween(img).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);  
        this.time.events.add(Phaser.Timer.SECOND * 5,function(){ this.add.tween(img).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true); },this);  
        this.time.events.add(Phaser.Timer.SECOND * 9,function(){ this.state.start('menu'); },this);  
    }
};