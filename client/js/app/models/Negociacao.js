"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Negociacao = function () {
	function Negociacao(data, quantidade, valor) {
		_classCallCheck(this, Negociacao);

		//this._data = data;
		this._data = new Date(data.getTime()); //Método de programação defenciva para que o programador não consiga manipular a data.
		this._quantidade = quantidade;
		this._valor = valor;
		Object.freeze(this); //Congelando a instância para que não tenha alteração - O object.freeze é shallow, ele fica na superficie. Quando congelamos um valor, não podemos alterá-lo. Porém, como _data é um objeto, não entrará como uma das propriedades do objeto. Então, não é feito o que chamamos de deep freeze. Quando trabalhamos com um objeto e dentro dele temos outras propriedades, estas não ficarão congeladas.
	}
	//Criação do método para obter volume


	_createClass(Negociacao, [{
		key: "volume",
		get: function get() {
			return this._quantidade * this._valor;
		}

		//Métodos Acessadores ou Métodos de Leitura

	}, {
		key: "data",
		get: function get() {
			//return this._data;
			return new Date(this._data.getTime()); //Método de programação defenciva para que o programador não consiga manipular a data.
		}
	}, {
		key: "quantidade",
		get: function get() {
			return this._quantidade;
		}
	}, {
		key: "valor",
		get: function get() {
			return this._valor;
		}
	}]);

	return Negociacao;
}();

// class Aluno {

//     constructor(matricula, nome) {
//         this.matricula = matricula;
//         this.nome = nome;
//     }
// }

// class Prova {

//     constructor(aluno, nota) {
//         this.aluno = aluno;
//         this.nota = nota;
//     }

//     var avaliacoes = [
// 	    new Prova(new Aluno(1, 'Luana'), 8),
// 	    new Prova(new Aluno(2, 'Cássio'), 6),
// 	    new Prova(new Aluno(3, 'Barney'), 9),
// 	    new Prova(new Aluno(4, 'Bira'), 5)
// 	];
// }
//# sourceMappingURL=Negociacao.js.map