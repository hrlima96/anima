var cv, ctx;
var bola_x = 400; var bola_y = 10;
var ret_x = 400, ret_y = 400;
var alt_real = 100;
var t_inicial;
var pontos = 0;
var vidas = 3;
var nivel = 0;
var qtdBolas = 1;
var img = new Image();

//som
var ctxsnd, sndSrc = null, sndBuffer;
var url = "pegabola.mp3";
var sndBuffer2;
var url2 = "fimdejogo.mp3";
var sndBuffer3;
var url3 = "npegabola.mp3";



function pegaTempo(){
	d = new Date;
	return d.getTime()/1000.0;
}

function aumentaNivel(){		
	nivel++;
	alt_real = alt_real - 8; 
}

function fimDeJogo(){
	desenhaFundo();
	ctx.font="50px Arial";
	ctx.textAlign="center";
	ctx.fillText("Fim de Jogo", 400, 222);
}

function desenhaBola(x, y){
	ctx.beginPath();
	ctx.arc(x,y,10,0,2*Math.PI); //x, y, r, ang inicio, ang final
	ctx.stroke();
}

function desenhaRetangulo(x, y){
	if(ret_x>cv.width-18){
	ret_x=cv.width-18;
	x=ret_x;}
	else if(ret_x<18){
	ret_x=18;
	x=ret_x;}
	
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x+18, y);
	ctx.lineTo(x+18, y+10);
	ctx.lineTo(x-18, y+10);
	ctx.lineTo(x-18,y);
	ctx.lineTo(x,y);
	ctx.stroke();
}

function escrevePontuacao(){
	ctx.fillStyle="black";
	ctx.font="12px Impact";
	ctx.fillText("Pontos: " + pontos, 25,10);
}

function escreveVida(){
	ctx.fillStyle="black";
	ctx.font="12px Impact";
	ctx.fillText("Vidas: " + vidas, 25,30);
}

function escreveNivel(){
	ctx.fillStyle="black";
	ctx.font="12px Impact";
	ctx.fillText("Nivel: " + nivel,770,15);
}

function desenhaFundo(){
	imagem = document.createElement("img");
	imagem.src="images.jpg";
	ctx.drawImage(imagem,0,0,800,444);
}

function animacao(){
	desenhaFundo();
	
	//for()
	if((bola_x >= ret_x - 28 && bola_x <= ret_x + 28) && bola_y >= ret_y || bola_y > 444)
	{
		if(bola_y<444) {
			pontos++;
			if(pontos%5==0){		
				aumentaNivel();
			}
			playPegaBola();
		}
		else {
			vidas--;
			playNPegaBola();
			if(vidas<0){
				playFimJogo();
			}
		}		
		bola_y = 10;
		t_inicial = pegaTempo();
		bola_x = Math.random() * 800;
	}
	
	desenhaBola(bola_x, bola_y);

	var dt = pegaTempo() - t_inicial;
	var sm = 9.8*dt*dt;
	var h = alt_real/cv.height;
	var sp = sm/h;
	
	bola_y = 10 + sp;
	
    desenhaRetangulo(ret_x, ret_y);
	
	escrevePontuacao();
	escreveVida();	
	escreveNivel();
}

function movimenta(key){
	
	switch(key){
		case 37: //tecla pra esquerda
		ret_x-=15;
		break;
		
		case 39: //tecla pra direita
		ret_x+=15;
		break;
	}
}

function playFimJogo(){
	sndSrc = ctxsnd.createBufferSource();
	sndSrc.buffer = sndBuffer2;
	sndSrc.connect(ctxsnd.destination);
	
	sndSrc.start(0);
}

function playPegaBola(){
	
	sndSrc = ctxsnd.createBufferSource();
	sndSrc.buffer = sndBuffer;
	sndSrc.connect(ctxsnd.destination);
	
	
	sndSrc.start(0);
}

function playNPegaBola(){
	
	sndSrc = ctxsnd.createBufferSource();
	sndSrc.buffer = sndBuffer3;
	sndSrc.connect(ctxsnd.destination);
	
	
	sndSrc.start(0);
}

function stopSnd(){
	sndSrc.stop(ctxsnd.currentTime);
}

function iniciaJogo(){
	window.onmousemove = function(){};
	window.onclick = function(){};

	t_inicial = pegaTempo();
	window.setInterval(function(){if(vidas < 0){fimDeJogo()}else{animacao()}}, 33);
}

function menu(){
	desenhaFundo();
	
	ctx.font="80px Impact";
	ctx.textAlign="center";
	ctx.fillText("Anima",400,222);
	
	ctx.font="15px Impact";
	ctx.fillText("Começar jogo",400,300);
	
	window.onclick = function(event){if((event.pageX >=400 && event.pageX <= 455) && (event.pageY >= 300 && event.pageY <= 315)){
										iniciaJogo();
									}
					};
	window.onmousemove = function(event){if((event.pageX >=400 && event.pageX <= 455) && (event.pageY >= 300 && event.pageY <= 315)){
											ctx.fillStyle="#ffffff";
											ctx.fillText("Começar jogo",400,300);
										}else{
											ctx.fillStyle="#000000";
											ctx.fillText("Começar jogo",400,300);
										}
						};
}

function inicializa(){
	cv = document.createElement("canvas");
	document.body.appendChild(cv);
	cv.style.borderStyle = "solid";
	
	cv.width = 800;
	cv.height = 444;
	ctx = cv.getContext("2d");
	
	 if(typeof AudioContext != "undefined")
    {
		ctxsnd = new AudioContext();
    }else if(typeof webkitAudioContext != "undefined"){
		ctxsnd = new webkitAudioContext();
	 }else{
		throw new Error("Seu navegador não suporta AudioContext!");
    }

    var request = new XMLHttpRequest();

    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function()
    {
        var adata = request.response;

		  ctxsnd.decodeAudioData(
			   adata, 
			   function(buffer) {
			      sndBuffer = buffer;
			   }
        );
	 };
	 
	 request.send();
	 
	 var request1 = new XMLHttpRequest();

    request1.open("GET", url2, true);
    request1.responseType = "arraybuffer";

    request1.onload = function()
    {
        var adata = request1.response;

		  ctxsnd.decodeAudioData(
			   adata, 
			   function(buffer) {
			      sndBuffer2 = buffer;
			   }
        );
	 };

    request1.send();
	
	var request2 = new XMLHttpRequest();

    request2.open("GET", url3, true);
    request2.responseType = "arraybuffer";

    request2.onload = function()
    {
        var adata = request2.response;

		  ctxsnd.decodeAudioData(
			   adata, 
			   function(buffer) {
			      sndBuffer3 = buffer;
			   }
        );
	 };
	 
	 request2.send();
	
	window.onkeydown = function(event){movimenta(event.keyCode);};              //window.onmousemove, window.onmousedown
	menu();
}
