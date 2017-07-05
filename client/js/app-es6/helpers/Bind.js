class Bind{

	//Utilizando REST OPERATION ==> ...props
	//O padrão de projeto Factory é um dos padrões mais utilizados no desenvolvimento. 
	//Ele é mais um da categoria dos patterns responsáveis por criar objetos, como o Builder e o Prototype.
	constructor(model, view, ...props){

		let proxy = ProxyFactory.create(model, props, model =>{
			view.update(model);
		});

		view.update(model);
		return proxy;
	}
}