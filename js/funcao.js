var sequencia = [];

const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

window.onload = function (){
	for(var i=0;i<4;i++)
		sequencia.push(randomizarNumero(0,2));

	recarregaTela();

	document.body.onkeyup = proximoTecla;

	adicionaEventoBlocos();
}

function adicionaEventoBlocos(){
	for (var id of ['30', '31', '32']) {
		document.getElementById(id).addEventListener('click', function (e) {
			proximo(e.target.id);
		});
	}
}
function proximoTecla(){
	var key = event.which || event.keyCode;

	if (verificaTeclasValidas(key)) {
		acertou = verificaTeclasSequencia(key);

		verificaAcertou(acertou);
		recarregaTela();
	}
}
function proximo(idBloco){
	acertou = verificaBlocosSequencia(idBloco);

	verificaAcertou(acertou);
	recarregaTela();
}
function verificaTeclasValidas(key){
	return (key == KEY_A || key == KEY_S || key == KEY_D);
}
function verificaTeclasSequencia(key) {
	return (key == KEY_A && sequencia[3] == 0) ||
		(key == KEY_S && sequencia[3] == 1) ||
		(key == KEY_D && sequencia[3] == 2);
}
function verificaBlocosSequencia(idBloco){
	return (idBloco == "30" && sequencia[3] == 0) ||
			(idBloco == "31" && sequencia[3] == 1) ||
			(idBloco == "32" && sequencia[3] == 2);
}
function verificaAcertou(acertou){
	if (acertou) {
		arrumaSequencia();
	} else {
		alert("Perdeu");
	}
}
function arrumaSequencia(){
	sequencia[3] = sequencia[2];
	sequencia[2] = sequencia[1];
	sequencia[1] = sequencia[0];
	sequencia[0] = randomizarNumero(0, 2);
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