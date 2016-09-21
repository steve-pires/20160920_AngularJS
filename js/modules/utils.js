
angular.module('Utils', [])
	.value('defaultUser', {"civility":"M.", "surname":"Steve", "name":"Martins Pires"})
	.value('prettyCaseFunc', function( stringToPrettify) {
		var _result = '';
		var _words = stringToPrettify.split(' ');

		for (var i = 0 ; i<= _words.length - 1; i++) {
			var _word = _words[i].toLowerCase();
			if('' != _word) {
				var _newWord = _word[0].toUpperCase() + _word.substring(1);
				if(0 != i) { _result += ' '};
				_result += _newWord;
			}
		}
		return _result;
	});