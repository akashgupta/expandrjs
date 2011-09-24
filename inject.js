$(document).ready(function() {

  // Build a test map
  var testFunction = function() { return 'accel'; }.toString();
  localStorage["ruleTable"] = JSON.stringify({ "investors .+" : testFunction });

  // Save the most recently focused upon text box
  var el;
  $('input[type="text"]').focus(function() {
    el = $(this);
  });

  window.addEventListener("keyup", function(event) {
		if (event.shiftKey && event.keyCode == 221) {
			// Read text
      var text = el.val();
      if (text.length < 4 || text[text.length-2] != '}') {
        return;
			}

      var token = processText(el, text); // returns jsonobject of queries
			var data = getData(token);
			var formatted = formatData(data, token);
			replaceData(formatted);
    }
  }, false);
});
