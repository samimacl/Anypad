
/*
Verwendbare Methoden:

//MARK Suche
seachStringInString -> Gibt alle Ergebnisse im String zurück
searchStringInStringBeginningAtIndex -> Gibt alle Ergebnisse im String zurück ab bestimmten Index
searchStringInStringCaseInSensitive -> Gibt alle Ergebnisse zurück, allerdings wird groß/kleinschreibung beachtet
searchStringInStringTillFirstMatch -> Gibt erstes Ergebnis zurück

//MARK ersetzen
replaceStringInString -> ersetzt alle Elemente im String
replaceStringInStringAtIndex -> erstetzt Element am index

//MARK Attribute
stringIsFat -> überprüfung ob String <b> ist
stringIsKursiv -> überprüfung ob String <i> ist
stringIsUnderlined -> überprüfung ob String <u> ist
makeStringFat 
makeStringKursiv
makeStringUnderlined
removeFatAttrFromString
removeKursivAttrFromString
removeUnderLinedFromString


//MARK Helper
addTagsToString
removeTagsFromString
getRegexForSearchString
executeSearchRegex
*/


var util = util || {};
util.regex = util.regex || function () {
    
    //REGEX
    this.addSpanWithAttributesToString = function(str, attr)
    {
        var open = "<span " + attr + ">";
        var close = "</span>";

        return this.addTagsToString(str,open,close);
    }

    this.searchAndMarkText = function(forString, inString)
    {
        var repl = "<b>" + inString + "</b>";
        return this.replaceStringInString(inString, repl, forString).result;
    }

  this.searchStringInString = function(searchString, inString, attributes)
  {
      var regex = this.getRegexForSearchString(searchString, null, null, attributes)
      return this.executeSearchRegex(inString, regex);
  }

  this.searchStringInStringBeginningAtIndex = function (searchString, beginningAtIndex, inString, attributes)
  {
      searchString = this.searchString.substring(beginningAtIndex);
      var regex = this.getRegexForSearchString(searchString, null, null, attributes);
      return this.executeSearchRegex(inString, regex);
  }

  this.searchStringInStringCaseInSensitive = function (searchString, inString)
  {
      var regex = this.getRegexForSearchString(searchString, null, null, "gi")
      return this.executeSearchRegex(inString, regex);
  }

  this.searchStringInStringTillFirstMatch = function (searchString, inString)
  {
      var regex = this.getRegexForSearchString(searchString, null, null, null)
      return this.executeSearchRegex(inString, regex);
  }

  this.replaceStringInStringAtIndex = function (searchString, replaceString, inString, AtIndex)
  {
      var strs = this.splitString(inString, AtIndex);
      var inSubString = strs[1];
      var regex = this.getRegexForSearchString(searchString, null, null, "i");
      var newStr = inSubString.replace(regex, replaceString);

      return strs[0] + newStr;
  }

  this.replaceStringInString = function (searchString,replaceString, inString)
  {
      var regexA = this.getRegexForSearchString(searchString, null,null, "gi");
      // var regexB = getRegexForSearchString(replaceString, null,null, "gi");

      var results = this.executeSearchRegex(inString, regexA);
      var ret = {};
      if (results.length !== 0)
      {
          ret["replaced"] = results;
      }

      var newstr = inString.replace(regexA, replaceString);
      ret["result"] = newstr;

      return ret;
  }

  //Art

  this.makeStringFat = function (str)
  {
      return this.addTagsToString(str, "<b>", "</b>");
  }

  this.makeStringKursiv = function (str)
  {
      return this.addTagsToString(str, "<i>", "</i>");
  }

  this.makeStringUnderlined = function (str)
  {
      return this.addTagsToString(str, "<u>", "</u>");
  }

  this.stringIsFat = function (str)
  {
      var res = this.getTagsFromString(str);
      if (res.length !== 0)
      {
          if (res[0] == "<b>")
          {
              if (res[res.length - 1] == "</b>")
              {
                    return true;
              }
          }
      }

      return false;
  }

  this.stringIsKursiv = function (str)
  {
      var res = this.getTagsFromString(str);
      if (res.length !== 0)
      {
          if (res[0] == "<i>")
          {
              if (res[res.length - 1] == "</i>")
              {
                    return true;
              }
          }
      }

      return false;

  }

  this.stringIsUnderlined = function (str)
  {
      var res = this.getTagsFromString(str);
      if (res.length !== 0)
      {
          if (res[0] == "<u>")
          {
              if (res[res.length - 1] == "</u>")
              {
                    return true;
              }
          }
      }

      return false;

  }

  this.stringHasTags = function(str, opentag, closingTag)
  {
        var res = this.getTagsFromString(str);
      if (res.length !== 0)
      {
          var beg = res[0].found;
          var end = res[res.length - 1].found;
          if (beg == opentag)
          {
              if (end == closingTag)
              {
                    return true;
              }
          }
      }

      return false;
  }

  this.remvoeAllAttrFromString = function (str)
  {

  }

  this.removeFatAttrFromString = function (str)
  {
      return this.removeTagsFromString(str, "<b>", "</b>");
  }

  this.removeKursivAttrFromString = function (str)
  {
      return this.removeTagsFromString(str, "<i>", "</i>");
  }

  this.removeUnderLinedFromString = function (str)
  {
      return this.removeTagsFromString(str, "<u>", "</u>");
  }

  this.addTagsToString = function (str, openingTag, closingTag)
  {
      return openingTag + str + closingTag;
  }

  this.getTagsFromString = function (str)
  {
      var reg = new RegExp("<[^>]*>", "gi");

      return this.executeSearchRegex(str, reg);
  }

  this.removeTagsFromString = function (str, opentag, closingTag)
  {
      var wobeg = this.removeOpeningTag(str, opentag);
      var wobegend = this.removeClosingTag(wobeg, closingTag);
      return wobegend;
  }

  this.removeOpeningTag = function (str, tag)
  {
      var res = this.searchStringInStringTillFirstMatch(tag, str);
      if (res.length != 0)
      {
          var first = res[0];
          var ret = this.replaceStringInStringAtIndex(tag, "", str, first.index);
          return ret;
      }

      return str;
  }

  this.removeClosingTag = function (str, tag)
  {
        var res = this.searchStringInString(tag, str, "gi");
        

      if (res.length != 0)
      {
          var last = res[res.length - 1];
          var ret = this.replaceStringInStringAtIndex(tag, "", str, last.index);
          return ret;
      }

      return str;
  }

  this.removeSpanWithAttributes = function(str)
  {
      var regopen = new RegExp("<span[^>]*>", "gi");
      var regclose = new RegExp("</span[^>]*>", "gi");
      return this.removeTagsFromString(str, regopen, regclose);
  }

  //Helper

    this.executeSearchRegex = function (text, regex) {
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

  this.getRegexForSearchString = function (searchString, openingTag, closingTag, attributes)
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

  this.splitString = function (str, index) {
        return [str.substring(0, index), str.substring(index)];
    }
};
