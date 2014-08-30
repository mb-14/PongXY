

	var dx=1;
	var dy=1;
	var direction_v=0;
	var direction_h=0;
	var ball_speed_x=2;
	var ball_speed_y=2;
	var start_game=false;
	var score_player=0;
	var score_ai=0;

 	document.onkeydown = function(e) {
    switch (e.keyCode) {
       case 37:
            //left;
			direction_h=-1;
            break;
        case 38:
          //up
			direction_v=1;
            break;
        case 39:
          //right
			direction_h=1;
          break;
        case 40:
            //down
			direction_v=-1;
            break;
		case 83:
			start_game = true;
			break;
			    
	}
	};
	
	document.onkeyup = function(e) {
   	direction_v=0;
	direction_h=0;
	};

	var assetsToLoader = ["8bit.xml"];
    // create a new loader
    var loader = new PIXI.AssetLoader(assetsToLoader);
     // use callback
    loader.onComplete = onAssetsLoaded;
    loader.load();
	
    var stage = new PIXI.Stage(0x333333);
    var begin = new PIXI.Stage(0x333333);
	var renderer = new PIXI.CanvasRenderer(400, 325,document.getElementById("stage"));
	var title;
	var start;
 	function onAssetsLoaded(){
    title = new PIXI.BitmapText("PongXY", {font:"30px 8bit", align:"center" });
    start = new PIXI.BitmapText("Press S to start", {font:"15px 8bit" ,align:"center"});
	title.position.x=200-(title.width/2);
	title.position.y=100;
	start.position.x=200-(start.width/2);
	start.position.y=150;
	begin.addChild(title);
	begin.addChild(start);	
	}
	
    // add the renderer view element to the DOM
   //document.body.appendChild(renderer.view);
 	 // create a texture from an image path
	var ball,paddle_v,paddle_h;
	var paddle_v_ai,paddle_h_ai;
	createBall();
	createPlayer();
	createAI();
	var graphics = new PIXI.Graphics();
	graphics.lineStyle(3, 0xDDDDDD);
	graphics.moveTo(0,300);
	graphics.lineTo(400,300);
	var player_text = new PIXI.Text("PLAYER: "+score_player.toString(), {font:"15px Arial", fill:"white"});
	var ai_text = new PIXI.Text("COMPUTER: "+score_ai.toString(), {font:"15px Arial", fill:"white"});
	player_text.anchor.y=1;
	player_text.anchor.x=0;
	player_text.position.y=325;
	player_text.position.x=0;
	ai_text.anchor.y=1;
	ai_text.anchor.x=1;
	ai_text.position.y=325;
	ai_text.position.x=400;
	stage.addChild(player_text);
	stage.addChild(ai_text);
	stage.addChild(graphics);	
	stage.addChild(ball);
	stage.addChild(paddle_v);
	stage.addChild(paddle_h);
	stage.addChild(paddle_v_ai);
	stage.addChild(paddle_h_ai);
    requestAnimFrame( animate );
 
    function animate() {
 
        requestAnimFrame( animate );
		if(start_game==false){
		renderer.render(begin);
		}
		else{
        // render the stage   
        renderer.render(stage);
		updatePaddles();
		updatePaddles_AI();
		updateBall();
		}    
	}

	function createPlayer(){
		createPaddle_V();  	
		createPaddle_H();
	}
	function createAI(){
		createPaddle_V_AI();
		createPaddle_H_AI();
	}

	function updateBall(){
	if(collision_v()){
		dx=-dx;
		//ball_speed_y= -0.05*(ball.y-paddle_v.y);
		}
		if(collision_h()){
		dy=-dy;			
		}
	if(collision_v_ai()){
		dx=-dx;
		//ball_speed_y= -0.05*(ball.y-paddle_v_ai.y);
		}
		if(collision_h_ai()){
		dy=-dy;			
		}

 		switch(dx){
		case -1:
		ball.x-=ball_speed_x;
		break;
		case 1:
		ball.x+=ball_speed_x;
		}
		switch(dy){
		case -1:
		ball.y-=ball_speed_y;
		break;
		case 1:
		ball.y+=ball_speed_y;
		}
		if(ball.y>=300){
		//AI loses
		score_player++;
		player_text.setText("PLAYER: "+score_player.toString());		
		ball.x=200;
		ball.y=150;
		}
		if(ball.y<=0){
		//Player loses	
		score_ai++;
		ai_text.setText("COMPUTER: "+score_ai.toString());	
		ball.x=200;
		ball.y=150;
		}
		if(ball.x>=400){
		//AI loses
		score_player++;
		player_text.setText("PLAYER: "+score_player.toString());
		ball.x=200;
		ball.y=150;
		}
		if(ball.x<=0){
		//Player loses
		score_ai++;
		ai_text.setText("COMPUTER: "+score_ai.toString());
		ball.x=200;
		ball.y=150;
		}
	}

	function updatePaddles_AI(){
	if(dx==1){
	if(ball.y>paddle_v_ai.y){
	if(ball.x>150&&ball.x<200)	
		paddle_v_ai.y+=2.2;
	else if(ball.x>200)
		paddle_v_ai.y+=1.6;
	}
	else if(ball.y<paddle_v_ai.y){
	if(ball.x>150&&ball.x<200)	
		paddle_v_ai.y-=2;
	else if(ball.x>200)
		paddle_v_ai.y-=1.6;
	}}


	if(dy==1){
	if(ball.x>paddle_h_ai.x){
	if(ball.y>100&&ball.y<150)	
		paddle_h_ai.x+=2.2;
	else if(ball.y>150)
		paddle_h_ai.x+=1.6;
	}
	else if(ball.x<paddle_h_ai.x){
	if(ball.y>100&&ball.y<150)	
		paddle_h_ai.x-=2.2;
	else if(ball.y>150)
		paddle_h_ai.x-=1.6;
	}}

	}
	function updatePaddles(){
		switch(direction_v){
		case -1:
		if(paddle_v.y<=260){
		paddle_v.y+=2.2;
		}
		break;
		case 1:
		if(paddle_v.y>=40){
		paddle_v.y-=2.2;
		}
		break;		
		}
		switch(direction_h){
		case 1:
		if(paddle_h.x<=360){
		paddle_h.x+=2.2;
		}
		break;
		case -1:
		if(paddle_h.x>=40){
		paddle_h.x-=2.2;
		}
		break;		
		}
	}
 
	function createBall(){
	var texture = PIXI.Texture.fromImage("sprites/ball.png");
    // create a new Sprite using the texture
	ball = new PIXI.Sprite(texture);
 
    // center the sprites anchor point
    ball.anchor.x = 0.5;
    ball.anchor.y = 0.5;
 	ball.height=20;
	ball.width=20;
    // move the sprite t the center of the screen
    ball.position.x = 200;
    ball.position.y = 150;
	
	}

	function createPaddle_V(){
	var texture = PIXI.Texture.fromImage("sprites/paddle_v.png");
	 paddle_v =  new PIXI.Sprite(texture);
 
    // center the sprites anchor point
    paddle_v.anchor.x = 0.5;
    paddle_v.anchor.y = 0.5;
 	paddle_v.height=80;
	paddle_v.width=10;
    // move the sprite t the center of the screen
    paddle_v.position.x = 5;
    paddle_v.position.y = 150;
	}

	function createPaddle_H(){
	var texture = PIXI.Texture.fromImage("sprites/paddle_h.png");
	 paddle_h =  new PIXI.Sprite(texture);
 
    // center the sprites anchor point
    paddle_h.anchor.x = 0.5;
    paddle_h.anchor.y = 0.5;
 	paddle_h.height=10;
	paddle_h.width=80;
    // move the sprite t the center of the screen
    paddle_h.position.x = 200;
    paddle_h.position.y = 5;
	}

	function createPaddle_V_AI(){
	var texture = PIXI.Texture.fromImage("sprites/paddle_v_ai.png");
	paddle_v_ai =  new PIXI.Sprite(texture);
 
    // center the sprites anchor point
    paddle_v_ai.anchor.x = 0.5;
    paddle_v_ai.anchor.y = 0.5;
 	paddle_v_ai.height=80;
	paddle_v_ai.width=10;
    // move the sprite t the center of the screen
    paddle_v_ai.position.x = 395;
    paddle_v_ai.position.y = 150;
	}

	function createPaddle_H_AI(){
	var texture = PIXI.Texture.fromImage("sprites/paddle_h_ai.png");
	paddle_h_ai =  new PIXI.Sprite(texture);
 
    // center the sprites anchor point
    paddle_h_ai.anchor.x = 0.5;
    paddle_h_ai.anchor.y = 0.5;
 	paddle_h_ai.height=10;
	paddle_h_ai.width=80;
    // move the sprite t the center of the screen
    paddle_h_ai.position.x = 200;
    paddle_h_ai.position.y = 295;
	}

	function collision_v(){
	if(ball.y>=paddle_v.y-40&&ball.y<=paddle_v.y+40&&ball.x<=15&&ball.x>=10){
	return true;	
	}
	return false;
	}
	function collision_h(){
	if(ball.x>=paddle_h.x-40&&ball.x<=paddle_h.x+40&&ball.y<=15&&ball.y>=10){
	return true;	
	}
	return false;
	}

	function collision_v_ai(){
	if(ball.y>=paddle_v_ai.y-40&&ball.y<=paddle_v_ai.y+40&&ball.x>=385&&ball.x<=390){
	return true;	
	}
	return false;
	}
	function collision_h_ai(){
	if(ball.x>=paddle_h_ai.x-40&&ball.x<=paddle_h_ai.x+40&&ball.y>=285&&ball.y<=290){
	return true;	
	}
	return false;
	}
