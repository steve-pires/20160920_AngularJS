/// JS FUNCTIONS FILE

const DEBUG_MODE = false;

const RELPATH_JS_LIB_HTML_TEMPLATES = "../../html/templates/";

/// PROTOTYPES
String.prototype.show 
= Function.prototype.show 
= Number.prototype.show 
= (function( dm) {
	if( dm) {
		return closureAlert();
	}
	else {
		return closureLog();
	}
})( DEBUG_MODE);


/// CLOSURES
function closureAlert() {
	return function() { alert( this); }
}

function closureLog() {
	return function () { console.log( this); }
}


/// GENERIC FUNCTIONS
function handleMenu(ev) {
	
	ev.preventDefault();

	$(".current_page_item").removeClass();
	$(this).parent().addClass("current_page_item");
}

function displayPartial( data) {
	$("#dzMain").html(data);
}
function modifyPartialTitle( title) {
	$("#content h2.title:first-child a").text(title);
}


/// ABOUT PAGE
function handleAbout() {
	$.get( RELPATH_JS_LIB_HTML_TEMPLATES+'a-propos-partial.html', displayAbout);
	modifyPartialTitle("A propos de la meilleure échoppe");
}
function displayAbout( data){
	var _data = data;
	SOCIETY.name.show();
	_data = _data.replace('{{SOCIETY.name}}', SOCIETY.name);
	_data = _data.replace('{{SOCIETY.contact}}', SOCIETY.contact);
	_data = _data.replace('{{SOCIETY.email}}', SOCIETY.email);
	_data = _data.replace('{{SOCIETY.tel}}', SOCIETY.tel);
	displayPartial( _data);
}

/// INDEX PAGE
function handleIndex() {
	$.get( RELPATH_JS_LIB_HTML_TEMPLATES+'index-partial.html', displayPartial);
	modifyPartialTitle("Bienvenue dans l'échoppe runique, guerrier !");
}