var pick = function(caseData, functionData){
	switch(caseData) {
		case: 'my-tweets' :
			getTweets();
			break;
		default:
		console.log('LIRI does not know that');
	}
}

var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);