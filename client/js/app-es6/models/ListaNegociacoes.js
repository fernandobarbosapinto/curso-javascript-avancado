class ListaNegociacoes{

	constructor(){
		this._negociacoes = [];
		//this._armadilha = armadilha;
		//this._contexto = contexto;
	}

	adiciona(negociacao){
		//Não utilizar esse solução pois ela não é bacana no caso de trabalhar com muitos registros.
		//this._negociacoes = [].concat(this._negociacoes, negociacao);
		this._negociacoes.push(negociacao);
		//this._armadilha(this);
		//Reflect.apply para alterar o contexto de invocação
		//Reflect.apply(this._armadilha, this._contexto, [this]);
	}

	get negociacoes(){
		return [].concat(this._negociacoes);
	}

	esvazia(){

		this._negociacoes = [];
		//this._armadilha(this);
		//Reflect.apply para alterar o contexto de invocação
		//Reflect.apply(this._armadilha, this._contexto, [this]);
	}

	get volumeTotal(){
		return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
	}

	ordena(criterio){
		this._negociacoes.sort(criterio);
	}

	inverteOrdem(){
		this._negociacoes.reverse();
	}
}