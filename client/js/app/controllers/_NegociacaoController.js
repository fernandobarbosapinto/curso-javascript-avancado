'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
	function NegociacaoController() {
		_classCallCheck(this, NegociacaoController);

		var $ = document.querySelector.bind(document);

		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');
	}

	_createClass(NegociacaoController, [{
		key: 'adiciona',
		value: function adiciona(event) {
			event.preventDefault();

			var helper = new DateHelper();

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

			var negociacao = new Negociacao(helper.textoParaData(this._inputData.value), this._inputQuantidade.value, this._inputValor.value);

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
	}]);

	return NegociacaoController;
}();
//# sourceMappingURL=_NegociacaoController.js.map