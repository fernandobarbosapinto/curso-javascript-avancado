'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
  function NegociacaoService() {
    _classCallCheck(this, NegociacaoService);

    this.http = new HttpService();
  }

  _createClass(NegociacaoService, [{
    key: 'cadastra',
    value: function cadastra(negociacao) {

      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegociacaoDAO(connection);
      }).then(function (dao) {
        return dao.adiciona(negociacao);
      }).then(function () {
        return 'Negociação cadastrada com sucesso';
      }).catch(function (erro) {
        console.log(erro);
        throw new Error("Não foi possível adicionar a negociação");
      });
    }
  }, {
    key: 'lista',
    value: function lista() {

      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegociacaoDAO(connection);
      }).then(function (dao) {
        return dao.listaTodos();
      }).catch(function (erro) {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações');
      });
    }
  }, {
    key: 'apaga',
    value: function apaga() {

      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegociacaoDAO(connection);
      }).then(function (dao) {
        return dao.apagaTodos();
      }).then(function () {
        return 'Negociação apagadas com sucesso';
      }).catch(function (erro) {
        console.log(erro);
        throw new Error('Não foi possível apagar as negociações');
      });
    }
  }, {
    key: 'obterNegociacoes',
    value: function obterNegociacoes() {

      return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (periodos) {

        var negociacoes = periodos.reduce(function (dados, periodo) {
          return dados.concat(periodo);
        }, []);

        return negociacoes;
      }).catch(function (erro) {
        throw new Error(erro);
      });
    }
  }, {
    key: 'obterNegociacoesDaSemana',
    value: function obterNegociacoesDaSemana() {

      return this.http.get('negociacoes/semana').then(function (negociacoes) {
        console.log(negociacoes);
        return negociacoes.map(function (objeto) {
          return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
        });
      }).catch(function (erro) {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações da semana');
      });
    }
  }, {
    key: 'obterNegociacoesDaSemanaAnterior',
    value: function obterNegociacoesDaSemanaAnterior() {

      return this.http.get('negociacoes/anterior').then(function (negociacoes) {
        console.log(negociacoes);
        return negociacoes.map(function (objeto) {
          return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
        });
      }).catch(function (erro) {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações da semana anterior');
      });
    }
  }, {
    key: 'obterNegociacoesDaSemanaRetrasada',
    value: function obterNegociacoesDaSemanaRetrasada() {

      return this.http.get('negociacoes/retrasada').then(function (negociacoes) {
        console.log(negociacoes);
        return negociacoes.map(function (objeto) {
          return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
        });
      }).catch(function (erro) {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações da semana retrasada');
      });
    }
  }, {
    key: 'importa',
    value: function importa(listaAtual) {

      return this.obterNegociacoes()
      //validação da negociação. Importar apenas quando as negociações foram novas.
      .then(function (negociacoes) {
        return negociacoes.filter(function (negociacao) {
          return !listaAtual.some(function (negociacaoExistente) {
            return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
          });
        });
      }).catch(function (error) {
        console.log(erro);
        throw new Error('Não foi possível buscar negociações para importar');
      });
    }
  }]);

  return NegociacaoService;
}();

/*
class NegociacaoService {

	constructor(){

		this.http = new HttpService();
	}

	obterNegociacoesDaSemana(){
		
        return this.http
        .get('negociacoes/semana')
        .then(negociacoes => {
        	console.log(negociacoes);
            return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));

        })
        .catch(erro => {
            console.log(erro);
            throw new Error('Não foi possível obter as negociações da semana');
        })
        
	}

	obterNegociacoesDaSemanaAnterior(){

		return this.http
        .get('negociacoes/anterior')
        .then(negociacoes => {
        	console.log(negociacoes);
            return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));

        })
        .catch(erro => {
            console.log(erro);
            throw new Error('Não foi possível obter as negociações da semana anterior');
    	});
        
	}

	obterNegociacoesDaSemanaRetrasada(){

		return this.http
        .get('negociacoes/retrasada')
        .then(negociacoes => {
        	console.log(negociacoes);
            return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));

        })
        .catch(erro => {
            console.log(erro);
            throw new Error('Não foi possível obter as negociações da semana retrasada');
    	});
        
	}

/*
	obterNegociacoesDaSemanaAnterior(){

		return new Promise((resolve, reject) => {
			//alert("Importando Negociações.");
			let xhr = new XMLHttpRequest();
			xhr.open('GET', 'negociacoes/anterior');
			xhr.onreadystatechange = () => {
				//0- requisição ainda não iniciada
				//1- conexão com o servidor estabelecida
				//2- requisição recebida
				//3- processando requisição
				//4- requisição está concluída e a resposta está pronta

				if(xhr.readyState == 4){
					if(xhr.status == 200){
						console.log('Obtendo as negociações do servidor.')
	                	console.log(JSON.parse(xhr.responseText));
	                	resolve(JSON.parse(xhr.responseText)
	                	.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
	                	
					}else{
						console.log(xhr.responseText);
						reject('Não foi possível obter as negociações da semana anterior.');
					}
				}
			};
			xhr.send();
		});
	}

	obterNegociacoesDaSemanaRetrasada(){

		return new Promise((resolve, reject) => {
			//alert("Importando Negociações.");
			let xhr = new XMLHttpRequest();
			xhr.open('GET', 'negociacoes/retrasada');
			xhr.onreadystatechange = () => {
				//0- requisição ainda não iniciada
				//1- conexão com o servidor estabelecida
				//2- requisição recebida
				//3- processando requisição
				//4- requisição está concluída e a resposta está pronta

				if(xhr.readyState == 4){
					if(xhr.status == 200){
						console.log('Obtendo as negociações do servidor.')
	                	console.log(JSON.parse(xhr.responseText));
	                	resolve(JSON.parse(xhr.responseText)
	                	.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
	                	
					}else{
						console.log(xhr.responseText);
						reject('Não foi possível obter as negociações da semana retrasada.');
					}
				}
			};
			xhr.send();
		});
	}

}*/
//# sourceMappingURL=NegociacaoService.js.map