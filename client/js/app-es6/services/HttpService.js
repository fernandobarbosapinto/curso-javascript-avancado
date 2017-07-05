class HttpService{

	_handleErrors(res){
		if(!res.ok) throw new Error(res.statusText);
		return res;
	}

	get(url){

		return fetch(url)
			.then(res => this._handleErrors(res))
			.then(res => res.json());

		// return new Promise((resolve, reject) => {

		// 	//alert("Importando Negociações.");
		// 	let xhr = new XMLHttpRequest();
		// 	xhr.open('GET', url);
		// 	xhr.onreadystatechange = () => {
		// 		//0- requisição ainda não iniciada
		// 		//1- conexão com o servidor estabelecida
		// 		//2- requisição recebida
		// 		//3- processando requisição
		// 		//4- requisição está concluída e a resposta está pronta

		// 		if(xhr.readyState == 4){
		// 			if(xhr.status == 200){
		// 				console.log('Obtendo as negociações do servidor.')
	 //                	console.log(JSON.parse(xhr.responseText));
	 //                	resolve(JSON.parse(xhr.responseText));
	                	
		// 			}else{
		// 				console.log(xhr.responseText);
		// 				reject(xhr.responseText);
		// 			}
		// 		}
		// 	};
		// 	xhr.send();
		// });
	}

	post(url, dado) {

		return fetch(url, {
			headers: {'Content-type':'application/json'},
			method: 'post',
			body: JSON.stringify(dado)
		})
		.then(res => this._handleErrors(res));

        // return new Promise((resolve, reject) => {

        //     let xhr = new XMLHttpRequest();
        //     xhr.open("POST", url, true);
        //     xhr.setRequestHeader("Content-type", "application/json");
        //     xhr.onreadystatechange = () => {

        //         if (xhr.readyState == 4) {

        //             if (xhr.status == 200) {

        //                 resolve(JSON.parse(xhr.responseText));
        //             } else {

        //                 reject(xhr.responseText);
        //             }
        //         }
        //     };
        //     xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
        // });

    }

}

