// angular.module('myApp', []);

// var theApp = angular.module('myApp');

var theApp = angular.module('myApp', []); // Création et utilisation en même temps

//theApp.controller('productCtrl', function ($scope) { // version déconseillée => plante sur obfuscation
//theApp.controller('productCtrl', ['$scope', function ($s) { // on peut rennomer $scope => + court / obfuscation
theApp.controller('productCtrl', ['$scope', function ($scope) {
	$scope.products=[{"nom":"Massue à pointes", "prix":1200, "qte":1}, {"nom":"Epée céleste", "prix":2500, "qte":1}, {"nom":"Casque en émeraude", "prix":700, "qte":3}];
	
	$scope.total = function total() {

		// methode JS "classique"
		// var _total;
		// for (var i = $scope.products.length - 1; i >= 0; i--) {
		// 	_total += $scope.products[i].prix * $scope.products[i].qte;
		// };
		// return _total;

		// méthode avec map et reduce
		// var totaux = products.map(function(product) { return product.prix * product.qte;});
		// return totaux.reduce(function(total1, total2) {return total1 + total2;});

		return $scope.products.map(function(prd) { return prd.prix * prd.qte}).reduce(function(a,b) {return a + b;});
	};
}])