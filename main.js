var LoTP = LoTP || {};

window.onload = function() {

    //if(window.innerHeight>720)
        //document.getElementById("b").style.marginTop = (window.innerHeight-720)/2+"px";
    
    LoTP.game = new Phaser.Game(1280,720,Phaser.AUTO,''); 

    LoTP.game.state.add('splash',LoTP.Splash);
    LoTP.game.state.add('menu',LoTP.Menu);
    LoTP.game.state.add('message',LoTP.Msg);
    LoTP.game.state.add('level1',LoTP.lv1);
    LoTP.game.state.add('level2',LoTP.lv2);
    LoTP.game.state.add('level3',LoTP.lv3);
    LoTP.game.state.add('level4',LoTP.lv4);
    LoTP.game.state.add('level5',LoTP.lv5);
    LoTP.game.state.add('level6',LoTP.lv6);
    LoTP.game.state.add('level7',LoTP.lv7);
    LoTP.game.state.add('level8',LoTP.lv8);
    LoTP.game.state.add('level9',LoTP.lv9);
    LoTP.game.state.add('level10',LoTP.lv10);
    LoTP.game.state.add('lSelect',LoTP.lSelect);
    
    LoTP.game.state.start('splash');

};