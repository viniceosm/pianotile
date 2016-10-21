var sequencia=[];
window.onload = function (){

	for(var i=0;i<4;i++)
		sequencia.push(randomizarNumero(0,2));

	recarregaTela();
	// proximo("30");

	document.body.onkeyup=function(){
		var key = event.which || event.keyCode;
		var acertou = false;

		//A 65, S 83, D 68
		if (key==65 || key==83 || key==68){
			if(key==65 && sequencia[3]==0){
				acertou = true;
			}else
			if(key==83 && sequencia[3]==1){
				acertou = true;
			}else
			if(key==68 && sequencia[3]==2){
				acertou = true;
			}

			if(acertou){
				sequencia[3] = sequencia[2];
				sequencia[2] = sequencia[1];
				sequencia[1] = sequencia[0];
				sequencia[0] = randomizarNumero(0,2);
			}else{
				alert("Perdeu");
			}
			recarregaTela();
		}
	}

	
}
function proximo(idBloco){
	var acertou = false;
	if(idBloco=="30" && sequencia[3]==0){
		acertou = true;
	}else
	if(idBloco=="31" && sequencia[3]==1){
		acertou = true;
	}else
	if(idBloco=="32" && sequencia[3]==2){
		acertou = true;
	}
	
	if(acertou){
		sequencia[3] = sequencia[2];
		sequencia[2] = sequencia[1];
		sequencia[1] = sequencia[0];
		sequencia[0] = randomizarNumero(0,2);
	}else{
		alert("Perdeu");
	}
	recarregaTela();
}
function recarregaTela(){
	acertou = false;
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			var eBloco = document.getElementById(i+""+j);
			removeClass(eBloco,"preto");
			addClass(eBloco,"branco");
		}
	}
	for(var i=0;i<4;i++){
		var eBloco = document.getElementById(i+""+sequencia[i]);
		removeClass(eBloco,"branco");
		addClass(eBloco,"preto");
	}
}
function randomizarNumero(min, max){
	return Math.floor(Math.random() * ((max+1) - min)) + min;
}
function removeClass(el, classe){
	var elClass = ' '+el.className+' ';
	while(elClass.indexOf(' '+classe+' ')!=-1){
		elClass = elClass.replace(' '+classe+' ', ' ');
	}
	el.className = elClass;
}
function addClass(el, classe){
    el.className += ' '+classe;   
}