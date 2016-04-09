var LoTP = LoTP || {};

LoTP.lv9 = function(game) {};

var x = null;

LoTP.lv9.prototype = {
    
    preload: function() {
        bodyList = [];
        over = false;
        boxWorld = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(10,10),false);
        this.addGround();
        this.imp = new Box2D.Common.Math.b2Vec2(0, Math.floor(Math.random()*50+150));
        this.pt = new Box2D.Common.Math.b2Vec2(2,2);
        this.c1 = Math.floor(Math.random()*5+1);
        this.c2 = (this.c1+1)%6;
        if(this.c2 == 0)
            this.c2 = 6;
        this.c3 = (this.c2+1)%6;
        if(this.c3 == 0)
            this.c3 = 6;
        this.g1 = 0;
        this.g2 = 10;
    
        this.back = this.add.sprite(this.world.centerX,this.world.centerY,'back9');
        this.back.anchor.setTo(0.5,0.5);
        
        this.fr = this.add.sprite(this.world.centerX-5,622.5,'fS');
        this.fr.anchor.setTo(0.5,0.5);
        this.fr.inputEnabled = true;
        this.fr.input.enableDrag(false,false,false,255,new Phaser.Rectangle(-855,580,1139+891,85));
        
        this.fr.events.onDragUpdate.add(this.lUpdate,this);
        
        this.help = this.add.sprite(60,621,'l9fH');
        this.help.anchor.setTo(0.5,0.5);
        
        this.frt = this.add.sprite(this.world.centerX-5,620,'ft');
        this.frt.anchor.setTo(0.5,0.5);
        
        this.rest = this.add.sprite(335,45,'smS');
        this.rest.anchor.setTo(0.5,0.5);
        this.rest.inputEnabled = true;
        this.rest.input.enableDrag(false,false,false,255,new Phaser.Rectangle(100,12,367,66));
        this.rest.events.onDragUpdate.add(this.rUpdate,this);
        
        this.restH = this.add.sprite(165,43.5,'rH');
        this.restH.anchor.setTo(0.5,0.5);
        
        this.rt = this.add.sprite(348,42,'rT');
        this.rt.anchor.setTo(0.5,0.5);
        
        this.gX = this.add.sprite(135,45,'smS');
        this.gX.anchor.setTo(0.5,0.5);
        this.gX.inputEnabled = true;
        this.gX.input.enableDrag(false,false,false,255,new Phaser.Rectangle(-130,12,367,66));
        this.gX.events.onDragUpdate.add(this.gxUpdate,this);
        
        this.gxH = this.add.sprite(14,41.5,'gxH');
        this.gxH.anchor.setTo(0.5,0.5);
        
        this.gxT = this.add.sprite(117,43,'gX');
        this.gxT.anchor.setTo(0.5,0.5);  
        
        this.gY = this.add.sprite(130,119,'smS');
        this.gY.anchor.setTo(0.5,0.5);
        this.gY.inputEnabled = true;
        this.gY.input.enableDrag(false,false,false,255,new Phaser.Rectangle(-130,86,367,66));
        this.gY.events.onDragUpdate.add(this.gyUpdate,this);
        
        this.gyH = this.add.sprite(15,115.5,'l9gyH');
        this.gyH.anchor.setTo(0.5,0.5);
        
        this.gyT = this.add.sprite(117,117,'gY');
        this.gyT.anchor.setTo(0.5,0.5);
        
        this.ban = this.add.sprite(550,720-660,'ban9');
        this.ban.anchor.setTo(0.5,0.5);
        this.ban.scale.x = this.ban.scale.y = 0.7; 
        this.addBody(750,720-660,0.7*230,0.7*69);
        
        this.ball = this.add.sprite(120,20,'bball');
        this.ball.anchor.setTo(0.5,0.5);
        this.addBall(120,20,156);
        
        // Add some clouds
        this.cld1 = this.add.sprite(120,150,'c'+this.c1);
        this.cld1.anchor.setTo(0.5,0.5);
        this.cld1.alpha = 0.5;
        
        this.cld2 = this.add.sprite(900,100,'c'+this.c2);
        this.cld2.anchor.setTo(0.5,0.5);
        this.cld2.alpha = 0.5;
        
        this.cld3 = this.add.sprite(1000,100,'c'+this.c3);
        this.cld3.anchor.setTo(0.5,0.5);
        this.cld3.alpha = 0.5;
        
        this.reset = this.add.sprite(this.world.centerX-100,30,'reset');
        this.reset.anchor.setTo(0.5,0.5);
        this.reset.inputEnabled = true;
        this.reset.events.onInputDown.add(this.resetBtn,this);
        
        this.bme = this.add.sprite(this.world.centerX+100,30,'bme');
        this.bme.anchor.setTo(0.5,0.5);
        this.bme.inputEnabled = true;
        this.bme.events.onInputDown.add(this.bmBtn,this);
        
        this.pass = this.add.sprite(this.world.centerX,this.world.centerY,'pass');
        this.pass.anchor.setTo(0.5,0.5);
        this.pass.alpha = 0;
        
        this.fail = this.add.sprite(this.world.centerX,this.world.centerY,'fail');
        this.fail.anchor.setTo(0.5,0.5);
        this.fail.alpha = 0;
        
        bodyList[1].ApplyImpulse(this.imp,bodyList[1].GetWorldPoint(this.pt) ); 
 
    },
    addBody: function(posX,posY,width,height) {
        var fixtureDef = new Box2D.Dynamics.b2FixtureDef;
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
        fixtureDef.shape.SetAsBox(0.5*width/worldScale,0.5*height/worldScale);
        
        var bodyDef = new Box2D.Dynamics.b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        bodyDef.position.Set(posX/worldScale,posY/worldScale);
        
        bodyDef.userData = {
            asset: this.ban
        };
        
        var body = boxWorld.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
        
        //Create body1
        var fd = new Box2D.Dynamics.b2FixtureDef();
        fd.friction = 1;
        fd.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fd.shape.SetAsBox(0.5*25/worldScale,0.5*70/worldScale);

        var bd = new Box2D.Dynamics.b2BodyDef;
        bd.type = Box2D.Dynamics.b2Body.b2_staticBody;
        bd.position.Set(posX/worldScale,posY/worldScale);

        var us = this.add.sprite(posX,posY,'screw');
        us.scale.x = us.scale.y = 0.7;
        us.anchor.setTo(0.5,0.5);

        bd.userData = {
            asset: us
        };

        var body1= boxWorld.CreateBody(bd);
        body1.CreateFixture(fd);

        var jointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
        jointDef.bodyA = body;
        jointDef.bodyB = body1;

        jointDef.localAnchorA.Set(2.5,0);
        jointDef.localAnchorB.Set(0,0);
        jointDef.collideConnected = false;
        boxWorld.CreateJoint(jointDef);
        
        bodyList.push(body);
    },
    addBall: function(posX,posY,radius) {
        var fd = new Box2D.Dynamics.b2FixtureDef();
        fd.density = 2;
        fd.friction = 0.3;
        fd.restitution = 1;
        fd.shape = new Box2D.Collision.Shapes.b2CircleShape(0.5*radius/worldScale);
        
        var bd = new Box2D.Dynamics.b2BodyDef;
        bd.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        bd.position.Set(posX/worldScale,posY/worldScale);

        bd.userData = {
            asset: this.ball
        };
            
        var body= boxWorld.CreateBody(bd);
        body.CreateFixture(fd);
        
        bodyList.push(body);
    },
    addGround : function() {        
        // Add 2 boxes to simulate ground
        // Box 1
        var fixtureDef = new Box2D.Dynamics.b2FixtureDef;
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;             
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fixtureDef.shape.SetAsBox(0.5*1280/worldScale,0.03);
        fixtureDef.filter.groupIndex=-1;
        
        var bodyDef = new Box2D.Dynamics.b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        bodyDef.position.Set(640/worldScale,522/worldScale);
        
        var body = boxWorld.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
        
        // Add target stage
        fixtureDef = new Box2D.Dynamics.b2FixtureDef;
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;             
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fixtureDef.shape.SetAsBox(0.5*(1280-993)/worldScale,0.5*23/worldScale);
        fixtureDef.filter.groupIndex=-1;
        
        bodyDef = new Box2D.Dynamics.b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        bodyDef.position.Set((0.5*(1280-993)+993)/worldScale,312/worldScale);
        
        body = boxWorld.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
        
        // Add Walls
        // Wall Left.
        fixtureDef = new Box2D.Dynamics.b2FixtureDef;
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;             
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fixtureDef.shape.SetAsBox(0.01,0.5*720/worldScale);
        fixtureDef.filter.groupIndex=-1;
        
        bodyDef = new Box2D.Dynamics.b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        bodyDef.position.Set(0,360/worldScale);
        
        body = boxWorld.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
        
        // Wall Right
        fixtureDef = new Box2D.Dynamics.b2FixtureDef;
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;             
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fixtureDef.shape.SetAsBox(0.01,0.5*720/worldScale);
        fixtureDef.filter.groupIndex=-1;
        
        bodyDef = new Box2D.Dynamics.b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        bodyDef.position.Set(1280/worldScale,360/worldScale);
        
        body = boxWorld.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
        
        // Add Roof
        var fixtureDef = new Box2D.Dynamics.b2FixtureDef;
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;             
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fixtureDef.shape.SetAsBox(0.5*1280/worldScale,0.03);
        fixtureDef.filter.groupIndex=-1;
        
        var bodyDef = new Box2D.Dynamics.b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        bodyDef.position.Set(640/worldScale,0);
        
        var body = boxWorld.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
    },
    update: function() {
        if(!over) {
            boxWorld.Step(dt,10,10);

            // Update the position of all the sprites.
            for( var i = 0; i<bodyList.length ; i++ ) {
                    var mySprite = bodyList[i].GetUserData().asset;
                    mySprite.x = bodyList[i].GetPosition().x * worldScale;
                    mySprite.y = bodyList[i].GetPosition().y * worldScale;
                    mySprite.rotation = bodyList[i].GetAngle(); 
            }

            // Move the clouds
            this.cld1.x += 0.1;
            this.cld2.x += 0.2;
            this.cld3.x += 0.3;

            if(this.cld1.x >= 1600)
                this.cld1.x = -400; 
            if(this.cld2.x >= 1600)
                this.cld2.x = -400; 
            if(this.cld3.x >= 1600)
                this.cld3.x = -400; 

            // Game Over!
            if(bodyList[1].GetUserData().asset.x+100>=1060 && bodyList[1].GetUserData().asset.y-60 < 270)
            {       
                over = true;
                this.GameOver('incomplete');
            } else
                if(bodyList[1].GetLinearVelocity().x < 1e-12 && bodyList[1].GetLinearVelocity().x > 0) 
                {
                    over = true;
                    this.GameOver('complete');
                }
        }
    },
    lUpdate: function(sprite,ptr,dx,dy,snap) {
        if(dx<-100)
            bodyList[1].GetFixtureList().SetFriction(0);
        else
            if(dx<200)
                bodyList[1].GetFixtureList().SetFriction(0.5);
                else
                    bodyList[1].GetFixtureList().SetFriction(1);
    },
    gxUpdate: function(sprite,ptr,dx,dy,snap) {
        if(dx<-10) {
            boxWorld.SetGravity(new Box2D.Common.Math.b2Vec2(-10,this.g2));
            this.g1 = -10;
        }
            else
                if(dx<100) {
                    boxWorld.SetGravity(new Box2D.Common.Math.b2Vec2(0,this.g2));
                    this.g1 = 0;
                } else {
                    boxWorld.SetGravity(new Box2D.Common.Math.b2Vec2(10,this.g2));
                    this.g1 = 10;
                }
    },
    gyUpdate: function(sprite,ptr,dx,dy,snap) {
        if(dx<-10) {
            boxWorld.SetGravity(new Box2D.Common.Math.b2Vec2(this.g1,-10));
            this.g2 = -10;
        } else
            if(dx<100) {
                boxWorld.SetGravity(new Box2D.Common.Math.b2Vec2(this.g1,0));
                this.g2 = 0;
            }
            else {
                boxWorld.SetGravity(new Box2D.Common.Math.b2Vec2(this.g1,10));
                this.g2 = 10;
            }
    },
    rUpdate: function(sprite,ptr,dx,dy,snap) {
        if(dx<200)
            bodyList[1].GetFixtureList().SetRestitution(0);
        else 
            if(dx<300)
                bodyList[1].GetFixtureList().SetRestitution(0.5);
            else
                bodyList[1].GetFixtureList().SetRestitution(1);
    },
    GameOver: function(type) {
        if(type=='complete') { 
            this.add.tween(this.pass).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
            this.pass.inputEnabled = true;
            this.pass.events.onInputDown.add(function(){
                if(mode=="mainGame")
                    this.game.state.start('level10');
                else
                    this.game.state.start('lSelect');
            },this);
        } else {
            this.add.tween(this.fail).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
            this.pass.inputEnabled = true;
            this.pass.events.onInputDown.add(function(){
                this.game.state.start('level9');
            },this);
        }
    },
    bmBtn: function() {
        this.game.state.start('menu');
    },
    resetBtn: function() {
        this.game.state.start('level10');
    }
};