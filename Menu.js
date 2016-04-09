var LoTP = LoTP || {};

LoTP.Menu = function() {};
var dt=1/60;
var mode = "mainGame";
var boxWorld,bodyList=[],worldScale = 30;
LoTP.Menu.prototype = {
    
    preload: function () {
        
        this.menuImg = this.add.group();
        // Add logo to the center of the stage
        this.back = this.add.sprite(
            this.world.centerX, // (centerX, centerY) is the center coordination
            this.world.centerY,
            'back');
        // Set the anchor to the center of the sprite
        this.back.anchor.setTo(0.5, 0.5);
        
        this.box = this.add.sprite(
            this.world.centerX,220,
            'box');
        this.box.anchor.setTo(0.5, 0.5);
        
        this.phy = this.add.sprite(
            this.world.centerX,255,
            'phy');
        this.phy.anchor.setTo(0.5,0.5);
        
        this.start = this.add.sprite(
            this.world.centerX,470,
            'start');
        this.start.anchor.setTo(0.5,0.5);
        this.start.inputEnabled = true;
        this.start.events.onInputDown.add(this.listener,this);
        
        this.startp = this.add.sprite(this.world.centerX,470,'startp');
        this.startp.anchor.setTo(0.5,0.5);
        this.startp.alpha = 0;
        
        this.ls = this.add.sprite(
            this.world.centerX,570,
            'ls');
        this.ls.anchor.setTo(0.5,0.5);
        this.ls.inputEnabled = true;
        this.ls.events.onInputDown.add(this.listenerLs,this);
        
        this.lsp = this.add.sprite(this.world.centerX,570,'lsp');
        this.lsp.anchor.setTo(0.5,0.5);
        this.lsp.alpha = 0;
        
        this.less = this.add.sprite(this.world.centerX,670,'less');
        this.less.anchor.setTo(0.5,0.5);
        
        this.menuImg.add(this.back);
        this.menuImg.add(this.box);
        this.menuImg.add(this.phy);
        this.menuImg.add(this.start);
        this.menuImg.add(this.ls);
        this.menuImg.add(this.less);
        this.initSim();
        this.menuImg.alpha = 0;
        this.add.tween(this.menuImg).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
    },    
    update: function() {
            boxWorld.Step(dt,10,10);
            
            // Update the position of all the sprites.
            for( var b = 0; b<bodyList.length ; b++ ) {
                var mySprite = bodyList[b].GetUserData().asset;
                mySprite.x = bodyList[b].GetPosition().x * worldScale;  
                mySprite.y = bodyList[b].GetPosition().y * worldScale;
            }
    },
    listener: function() {
        this.startp.alpha = 1;
        boxWorld.SetGravity(new Box2D.Common.Math.b2Vec2(0,20));
        this.time.events.add(Phaser.Timer.SECOND * 2, function() { this.transit('message'); }, this);
    },
    transit: function(goto) {
        this.add.tween(this.menuImg).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        this.time.events.add(Phaser.Timer.SECOND * 2,function(){ this.game.state.start(goto); },this);  
    },
    initSim: function() {
        // Box2D Setup.
        // Create world.
        var gravity = new Box2D.Common.Math.b2Vec2(0,0);
        
        boxWorld = new Box2D.Dynamics.b2World(gravity,false);
        
        // Add Stage.
        this.addBody(this.world.centerX,720,1280,2,"","stage");
        
        // Add items.
        this.addBody(this.world.centerX,220,1007,300,this.box,"box");
        this.addBody(this.world.centerX,255,552,105,this.phy,"phy");
        this.addBody(this.world.centerX,470,168,40,this.start,"start");
        this.addBody(this.world.centerX,570,407,40,this.ls,"ls");
        //this.addBody(this.world.centerX,670,231,40,this.less,"less");
    },
    addBody: function(posX,posY,width,height,spriteImage,type) {
        var fixtureDef = new Box2D.Dynamics.b2FixtureDef;
        fixtureDef.density = 1;
        fixtureDef.friction = 0.0;
        fixtureDef.restitution = 0.2;
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
        fixtureDef.shape.SetAsBox(0.5*width/worldScale,0.5*height/worldScale);
        if(type!="stage")
            fixtureDef.filter.groupIndex=-1;
        
        var bodyDef = new Box2D.Dynamics.b2BodyDef;
        if(type!="stage")
            bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        bodyDef.position.Set(posX/worldScale,posY/worldScale);

        bodyDef.userData = {
            asset: spriteImage
        };
            
        var body = boxWorld.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
        
        if(type!="stage")
            bodyList.push(body);
    },
    listenerLs: function() {
        this.lsp.alpha = 1; 
        boxWorld.SetGravity(new Box2D.Common.Math.b2Vec2(0,20));
        this.time.events.add(Phaser.Timer.SECOND * 2, function() { this.transit('lSelect'); }, this);
    },
    listenerLess: function() {
        this.lessp.alpha = 1;
        boxWorld.SetGravity(new Box2D.Common.Math.b2Vec2(0,20));
        this.time.events.add(Phaser.Timer.SECOND * 2, function() { this.transit('lesson'); }, this);
    }
};