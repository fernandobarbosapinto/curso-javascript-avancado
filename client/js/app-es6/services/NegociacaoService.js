class NegociacaoService {

	constructor(){

		this.http = new HttpService();
	}

     
	cadastra(negociacao){

		return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação cadastrada com sucesso')
            .catch(erro => {
            	console.log(erro);
                throw new Error("Não foi possível adicionar a negociação")
            });

	}

	lista(){

		return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.listaTodos())
            .catch( erro => {
            	console.log(erro);
            	throw new Error('Não foi possível obter as negociações');
            })
	}

	apaga(){

		return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociação apagadas com sucesso')
            .catch( erro => {
            	console.log(erro);
            	throw new Error('Não foi possível apagar as negociações');
            })

	}

    obterNegociacoes() {

        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;

        }).catch(erro => {
            throw new Error(erro);
        });

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

	importa(listaAtual){

		return this.obterNegociacoes()
		//validação da negociação. Importar apenas quando as negociações foram novas.
		.then(negociacoes => 
			negociacoes.filter(negociacao =>
				!listaAtual.some(negociacaoExistente =>
					JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
		)
		.catch(error => {
			console.log(erro);
			throw new Error('Não foi possível buscar negociações para importar');	
		})
	}  

}

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