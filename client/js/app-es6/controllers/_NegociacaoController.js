class NegociacaoController{

	constructor(){

		let $ = document.querySelector.bind(document);

		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');
	}

	adiciona(event){
		event.preventDefault();

		let helper = new DateHelper();

		// let data = new Date(this._inputData.value.replace(/-/g, ','));
		// let data = new Date(...
		// 	this._inputData.value
		// 		.split('-')
		// 		.map((item, indice) => item - indice % 2)//arrow functions
		// 		.map(function(item, indice){
		// 			fazer uma solução menos verbosa
		// 			return item - indice % 2;
		// 			Solução verbosa
		// 			if (indice == 1) {
		// 				return item - 1;
		// 			}
		// 			return item;
		// 		})
		// );//...spread operator cada ponto é um parametro do meu array
		
		//console.log(data);

		// console.log(typeof(this._inputData.value));
		// console.log(this._inputData.value);

		let negociacao = new Negociacao(

			helper.textoParaData(this._inputData.value),
			this._inputQuantidade.value,
			this._inputValor.value

			);

		console.log(negociacao);

		// let diaMesAno = negociacao.data.getDate() 
		// 	+ '/' + (negociacao.data.getMonth() + 1)
		// 	+ '/' + negociacao.data.getFullYear();

		// console.log(diaMesAno);

		//A forma declarado abaixo não é muito performatica, pois ela precisa percorrer o DOM toda a vez que é incluida uma negociação. 
		// let $ = document.querySelector.bind(document);

		// let inputData = $('#data');
		// let inputQuantidade = $('#quantidade');
		// let inputValor = $('#valor');

		// console.log(this._inputData.value);
		// console.log(this._inputQuantidade.value);
		// console.log(this._inputValor.value);

	}
}



