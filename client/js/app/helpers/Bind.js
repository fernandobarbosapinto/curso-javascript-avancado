"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bind =

//Utilizando REST OPERATION ==> ...props
//O padrão de projeto Factory é um dos padrões mais utilizados no desenvolvimento. 
//Ele é mais um da categoria dos patterns responsáveis por criar objetos, como o Builder e o Prototype.
function Bind(model, view) {
	_classCallCheck(this, Bind);

	for (var _len = arguments.length, props = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		props[_key - 2] = arguments[_key];
	}

	var proxy = ProxyFactory.create(model, props, function (model) {
		view.update(model);
	});

	view.update(model);
	return proxy;
};
//# sourceMappingURL=Bind.js.map