class NegociacaoController{

	constructor(){

		let $ = document.querySelector.bind(document);

		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');

		this._listaNegociacoes = new Bind(
			new ListaNegociacoes(),
			new NegociacoesView($('#negociacoesView')),
			'adiciona','esvazia', 'ordena', 'inverteOrdem');
		
		this._mensagemView = 
		this._mensagem = new Bind(
			new Mensagem(),
			new MensagemView($('#mensagemView')),
			'texto');

		this.ordemAtual = '';
		
		this._service = new NegociacaoService();

		this._init();


	}

	_init(){

		//DAO
		this._service
			.lista()
			.then(negociacoes =>
				negociacoes.forEach(negociacao => 
					this._listaNegociacoes.adiciona(negociacao)))
			.catch(erro => this._mensagem.texto = error);

		//Importar negociaçoes automaticamente a cada 3 segundos	
		setInterval(() => {
			this.importaNegociacoes();
		}, 30000);

	}

	adiciona(event){
		event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem; 
                this._limpaFormulario();  
            }).catch(erro => this._mensagem.texto = erro);
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

	importaNegociacoes(){

		this._service
			.importa(this._listaNegociacoes.negociacoes)
			.then(negociacoes => negociacoes.forEach(negociacao => {
				this._listaNegociacoes.adiciona(negociacao);	
				this._mensagem.texto = 'Negociações do período importadas com sucesso';
			}))
	        .catch(error => this._mensagem.texto = error);  
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

	_criaNegociacao(){
		return new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			parseInt(this._inputQuantidade.value),
			parseFloat(this._inputValor.value)
		);
	}

	apaga(){

		this._service
			.apaga()
			.then(mensagem => {
				this._mensagem.texto = mensagem;
				this._listaNegociacoes.esvazia();
			}).catch(erro => this._mensagem.texto = erro);

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

	_limpaFormulario(){
		this._inputData.value = '';
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;

		this._inputData.focus();
	}

	abort(){

		ConnectionFactory
			.getConnection()
			.then(connection => {

				let transaction = connection.transaction(['negociacoes'], 'readwrite');

	            let store = transaction.objectStore('negociacoes');

	            let negociacao = new Negociacao(new Date(), 1, 200);

	            let request = store.add(negociacao);

	            // #### VAI CANCELAR A TRANSAÇÃO. O evento onerror será chamado.
	            transaction.abort(); 

	            transaction.onabort = e => {
	                console.log(e);
	                console.log('Transação abortada');
	            };

	            request.onsuccess = e => {

	                console.log('Negociação incluida com sucesso');
	            };

	            request.onerror = e => {

	                console.log('Não foi possível incluir a negociação');
	            };

			})
	}

	ordena(coluna){
		if(this._ordemAtual == coluna){
			this._listaNegociacoes.inverteOrdem();
		}else{
			this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
		}
		this._ordemAtual = coluna;
	}

}



