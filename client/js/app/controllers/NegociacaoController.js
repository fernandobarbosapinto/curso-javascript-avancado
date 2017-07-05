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

		this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

		this._mensagemView = this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

		this.ordemAtual = '';

		this._service = new NegociacaoService();

		this._init();
	}

	_createClass(NegociacaoController, [{
		key: '_init',
		value: function _init() {
			var _this = this;

			//DAO
			this._service.lista().then(function (negociacoes) {
				return negociacoes.forEach(function (negociacao) {
					return _this._listaNegociacoes.adiciona(negociacao);
				});
			}).catch(function (erro) {
				return _this._mensagem.texto = error;
			});

			//Importar negociaçoes automaticamente a cada 3 segundos	
			setInterval(function () {
				_this.importaNegociacoes();
			}, 30000);
		}
	}, {
		key: 'adiciona',
		value: function adiciona(event) {
			var _this2 = this;

			event.preventDefault();

			var negociacao = this._criaNegociacao();

			this._service.cadastra(negociacao).then(function (mensagem) {
				_this2._listaNegociacoes.adiciona(negociacao);
				_this2._mensagem.texto = mensagem;
				_this2._limpaFormulario();
			}).catch(function (erro) {
				return _this2._mensagem.texto = erro;
			});
			/*
   try{
   	this._listaNegociacoes.adiciona(this._criaNegociacao());
   	//this._negociacoesView.update(this._listaNegociacoes);
   		this._mensagem.texto = "Negociação adicionada com sucesso";
   	//this._mensagemView.update(this._mensagem);
   		this._limpaFormulario();
   	//console.log(this._listaNegociacoes.negociacoes);
   	// console.log(negociacao);
   	// console.log(DateHelper.dataParaTexto(negociacao.data));
   	}catch(erro){
   	this._mensagem.texto = erro;
   }
   */
		}
	}, {
		key: 'importaNegociacoes',
		value: function importaNegociacoes() {
			var _this3 = this;

			this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
				return negociacoes.forEach(function (negociacao) {
					_this3._listaNegociacoes.adiciona(negociacao);
					_this3._mensagem.texto = 'Negociações do período importadas com sucesso';
				});
			}).catch(function (error) {
				return _this3._mensagem.texto = error;
			});
			/*
   		Promise.all([
   				service.obterNegociacoesDaSemana(),
   				service.obterNegociacoesDaSemanaAnterior(),
   				service.obterNegociacoesDaSemanaRetrasada()
   			]).then(negociacoes => {
   				negociacoes
   					.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
   					.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
   				this._mensagem.texto = 'Negociações importadas com sucesso';
   					
   			}).catch(erro => this._mensagem.texto = erro);
   
   
   		
   		service.obterNegociacoesDaSemana()
   			.then(negociacoes => {
   				negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
   				this._mensagem.texto = 'Negociação da semana obtida com sucesso';
   			})
   			.catch(erro => this._mensagem.texto = erro);
   
   		service.obterNegociacoesDaSemanaAnterior()
   			.then(negociacoes => {
   				negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
   				this._mensagem.texto = 'Negociação da semana anterior obtida com sucesso';
   			})
   			.catch(erro => this._mensagem.texto = erro);
   
   		service.obterNegociacoesDaSemanaRetrasada()
   			.then(negociacoes => {
   				negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
   				this._mensagem.texto = 'Negociação da semana retrasada obtida com sucesso';
   			})
   			.catch(erro => this._mensagem.texto = erro);
   		*/

			/*
   let service = new NegociacaoService();
   
   service.obterNegociacoesDaSemana((erro, negociacoes) => {
   	if(erro){
   		this._mensagem.texto = erro;
   		return;
   	}
   		negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
   				
   	service.obterNegociacoesDaSemanaAnterior((erro, negociacoes) => {
   		if(erro){
   			this._mensagem.texto = erro;
   			return;
   		}
   			negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
   		
   		service.obterNegociacoesDaSemanaRetrasada((erro, negociacoes) => {
   			if(erro){
   				this._mensagem.texto = erro;
   				return;
   			}
   				negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
   			this._mensagem.texto = 'Negociações importadas com sucesso'
   		});
   	});
   });*/
		}
	}, {
		key: '_criaNegociacao',
		value: function _criaNegociacao() {
			return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
		}
	}, {
		key: 'apaga',
		value: function apaga() {
			var _this4 = this;

			this._service.apaga().then(function (mensagem) {
				_this4._mensagem.texto = mensagem;
				_this4._listaNegociacoes.esvazia();
			}).catch(function (erro) {
				return _this4._mensagem.texto = erro;
			});

			// ConnectionFactory
			// 	.getConnection()
			// 	.then(connection => new NegociacaoDAO(connection))
			// 	.then(dao => dao.apagaTodos())
			// 	.then(mensagem => {
			// 		this._mensagem.texto = mensagem;
			// 		this._listaNegociacoes.esvazia();
			// 	});
			/*	
   this._listaNegociacoes.esvazia();
   //this._negociacoesView.update(this._listaNegociacoes);
   	this._mensagem.texto = 'Negociações apagadas com sucesso';
   //this._mensagemView.update(this._mensagem);
   */
		}
	}, {
		key: '_limpaFormulario',
		value: function _limpaFormulario() {
			this._inputData.value = '';
			this._inputQuantidade.value = 1;
			this._inputValor.value = 0.0;

			this._inputData.focus();
		}
	}, {
		key: 'abort',
		value: function abort() {

			ConnectionFactory.getConnection().then(function (connection) {

				var transaction = connection.transaction(['negociacoes'], 'readwrite');

				var store = transaction.objectStore('negociacoes');

				var negociacao = new Negociacao(new Date(), 1, 200);

				var request = store.add(negociacao);

				// #### VAI CANCELAR A TRANSAÇÃO. O evento onerror será chamado.
				transaction.abort();

				transaction.onabort = function (e) {
					console.log(e);
					console.log('Transação abortada');
				};

				request.onsuccess = function (e) {

					console.log('Negociação incluida com sucesso');
				};

				request.onerror = function (e) {

					console.log('Não foi possível incluir a negociação');
				};
			});
		}
	}, {
		key: 'ordena',
		value: function ordena(coluna) {
			if (this._ordemAtual == coluna) {
				this._listaNegociacoes.inverteOrdem();
			} else {
				this._listaNegociacoes.ordena(function (a, b) {
					return a[coluna] - b[coluna];
				});
			}
			this._ordemAtual = coluna;
		}
	}]);

	return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map