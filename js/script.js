// FUNCIONES DEL JUEGO //
	function rand(l,u){
		return Math.floor((Math.random() * (u-l+1))+l);
	}

// PARAMETROS DEL JUEGO //
	var juegoIniciado 	= 1;
	var modoJuego 		= 1;
	var version 		= '1.0 Alfa';
    
    var periodic;
    
    var nivelDisparos   = 10;
    var velocidadMalos  = 1;
    var disparos        = 1;
	
    var parado          = 0;
    
    var reloadGraph;
    
    //var maxfps = 24;  //usar
	var maxfps = 60;  //pruebas
	var drawInterval = 1 / maxfps * 1000;
        

$(window).addEvent('keydown',function(event){
	if(juegoIniciado == 2){
		keyPress = event.key;
        
        if(keyPress == 'esc'){
            if(parado == 0){
                $clear(periodic);
                
                parado = 1;
            }
            else{
                periodic = reloadGraph.periodical(drawInterval);
                
                parado = 0;
            }
        }
	}
});

	
$(window).addEvent('load',function(){
	ctx = document.getElementById('canvas').getContext('2d');

	x = document.getElementById('canvas').width;
	y = document.getElementById('canvas').height;

	juegoIniciado = 2;

    
    var crece = 0;
    var tamanio = 75;
    var menEmpezar = 0;
	var menuPrincipal = function(){
		ctx.strokeStyle = "#333"; 
		ctx.lineWidth = 10; 
        
        if(crece == 0) tamanio-=0.5;
        else tamanio+=0.5;
        
        if(tamanio <= 55) crece = 1;
        if(tamanio >= 75) crece = 0;
        
        ctx.beginPath();  
        ctx.arc(120,100,tamanio,0,Math.PI*2,true)
        ctx.stroke();
        
        ctx.font = "70px Corbel italic";  
            ctx.strokeStyle = "#333";  
            ctx.strokeText("CLICK", 250, 130);
        ctx.font = "70px Corbel italic";  
            ctx.fillStyle = "#666";  
            ctx.fillText("CLICK", 250, 130);
        
        
        ctx.font = "70px Corbel italic";  
            ctx.strokeStyle = "#F70";  
            ctx.strokeText("CLICK", 450, 130);
        ctx.font = "70px Corbel italic";  
            ctx.fillStyle = "#FA3";  
            ctx.fillText("CLICK", 450, 130);
        
        menEmpezar == 0 ? ctx.fillStyle = '#333' : ctx.fillStyle = '#000';
        ctx.fillRect(x/2-200,y/2-20,400,50);
        
        if(menEmpezar == 1){
            // Create gradients  
            var lingrad = ctx.createLinearGradient(0,y/2-20,0,y/2+30);
            lingrad.addColorStop(0, '#4096EE');  
            lingrad.addColorStop(1, '#356AA0');
  
        // assign gradients to fill and stroke styles  
            ctx.fillStyle = lingrad; 
    
        // draw shapes  
            ctx.fillRect(x/2-200,y/2-20,400,50); 
        }

        ctx.font = "30px Corbel bold"; 
            ctx.fillStyle = '#333'; 
            ctx.fillText("EMPEZAR", x/2-60, y/2+16);
        ctx.font = "30px Corbel bold"; 
            ctx.fillStyle = '#eee'; 
            ctx.fillText("EMPEZAR", x/2-60, y/2+15);
            
        if(menEmpezar == 1){
            ctx.font = "30px Corbel bold"; 
                ctx.fillStyle = '#fff'; 
                ctx.fillText("EMPEZAR", x/2-60, y/2+15);
        }
        
        
        ctx.font = "14px Corbel";  
            ctx.fillStyle = "#fff";  
            ctx.fillText("version "+ version, x-110, y-12);
        
            ctx.fillStyle = "#333";  
            ctx.fillText("version "+ version, x-110, y-11);
        
          
            ctx.fillStyle = "#fff";  
            ctx.fillText("madson ", 10, y-12);

            ctx.fillStyle = "#333";  
            ctx.fillText("madson", 10, y-11);
            
            
            
        
	}
    
    var mouseHelp = 0;
    var helpPlay = function(){
        ctx.lineWidth = 15;
        ctx.lineCap = "round";
         
        ctx.strokeStyle = "#ccc";
            
        ctx.beginPath();
        ctx.moveTo(x/2-310,y/2+80);
        ctx.lineTo(x/2+310,y/2+80);
        ctx.moveTo(x/2+310,y/2+80);
        ctx.lineTo(x/2+310,y/2+250);
        ctx.moveTo(x/2+310,y/2+250);
        ctx.lineTo(x/2-310,y/2+250);
        ctx.moveTo(x/2-310,y/2+250);
        ctx.lineTo(x/2-310,y/2+80);
        ctx.stroke();
        
        ctx.fillStyle = '#ddd';
        ctx.fillRect(x/2-310,y/2+80,620,170);

        //ctx.strokeStyle = '#888';
        //ctx.strokeRect(x/2-300,y/2+70,600,180);
        
        ctx.font = "16px Corbel italic";  
            ctx.fillStyle = "#666";  
            ctx.fillText("- Realiza los disparos desde la zona inferior remarcada.", x/2-300, y/2+105); 
             
            ctx.fillText("- La cantidad de disparos, los enemigos y la velocidad de ellos ira aumentando contra mas", x/2-300, y/2+135);
            ctx.fillText("puntos consigas.", x/2-290, y/2+150);
            
            ctx.fillText("- Realize la mayor cantidad de aciertos en las dianas.", x/2-300, y/2+180);
            
            ctx.fillText("- En cuanto un proyectil te alcanza, se termina el juego.", x/2-300, y/2+210);
            
            ctx.fillText("Suerte, y gracias por jugar.", x/2+130, y/2+235);
            
            ctx.font = "30px Corbel bold italic";
            ctx.fillStyle = "#000"; 
            ctx.fillText("Instrucciones", x/2-300, y/2+83);
            ctx.fillStyle = "#fff"; 
            ctx.fillText("Instrucciones", x/2-300, y/2+82);
        
        if(mouseHelp == 0){
            ctx.fillStyle = 'rgba(240,240,240,0.7)';
            ctx.fillRect(x/2-320,y/2+60,640,200);
        }
    }
    
    
    
    
    
    

    var lanzar = Array();
	var generarCaja = function(){
        ctx.strokeStyle = "#008C00"; 
		ctx.lineWidth = 2; 
        
        for(i=0;i<lanzar.length;i++){
            ctx.beginPath();  
            ctx.arc(lanzar[i][0],lanzar[i][1],lanzar[i][2],0,Math.PI*2,true);
            ctx.stroke();
            
        }
	}
    
	var moverLanzar = function(){
		for(i=0;i<lanzar.length;i++){
            lanzar[i][1]-=lanzar[i][1]/25;
            if(lanzar[i][2] <5)lanzar[i][2]+=1;
        }
	}
    
	var controlLanzar = function(){
        nuevoArr = Array();
		for(i=0;i<lanzar.length;i++){
            if(lanzar[i][1] > 5) nuevoArr[nuevoArr.length] = Array(lanzar[i][0], lanzar[i][1], lanzar[i][2]);
        }
        
        lanzar = nuevoArr
	}
    
    
    var posObjetos = Array(Array(0, rand(0,430)));
	var objetos = function(){
        for(i=0;i<posObjetos.length;i++){
            ctx.fillStyle = '#CC0000';
            ctx.fillRect(posObjetos[i][0],posObjetos[i][1],30,30);
            ctx.fillStyle = '#fff';
            ctx.fillRect(posObjetos[i][0]+3,posObjetos[i][1]+3,24,24);
            ctx.fillStyle = '#CC0000';
            ctx.fillRect(posObjetos[i][0]+6,posObjetos[i][1]+6,18,18);
            ctx.fillStyle = '#fff';
            ctx.fillRect(posObjetos[i][0]+9,posObjetos[i][1]+9,12,12);
            ctx.fillStyle = '#CC0000';
            ctx.fillRect(posObjetos[i][0]+12,posObjetos[i][1]+12,6,6);
        }
	}
    
    
    var colisionados = 0;
	var colisiones = function(){
        for(i=0;i<lanzar.length;i++){
            for(e=0;e<posObjetos.length;e++){
                if(lanzar[i][0]+5 >= posObjetos[e][0] && lanzar[i][0]-5 <= posObjetos[e][0]+30 && lanzar[i][1]-2 >= posObjetos[e][1] && lanzar[i][1]+2 <= posObjetos[e][1]+30){ 
                    colisionados +=1;

                    lanzar.splice(i,1);

                    //posObjetos.splice(e,1);
                }
            }
        }
	}
    
    var moverObjetos = function(){
        if(colisionados%5 == 0) velocidadMalos = 1+colisionados/50;
        
        for(i=0;i<posObjetos.length;i++){
            posObjetos[i][0]+=velocidadMalos;
            if(posObjetos[i][0] > x){
                posObjetos.splice(i,1);
                
                posObjetos[posObjetos.length] = Array(0, rand(0, 430));
            }
        }
        
	}
    
    var hud = function(){
        ctx.fillStyle = '#ddd';
        ctx.fillRect(0,475,x,125);
       
        ctx.font = "12px Corbel";  
        ctx.fillStyle = "#aaa";  
        ctx.fillText("fire area      fire area      fire area      fire area      fire area      fire area      fire area      fire area      fire area      fire area      fire area      fire area      fire area      fire area      fire area      fire area      fire area", -5, 490);
        
        ctx.lineWidth = 1;
        
        ctx.strokeStyle = '#999';
        ctx.beginPath();
        ctx.moveTo(0,474.5);
        ctx.lineTo(x,474.5);
        ctx.closePath();
        ctx.stroke();
       
        ctx.font = "18px Corbel";  
        ctx.fillStyle = "#333";  
        ctx.fillText("disparos", x-300, y-13);
         
        ctx.fillStyle = "#4096EE";
        ctx.font = "35px Corbel";
        ctx.fillText(disparos+1, x-235, y-11);
       
        ctx.font = "18px Corbel";  
        ctx.fillStyle = "#333";  
        ctx.fillText("puntos", x-157, y-13);
         
        ctx.fillStyle = "#4096EE";
        ctx.font = "35px Corbel";
        ctx.fillText(colisionados, x-100, y-11);
	}
    
    var controlLevel = function(){
        if(colisionados%10==0 && colisionados!=0 && posObjetos.length <= colisionados/10){
            posObjetos[posObjetos.length] = Array(0, rand(0, 430));
        }
	}
    
    var lanzarEnemigos = Array();
    var disparosEnemigos = function(){
        if(colisionados%50 == 0) nivelDisparos = colisionados/10+10;
        if(colisionados%30 == 0) disparos = colisionados/30+1;
        
        if(colisionados/10 >= 0 && lanzarEnemigos.length < nivelDisparos){
            for(i=0;i<posObjetos.length;i++){
                if(rand(0,100) == 50){
                    lanzarEnemigos[lanzarEnemigos.length] = Array(posObjetos[i][0]+15, posObjetos[i][1]+30, rand(1, 4));
                }
            }
        }
        
        ctx.fillStyle = "#B02B2C"; 
		ctx.lineWidth = 2; 
        
        for(i=0;i<lanzarEnemigos.length;i++){
            ctx.beginPath();  
            ctx.arc(lanzarEnemigos[i][0],lanzarEnemigos[i][1],4,0,Math.PI*2,true)
            ctx.fill();
        }
	}
    
    var moverDisparosEnemigos = function(){
        for(i=0;i<lanzarEnemigos.length;i++){
            lanzarEnemigos[i][1]+=y/lanzarEnemigos[i][1]*4;
            
            if(lanzarEnemigos[i][1] >= y) lanzarEnemigos.splice(i,1);
        }
        
        
        for(i=0;i<lanzarEnemigos.length;i++){
            for(e=0;e<lanzar.length;e++){
                if(lanzar[e][0]+5 >= lanzarEnemigos[i][0]-4 && lanzar[e][0]-5 <= lanzarEnemigos[i][0]+4 &&
                    lanzar[e][1]+10 >= lanzarEnemigos[i][1]-4 && lanzar[e][1] <= lanzarEnemigos[i][1]+4){
                        lanzarEnemigos.splice(i,1);
                        lanzar.splice(e,1);
                }
            }
        }
	}
    
    
    var mousePosition = Array(0, 0);
    var controlMuerte = function(){
        for(i=0;i<lanzarEnemigos.length;i++){
            if(lanzarEnemigos[i][0]-4 >= mousePosition[0]-6 && lanzarEnemigos[i][0]+4 <= mousePosition[0]+16 &&
               lanzarEnemigos[i][1]-4 >= mousePosition[1]-2 && lanzarEnemigos[i][1]+4 <= mousePosition[1]+22) modoJuego = 3;
        }
	}


    var restartHover = 0;
    var gameOver = function(){
        ctx.fillStyle = "#4096EE";
        ctx.font = "56px Corbel";
        ctx.fillText("YOU LOSE", x/2-120, y/2-11);
        
        ctx.fillStyle = "#36393D";
        ctx.font = "80px Corbel";
        ctx.fillText("puntos", x/2-250, y/2-111);
        ctx.fillStyle = "#B02B2C";
        ctx.font = "100px Corbel";
        ctx.fillText(colisionados, x/2+10, y/2-111);
        
        
        ctx.fillStyle = '#333';
        ctx.fillRect(x/2-100,y/2+50,200,40);
        
        if(restartHover == 1){
            // Create gradients  
            var lingrad = ctx.createLinearGradient(0,y/2+50,0,y/2+90);
            lingrad.addColorStop(0, '#4096EE');  
            lingrad.addColorStop(1, '#356AA0');
  
        // assign gradients to fill and stroke styles  
            ctx.fillStyle = lingrad; 
    
        // draw shapes  
            ctx.fillRect(x/2-100,y/2+50,200,40);
        }
        
        ctx.fillStyle = "#000";
        ctx.font = "30px Corbel";
        ctx.fillText("RESTART", x/2-60, y/2+81);
        ctx.fillStyle = "#eee";
        ctx.fillText("RESTART", x/2-60, y/2+80);
    }







	
	
	// 95º CONTROLES PARA ACCIONES DEL CLICK DEL RATON //
		$('canvas').addEvent('click', function(event){
			userX = event.page.x - event.target.getPosition().x;
			userY = event.page.y - event.target.getPosition().y;
			
			switch(modoJuego){
				// 1 MENU PRINCIPAL //
				case 1: if(userY >= y/2-20 && userY <= y/2+30) modoJuego = 2;
                        
                        break;
				// 2 MENU PRINCIPAL //
				case 2: if(lanzar.length <= disparos && userY >= 475) lanzar[lanzar.length] = Array(userX, userY, 1);

                        break;
                        
                case 3: if(userX >= x/2-100 && userX <= x/2+100 && userY >= y/2+50 && userY <= y/2+90){
                            nivelDisparos   = 10;
                            velocidadMalos  = 1;
                            disparos        = 1;
                            
                            colisionados    = 0;
                            
                            lanzar          = Array();
                            lanzarEnemigos  = Array();
                            
                            posObjetos      = Array(Array(0, rand(0,430)));
                            
                            modoJuego       = 1;
                        }
                        
                        break;
					
			}
            
		});
	// 95º CONTROLES PARA ACCIONES DEL CLICK DEL RATON //


	
	
	// 96º CONTROLES PARA ACCIONES MIENTRAS SE LEVANTA EL BOTON CLICK //
		$('canvas').addEvent('mouseup', function(event){
			userX = event.page.x - event.target.getPosition().x;
			userY = event.page.y - event.target.getPosition().y;
			
			switch(modoJuego){
				// 1 MENU PRINCIPAL //
				case 1: break;
			}
		});
	// 96º FINAL CONTROLES PARA ACCIONES MIENTRAS SE LEVANTA EL BOTON CLICK //
	
	
	
	// 97º CONTROLES PARA ACCIONES MIENTRAS SE MANTIENE EL BOTON CLICK PULSADO //
		var active 		= Array(1,1,1);
		var mouseX 		= 0;
		$('canvas').addEvent('mousedown', function(event){
			userX = event.page.x - event.target.getPosition().x;
			userY = event.page.y - event.target.getPosition().y;
			
			switch(modoJuego){
				// 1 MENU PRINCIPAL //
				case 1: break;
			}
		});
	// 97º FINAL CONTROLES PARA ACCIONES MIENTRAS SE MANTIENE EL BOTON CLICK PULSADO //
	
	
	
	// 98º CONTROLES PARA ACCIONES DE MOVIMIENTO DEL RATON //
		var userPosX = 0;
		$('canvas').addEvent('mousemove', function(event){
			userX = event.page.x - event.target.getPosition().x;
			userY = event.page.y - event.target.getPosition().y;
			
			
			switch(modoJuego){
				// 1 MENU PRINCIPAL //
				case 1: if(userY >= y/2-20 && userY <= y/2+30){
				            menEmpezar = 1;
                            $('canvas').style.cursor = 'pointer';
                        }
                        else{
                            menEmpezar = 0;
                            
                            if(userY >= y/2+60 && userY <= y/2+260){
                                mouseHelp = 1;
                                $('canvas').style.cursor = 'help';
                            }
                            else{
                                mouseHelp = 0;
                                $('canvas').style.cursor = 'default';
                            }
                        }
                        
                        
                        
                        
                        break;
                        
                case 2: mousePosition = Array(userX, userY);
                        
                        break;
                        
                case 3: if(userX >= x/2-100 && userX <= x/2+100 && userY >= y/2+50 && userY <= y/2+90){
                            restartHover = 1;
                        }
                        else restartHover = 0;
                        
                        break;
			}
		});
	// 98º FINAL CONTROLES PARA ACCIONES DE MOVIMIENTO DEL RATON //








	// 99º RELOAD SCREEN //
		reloadGraph = Function.from(function(){
			ctx.clearRect (0,0, x,y); //limpiamos pantalla
			
			switch(modoJuego){
				// 1 MENU PRINCIPAL DEL JUEGO //
				case 1: menuPrincipal();
                
                        helpPlay();
                        
						break;
				// 2 JUEGO //
				case 2: hud();
                
                        generarCaja();
                        
                        moverLanzar();
                        
                        controlLanzar();
                        
                        objetos();
                        
                        colisiones();
                        
                        moverObjetos();
                        
                        controlLevel();
                        
                        disparosEnemigos();
                        
                        moverDisparosEnemigos();
                        
                        controlMuerte();
                        
						break;
				// 3 YOU LOST //
				case 3: gameOver();
                        
						break;
			}
			
		});
        
        periodic = reloadGraph.periodical(drawInterval);
	// 99º FINAL RELOAD SCREEN // */
});
