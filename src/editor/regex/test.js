function executeSearchRegex(text, regex) {
    if (regex.constructor !== RegExp) {
        throw new Error('not RegExp');
    }

    var res = [];
    var match = null;

    if (regex.global) {
        while (match = regex.exec(text)) {
            res.push({
                found:match,
                index:match.index
            });
        }
    }
    else {
        if (match = regex.exec(text)) {
            res.push(match);
        }
    }


    return res;
}

function searchStringInString(searchString, inString, attributes)
{
    var regex = getRegexForSearchString(searchString, null, null, attributes)
    return executeSearchRegex(inString, regex);
}

function searchStringInStringWithIndex(searchString, beginningAtIndex, inString, attributes)
{
    searchString = searchString.substring(beginningAtIndex);
    var regex = getRegexForSearchString(searchString, null, null, attributes);
    return executeSearchRegex(inString, regex);
}

function searchStringInStringCaseInSensitive(searchString, inString)
{
    var regex = getRegexForSearchString(searchString, null, null, "gi")
    return executeSearchRegex(inString, regex);
}

function searchStringInStringTillFirstMatch(searchString, inString)
{
    var regex = getRegexForSearchString(searchString, null, null, null)
    return executeSearchRegex(inString, regex);
}

function replaceStringInString(searchString,replaceString, inString)
{
    var regexA = getRegexForSearchString(searchString, null,null, "gi");
    // var regexB = getRegexForSearchString(replaceString, null,null, "gi");

    var results = executeSearchRegex(inString, regexA);
    var ret = {};
    if (results.length !== 0)
    {
        ret["replaced"] = results;
    }

    var newstr = inString.replace(regexA, replaceString);
    ret["result"] = newstr;

    return ret;
}

function getRegexForSearchString(searchString, openingTag, closingTag, attributes)
{
    var regString = "";
    if (openingTag != null)
    {
        regString += openingTag;
    }

    regString += searchString; 

    if (closingTag != null)
    {
        regString += closingTag;
    }

    if (attributes == null)
    {
        attributes = "";
    }

    var retRegex = new RegExp(regString, attributes);
    return retRegex;
}