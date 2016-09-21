var SOCIETY = {"name":"Echoppe du dragon boîteux (interdit aux gobelins)", "contact":"Steve PIRES", "email":"spires@wemanity.com","tel":"0123456789"};

$(document).ready(init);

function init() {
	// 'index OK!'.show();
	// 'index OK!'.show.show();
	// String.prototype.show.show();
	// (17).show();

	$("#menu a ").click( handleMenu);
	$("#menuAPropos").click( handleAbout);
	$("#menuIndex").click( handleIndex);
}