class Negociacao{

	constructor(data, quantidade, valor){

		//this._data = data;
		this._data = new Date(data.getTime());//Método de programação defenciva para que o programador não consiga manipular a data.
		this._quantidade = quantidade;
		this._valor = valor;
		Object.freeze(this); //Congelando a instância para que não tenha alteração - O object.freeze é shallow, ele fica na superficie. Quando congelamos um valor, não podemos alterá-lo. Porém, como _data é um objeto, não entrará como uma das propriedades do objeto. Então, não é feito o que chamamos de deep freeze. Quando trabalhamos com um objeto e dentro dele temos outras propriedades, estas não ficarão congeladas.
	}
	//Criação do método para obter volume
	get volume(){
		return this._quantidade * this._valor;
	}

	//Métodos Acessadores ou Métodos de Leitura
	get data(){
		//return this._data;
		return new Date(this._data.getTime()); //Método de programação defenciva para que o programador não consiga manipular a data.
	}

	get quantidade(){
		return this._quantidade;
	}

	get valor(){
		return this._valor;
	}
}

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