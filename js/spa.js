
const RELPATH_JS_HTML_TEMPLATES = "../html/templates/";

var app = angular.module("StoreApp", ['ngRoute', 'Utils']);

app.constant('APP_TITLE', 'Bienvenue ');
app.value('defaultUser', {"civility":"M.", "surname":"Steve", "name":"Martins Pires"});
app.value('ascending', true);

app.run(['$rootScope','APP_TITLE',function( $rootScope, APP_TITLE) {
	$rootScope.title = APP_TITLE;
	
	var _listA = document.getElementById('menu').getElementsByTagName('A');

	for( var i =0; i < _listA.length; i++) {
		_listA[i].addEventListener('click', activerMenu);
	}
}])

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl : RELPATH_JS_HTML_TEMPLATES+"index-partial.html"
	})
	.when("/products/:id", {
		templateUrl : RELPATH_JS_HTML_TEMPLATES+"products-partial.html"
		, controller : 'ProductsCtrl'
	})
	.when("/cart", {
		templateUrl : RELPATH_JS_HTML_TEMPLATES+"cart-partial.html"
		, controller : 'CartCtrl'
	})
	.when("/about", {
		templateUrl : RELPATH_JS_HTML_TEMPLATES+"a-propos-partial.html"
		, controller : 'AboutCtrl'
	})
	.when("/help", {
		template : '<div class="help">Pour avoir de l\'aide faire un tour sur <a href="http://www.w3schools.com">W3Schools</a></div>'
	})
	.otherwise('/');
}])

///// CONTROLLERS
app.controller('AboutCtrl', ['$scope', 'defaultUser', 'APP_TITLE', 'prettyCaseFunc', function ($scope, defaultUser, APP_TITLE, prettyCaseFunc) {	
	
	$scope.SOCIETY = {"name":"L'échoppe du dragon boîteux (interdit aux gobelins)"/*, "contact":"Steve PIRES"*/, "email":"spires@wemanity.com","tel":"0123456789"};

	defaultUser.civility = "Seigneur ";
	$scope.title = APP_TITLE + " dans l\'échoppe runique, guerrier !";
	$scope.user = defaultUser;

	$scope.prettyCase = prettyCaseFunc;
}]);

app.controller('ProductsCtrl', ['$scope', '$routeParams', 'prettyCaseFunc', function ($scope, $routeParams, prettyCaseFunc, asc) {	
	
	// VARIABLES
	$scope.products = [
		{"id":1,"id_cat":42,"prix":2000.00,"nom":"Massue à pointes séculaire","desc":"Une vielle massue un peu rouillée passée entre les mains de nombreux rois et chevaliers depuis des siècles.","image":"images/produits/massue_a_pointes_seculaire.jpg"}
		,{"id":2,"id_cat":42,"prix":777.00,"nom":"Epée valérienne","desc":"Une simple épée forgée par les anciens sages du mont Valéria.","image":"images/produits/epee_valerienne.jpg"}
		,{"id":18,"id_cat":43,"prix":4500.00,"nom":"Armure complète en mithril","desc":"Une armure faite du métal le plus pur, pour une protection sans faille","image":"images/produits/armure_complete_mithril.jpg"}
		,{"id":19,"id_cat":42,"prix":3600.00,"nom":"Epée impreignée du feu céleste","desc":"Epée de feu céleste à ne pas mettre entre toutes les mains, au risque de se voir embraser par elle","image":"images/produits/epee_feu_celeste.jpg"}
	];
	// $scope.categories = $scope.products.map(function (p) {return p.id_cat;});
 	$scope.categories = [
 		{"id":42, "nom":"Armes", "desc":"Nos armes pour vous garantir la victoire !"},
 		{"id":43, "nom":"Armures", "desc":"Nos armures vous protegerons contre tous les dangers !"}
 	];
 	$scope.currentCat = "";
	$scope.title = "Tous nos produits";
	$scope.sortByPriceAsc = true;
	$scope.sortByNameAsc = false;
	$scope.sortByDescAsc = false;
	$scope.sortField = 'prix';
	$scope.prettyCase = prettyCaseFunc;

	// Augment $scope.products with new property 'quantite'
	$scope.products.map(function(p) {p.quantite=0; return p;})

	// FUNCTIONS
	$scope.sortBy = function(field) {
		switch ( field) {
		  case "prix":
		  $scope.sortByPriceAsc = !$scope.sortByPriceAsc;
		    break;
		  case "nom":
		  $scope.sortByNameAsc = !$scope.sortByNameAsc;
		    break;
		  case "desc":
		  $scope.sortByDescAsc = !$scope.sortByDescAsc;
		    break;
		  default:
		    return;
		}

		if(field.includes($scope.sortField)) {
			if(field.includes('-')) {
				$scope.sortField = field;
			} 
			else {
				$scope.sortField = '-' + field;
			} 	
		}
			
		else {
			$scope.sortField = field;
		}
	}

	$scope.nextProduct = function() {
		if($scope.pos < $scope.products.length-1){
			$scope.pos++;
			$scope.productSelected = $scope.products[$scope.pos];
			$scope.productSaved = angular.copy($scope.productSelected);
		}
		else {
			console.log("Nous n'avons plus d'autres produit !");
		}
	}

	$scope.prevProduct = function() {
		if($scope.pos > 0){
			$scope.pos--;
			$scope.productSelected = $scope.products[$scope.pos];
			$scope.productSaved = angular.copy($scope.productSelected);
		}
		else {
			console.log("Doucement, vous allez casser mon bouton !");
		}
	}

	$scope.reset = function() {
		$scope.products[$scope.pos] = angular.copy($scope.productSaved);
		$scope.productSelected = $scope.products[$scope.pos];
	}

	// Initialize array for first display (would be unsorted otherwise)
	$scope.sortBy(document.getElementsByClassName("sorter")[0].children[0].children[1], 'prix');
	
	var _id = 0;
	if(null != $routeParams.id) {
		_id = $routeParams.id;
	}

	$scope.pos = 0;
	if( 0 != _id){
		$scope.productSelected = $scope.products.find(function(product){return product.id == _id });
		// console.log('selected prod:' + $scope.productSelected);
		if( null != $scope.productSelected) {
			$scope.pos = $scope.products.indexOf( $scope.productSelected);
//			console.log('pos: '+$scope.pos);
		}
	}
	
	if( null == $scope.productSelected) {
		$scope.productSelected = $scope.products[0];
	}

	$scope.originalProduct = angular.copy($scope.productSelected);
}]);

app.controller('CartCtrl', ['$scope', function ($scope) {	
	$scope.title = "Vos choix";
}]);


///// FILTRES
app.filter('prettyCase', ['prettyCaseFunc', function(prettyCaseFunc) { 
	return prettyCaseFunc;
}]);


///// DIRECTIVES
app.directive('cbErrorRequired', [function () {
	return {
		restrict: 'E',
		templateUrl: 'js/directives/cb-error-required.html'
	};
}])

///// JS FUNCTIONS
function activerMenu( e) {
//	e.preventDefault();
	document.getElementsByClassName('current_page_item')[0].className = '';
	this.parentElement.className = 'current_page_item';
}
