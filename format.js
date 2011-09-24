/*
 * Modifiers:
 *  -- limit (integer)
 *  -- format (string)
 */

/*
 * Returns a JSONObject with data:
 *
 * {
 *   key   : "company",
 *   argList : list of args,
 *   modifiers : hashtable of modifiers (jsonobject)
 * }
 */
function processText(el, text) {
  // Parse for key words
  var queries = parse(text);

  var objList = [];
  for (index in queries) {
    var totalQuery = queries[index];
    var pipeSplit = totalQuery.split(' | ');
    var queryArgs = pipeSplit[0].split(',');
    var query = queryArgs[0].trim();
    args = [];
    for (argIndex in queryArgs) {
      if (argIndex == 0) { continue; }
      args.push("arg=" + queryArgs[argIndex].trim());
    }
    var modifierList = pipeSplit[1].split(',').map(function(s) { return s.trim(); });
    var modifierMap = convertToMap(modifierList);

    var obj = { key : query, argList : args, modifiers : modifierMap };
    objList.push(obj);
  }

  return objList;
}

function convertToMap(list) {
  var modifiers = {};
  for (index in list) {
    var splitted = list[index].split('=');
    var key = splitted[0];
    var val = splitted[1];
    modifiers[key] = val;
  }

  return modifiers;
}

function parse(text) {
  //TODO: Give ability to put {{key}} inside another {{key}}

  // Find all substrings of the form "{{keywords}}"
  var regex = /\{{2}[^\}]+\}{2}/g;

  var queries = [];
  $.each(text.match(regex), function(index, substring) {
    queries.push(substring.slice(2, -2));
  });
  return queries;
}

/*
 * Returns an unformatted string which is the return value
 * of the associated function.
 *
 * Input token:
 *   -- Query string
 *   -- Arguments
 *   -- (k,v) modifiers
 *
 * Example: {{investors quora, 2001 | format=csv, limit=10}}
*/
function getData(tokenList) {

}

function formatData(dataList, tokenList) {

}

function replaceData(formattedList) {
  // Replace text
  //el.val("lol");
}

// TODO: Get rid of this stuff
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
