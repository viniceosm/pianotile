(function() {
	var sequencia = [];
	var ponto = 0;

	var modo = 'ponto';

	//Quando for por tempo
	var limiteBloco = 10;

	const KEY_A = 65;
	const KEY_S = 83;
	const KEY_D = 68;

	const somBloco = ['audio/f1s.ogg', 'audio/g1.ogg', 'audio/g1s.ogg'];

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
		let key = event.which || event.keyCode;

		if (verificaTeclasValidas(key)) {
			let acertou = verificaTeclasSequencia(key);

			verificaAcertou(acertou);
			recarregaTela();
		}
	}
	function proximo(idBloco){
		let acertou = verificaBlocosSequencia(idBloco);

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
			tocarSom(somBloco[sequencia[3]]);
			ponto++;
			mostraPonto();
			arrumaSequencia();
		} else {
			gravaMelhorPontuacao();
			alert("Perdeu!!" +
			"\n\nSua pontuação: " + ponto + 
			"\n\n\Melhor pontuação: " + localStorage.melhorPonto);
			blocoTudoBranco();
			ponto = 0;
			mostraPonto();
		}
	}
	function gravaMelhorPontuacao(){
		if ((typeof localStorage.melhorPonto == 'undefined') || ponto > parseInt(localStorage.melhorPonto)) {
			localStorage.melhorPonto = ponto;
		}
	}
	function mostraPonto(){
		document.querySelector('#pontuacao').innerHTML = ponto;
	}
	function arrumaSequencia(){
		sequencia[3] = sequencia[2];
		sequencia[2] = sequencia[1];
		sequencia[1] = sequencia[0];
		sequencia[0] = randomizarNumero(0, 2);
	}
	function recarregaTela(){
		blocoTudoBranco();
		
		for(var i=0;i<4;i++){
			let eBloco = document.getElementById(i+""+sequencia[i]);
			removeClass(eBloco, 'branco');
			addClass(eBloco, classeBloco());
		}
		
		if(modo=='tempo'){
			adicionaLimiteBlocos();
		}
	}
	function adicionaLimiteBlocos(){
		for (var i = 0; i < 3; i++) {
			limiteBlocoVerifica = limiteBloco - 4;
			if (ponto >= limiteBlocoVerifica) {
				let eBloco;
				for (var j = 0; j < (ponto % limiteBlocoVerifica); j++) {
					eBloco = document.getElementById(j + "" + i);
					removeClass(eBloco, 'branco');
					removeClass(eBloco, 'preto');
					addClass(eBloco, 'roxo');
				}
			}
		}
	}
	function classeBloco(){
		let classeBloco = 'preto';
		return classeBloco;
	}
	function blocoTudoBranco(){
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 3; j++) {
				let eBloco = document.getElementById(i + "" + j);
				removeClass(eBloco, classeBloco());
				addClass(eBloco, 'branco');
			}
		}
	}
	function tocarSom(som){
		var audio = new Audio(som);
		audio.play();
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
})();