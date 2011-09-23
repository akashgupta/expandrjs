function processText(el, text) {
  // Parse for key words
  var phrases = parse(text);

	// Match against rules
	var sources = getSources(phrases);
  console.log("Sources: " + sources);

	// Search for data

	// Format response

	// Replace text
	el.val(sources[0]);
}

function parse(text) {
	//TODO: Give ability to put {{key}} inside another {{key}}
	
	// Find all substrings of the form "{{keywords}}"
	var regex = /\{{2}[^\}]+\}{2}/g;

  var phrases = [];
	$.each(text.match(regex), function(index, substring) {
	  phrases.push(substring.slice(2, -2));
	});
	return phrases;
}

function getSources(phrases) {
  // Get rule table
	var ruleTable = JSON.parse(localStorage["ruleTable"]);

  var sources = [];
	for (i in phrases) {
		for (reString in ruleTable) {
		  var re = new RegExp(reString);
		  var matched = phrases[i].match(re);
			if (matched) {
			  var funcString = ruleTable[reString];
				eval("fn=" + funcString);
				sources.push(fn());
			}
		}
	}

	return sources;
}
