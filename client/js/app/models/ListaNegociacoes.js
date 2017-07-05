"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListaNegociacoes = function () {
	function ListaNegociacoes() {
		_classCallCheck(this, ListaNegociacoes);

		this._negociacoes = [];
		//this._armadilha = armadilha;
		//this._contexto = contexto;
	}

	_createClass(ListaNegociacoes, [{
		key: "adiciona",
		value: function adiciona(negociacao) {
			//Não utilizar esse solução pois ela não é bacana no caso de trabalhar com muitos registros.
			//this._negociacoes = [].concat(this._negociacoes, negociacao);
			this._negociacoes.push(negociacao);
			//this._armadilha(this);
			//Reflect.apply para alterar o contexto de invocação
			//Reflect.apply(this._armadilha, this._contexto, [this]);
		}
	}, {
		key: "esvazia",
		value: function esvazia() {

			this._negociacoes = [];
			//this._armadilha(this);
			//Reflect.apply para alterar o contexto de invocação
			//Reflect.apply(this._armadilha, this._contexto, [this]);
		}
	}, {
		key: "ordena",
		value: function ordena(criterio) {
			this._negociacoes.sort(criterio);
		}
	}, {
		key: "inverteOrdem",
		value: function inverteOrdem() {
			this._negociacoes.reverse();
		}
	}, {
		key: "negociacoes",
		get: function get() {
			return [].concat(this._negociacoes);
		}
	}, {
		key: "volumeTotal",
		get: function get() {
			return this._negociacoes.reduce(function (total, n) {
				return total + n.volume;
			}, 0.0);
		}
	}]);

	return ListaNegociacoes;
}();
//# sourceMappingURL=ListaNegociacoes.js.map