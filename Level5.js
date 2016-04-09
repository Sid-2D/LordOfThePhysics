var LoTP = LoTP || {};

LoTP.lv5 = function(game) {};

var x = null;

LoTP.lv5.prototype = {
    
    preload: function() {
        bodyList = [];
        over = false;
        this.g1 = new Box2D.Common.Math.b2Vec2(0,10);
        this.g2 = new Box2D.Common.Math.b2Vec2(10,10);
        this.g3 = new Box2D.Common.Math.b2Vec2(-10,10);
        boxWorld = new Box2D.Dynamics.b2World(this.g1,false);
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
    
        this.back = this.add.sprite(this.world.centerX,this.world.centerY,'back5');
        this.back.anchor.setTo(0.5,0.5);
        
        this.fr = this.add.sprite(this.world.centerX-5,622.5,'fS');
        this.fr.anchor.setTo(0.5,0.5);
        this.fr.inputEnabled = true;
        this.fr.input.enableDrag(false,false,false,255,new Phaser.Rectangle(-855,580,1139+891,85));
        
        this.fr.events.onDragUpdate.add(this.lUpdate,this);
        
        this.help = this.add.sprite(58,619,'l5fH');
        this.help.anchor.setTo(0.5,0.5);
        
        this.frt = this.add.sprite(this.world.centerX-5,620,'ft');
        this.frt.anchor.setTo(0.5,0.5);
        
        this.gX = this.add.sprite(75,64,'smS');
        this.gX.anchor.setTo(0.5,0.5);
        this.gX.inputEnabled = true;
        this.gX.input.enableDrag(false,false,false,255,new Phaser.Rectangle(-115,31,357,66));
        this.gX.events.onDragUpdate.add(this.gxUpdate,this);
        
        this.gxH = this.add.sprite(15,61.5,'l5gxH');
        this.gxH.anchor.setTo(0.5,0.5);
        
        this.gxT = this.add.sprite(140,61.5,'gX');
        this.gxT.anchor.setTo(0.5,0.5);  
        
        this.ban = this.add.sprite(750,720-660,'ban5');
        this.ban.anchor.setTo(0.5,0.5);
        this.ban.scale.x = this.ban.scale.y = 0.7;
        this.addBody(750,720-660,0.7*230,0.7*69,this.ban,'ban');
        
        this.box = this.add.sprite(1000,20,'gbox');
        this.box.anchor.setTo(0.5,0.5);
        this.addBody(1000,20,198,132,this.box,'box');
        
        // Add some clouds
        this.cld1 = this.add.sprite(120,150,'c'+this.c1);
        this.cld1.anchor.setTo(0.5,0.5);
        this.cld1.alpha = 0.5;
        
        this.cld2 = this.add.sprite(600,100,'c'+this.c2);
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
        
        bodyList[1].ApplyImpulse(this.imp,bodyList[1].GetWorldPoint(this.pt) ); 
 
    },
    addBody: function(posX,posY,width,height,spr,type) {
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
            asset: spr
        };
        
        var body = boxWorld.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
        
        if(type=="ban") {
            
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
            
            //Code for adding motor:-
            /*
            jointDef.enableMotor = true;
            jointDef.maxMotorTorque = 20;
            jointDef.motorSpeed = 0;
            */
            jointDef.localAnchorA.Set(2.5,0);
            jointDef.localAnchorB.Set(0,0);
            jointDef.collideConnected = false;
            
            boxWorld.CreateJoint(jointDef);
        } 
        bodyList.push(body);
    },
    addGround : function() {        
        // Add 3 boxes to simulate ground
        // Box 1
        var fixtureDef = new Box2D.Dynamics.b2FixtureDef;
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;             
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fixtureDef.shape.SetAsBox(480/worldScale,0.03);
        fixtureDef.filter.groupIndex=-1;
        
        var bodyDef = new Box2D.Dynamics.b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        bodyDef.position.Set(0,414/worldScale);
        
        var body = boxWorld.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
        body.SetAngle(0.2984513);
        
        // Box 2
        fixtureDef = new Box2D.Dynamics.b2FixtureDef;
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;             
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fixtureDef.shape.SetAsBox(0.5*474/worldScale,0.03);
        fixtureDef.filter.groupIndex=-1;
        
        bodyDef = new Box2D.Dynamics.b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        bodyDef.position.Set(720/worldScale,564/worldScale);
        
        body = boxWorld.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
        
        // Box 3
        fixtureDef = new Box2D.Dynamics.b2FixtureDef;
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;             
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fixtureDef.shape.SetAsBox(222/worldScale,0.03);
        fixtureDef.filter.groupIndex=-1;
        
        bodyDef = new Box2D.Dynamics.b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        bodyDef.position.Set(950/worldScale,564/worldScale);
        
        body = boxWorld.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
        body.SetAngle(-0.9040806);
        
        // Box 4
        fixtureDef = new Box2D.Dynamics.b2FixtureDef;
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;             
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fixtureDef.shape.SetAsBox(0.5*210/worldScale,0.03);
        fixtureDef.filter.groupIndex=-1;
        
        bodyDef = new Box2D.Dynamics.b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        bodyDef.position.Set(1195/worldScale,390/worldScale);
        
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
            if(bodyList[1].GetUserData().asset.x+100>=1060 && bodyList[1].GetLinearVelocity().x < 1e-12 && bodyList[1].GetLinearVelocity().x > 0)
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
        if(dx<50) 
            boxWorld.SetGravity(this.g3);
            else
                if(dx<100)
                    boxWorld.SetGravity(this.g1);
                else
                    boxWorld.SetGravity(this.g2);
    },
    GameOver: function(type) {
        this.add.tween(this.pass).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
        this.pass.inputEnabled = true;
        this.pass.events.onInputDown.add(function(){
            if(mode=="mainGame")
                this.game.state.start('level6');
            else
                this.game.state.start('lSelect');
        },this);
    },
    bmBtn: function() {
        this.game.state.start('menu');
    },
    resetBtn: function() {
        this.game.state.start('level5');
    }
};