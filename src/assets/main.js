let answer 	= document.getElementById('answer');
let attempt = document.getElementById('attempt');
let message = document.getElementById('message');
let results = document.getElementById('results');
let guessing = document.getElementById('guessing-div');
let replay = document.getElementById('replay-div');
let code = document.getElementById('code');

function guess() {
    let input = document.getElementById('user-guess'),
    	feedback = "";
    
    if( attempt.value == '' || answer.value == '' )
    {
		setHiddenFields();
    }

    if( validateInput(input.value) ) {
    	attempt.value = parseInt(attempt.value, 10) + 1;
    } else {
    	return false;
    }

    if( getResults(input.value) ) {
    	feedback = 'You Win! :)';
    	showAnswer(true);
    	showReplay();
    } else {
    	if( attempt.value < 10 ) {
			feedback = 'Incorrect, try again.';
		} else {
			feedback = 'You Lose! :(';
			showAnswer(false);
			showReplay();
		}
    }

    console.log('attempt: '+attempt.value, ' feedback: '+feedback);

    setMessage(feedback);
}

//implement new functions here

var pad = (n, s) => ('0000' + n).substr(-s);

var setHiddenFields = function() {
	answer.value 	= pad((Math.floor(10000 * Math.random())).toString(), 4),
	attempt.value 	= 0;
};

var setMessage = function(str) {
	message.innerHTML = str;
};

var validateInput = function(str) {
	if (str.length == 4) {
		return true;
	} else
	{
		setMessage('Guesses must be exactly 4 characters long.');
		return false;
	}
};

var getResults = function(guess) {
	let correctChars 	= 0,
		guessArr 		= guess.split(''),
		answerArr 		= answer.value.split(''),
		htmlStr 		= '';

	htmlStr += '<div class="row">';
	htmlStr += ` <span class="col-md-6">${guess}</span>`;
	htmlStr += ' <div class="col-md-6">';
	

	for( var i = 0; i < guess.length; i++) 
	{
		if( guessArr[i] == answerArr[i] ) {
			htmlStr += '    <span class="glyphicon glyphicon-ok"></span>';
			correctChars++;
		} else if ( answer.value.indexOf(guessArr[i]) > -1 ) {
			htmlStr += '    <span class="glyphicon glyphicon-transfer"></span>';
		} else {
			htmlStr += '    <span class="glyphicon glyphicon-remove"></span>';
		}
	}

	htmlStr += ' </div>';
	htmlStr += '</div>';

	results.innerHTML = htmlStr;

	return (correctChars >= 4);
};

var showAnswer = function(hasWon) {
	code.innerHTML = answer.value;

	if( hasWon ) {
		code.className += " success";
	} else {
		code.className += " failure";
	}
};

var showReplay = function() {
	guessing.style.display = 'none';
	replay.style.display = 'block';
};