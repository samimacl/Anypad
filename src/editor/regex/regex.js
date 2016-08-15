
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

//id immer search

var util = util || {};
util.regex = util.regex || function () {
    
    //REGEX

    //span wird u.a. benötigt, um String verschiedene Attribute (attr) mitzugeben bspw. <p>My mother has <span style="color:blue">blue</span> eyes.</p>
    //es wird also ein opening (var open) span tag gebildet mit den Attributen und ein closingtag (var close), der zu verwendene String (str) wird hier zwischen eingefügt
    //Tags werden mit Methode addTagsToString angefügt
    //Rückgabewert ist der veränderte string
    this.addSpanWithAttributesToString = function(str, attr)
    {
        var open = "<span " + attr + ">";
        var close = "</span>";

        return this.addTagsToString(str,open,close);
    }


    //Text (inString) wird durchsucht und die gefundenen Ergebnisse werden markiert
    //es wird ein replaceString gebildet (repl), welcher aus dem searchString (forString) besteht, eingeschlossen von HTML Tags (repl)
    //sämtliche gefundenen Inhalte im Text werden schließlich durch replaceStringInString durch die markierten Inhalte ersetzt
    //rückgabewert ist der markierte text

    this.replaceStringAtID = function(ID, replaceString, inString)
    {
        var regexString = "<\/?span[^>]*id=" + "'" + ID + "'" + ">" + "(.|\n)*?<\/span>";

        var regex = new RegExp(regexString, "i");
        inString = inString.replace(regex, replaceString);

        return inString;
    }

    this.searchAndMarkTextIgnoringTags = function (forString, inString)
    {
        inString = this.removeSpanWithAttributes(inString);
        var check = this.searchStringInStringTillFirstMatch(forString, inString);
        
        var res = {
            search: forString,
            default: inString,
            results: []
        };

        if (check.length != 0) {
            var tagOpened = false;
            var tagIsDiv = false;



            var currentID = 0;

            for (var i = 0; i < inString.length;) {
                var curChar = inString.charAt(i).toLowerCase();
                if (tagOpened) {
                    if (curChar == '>') {
                        tagOpened = false;
                    }

                    i++;
                }

                else {
                    if (curChar == '<') {
                        tagOpened = true;
                        i++;
                    }

                    else {
                        var startIndex = i;
                        for (var j = 0; j < forString.length; j++) {
                            if (curChar == forString.charAt(j).toLowerCase()) {
                                if (j == forString.length - 1) {
                                    var open = "<span style='color:blue;background-color: yellow' id=" + "searchRes " + currentID + ">";
                                    var close = "</span>";

                                    inString = [inString.slice(0, startIndex), open, inString.slice(startIndex)].join('');
                                    var endIndex = startIndex + open.length + forString.length;
                                    inString = [inString.slice(0, endIndex), close, inString.slice(endIndex)].join('');
                                    res.results.push({
                                        found: forString,
                                        AtIndex: startIndex,
                                        CurrentIndex: startIndex + open.length,
                                        spanID: currentID
                                    });
                                    currentID++;
                                    i = endIndex + close.length;
                                }

                                else {
                                    i++;
                                    curChar = inString.charAt(i).toLowerCase();
                                }
                            }
                            else {
                                i++;
                                break;
                            }
                        }
                    }
                }
            }


        }

        res.resultString = inString;

        return res;
    }

    this.searchAndMarkText = function(forString, inString)
    {

        var checkString = this.removeSpanWithAttributes(inString);
        var currentID = 0;
        var inNewString = checkString;

        var shouldStop = false;
        var finalString = "";
        var stopStr = "";
        while (shouldStop == false)
        {
            var obj = this.searchStringInStringTillFirstMatchIgnoreTags(forString, inNewString)
            if (obj.length != 0)
            {
                var index = obj[0].index;
                var spanAttr = "style='color:blue;background-color: yellow' currentID=" + currentID;
                var repl = this.addSpanWithAttributesToString(obj[0].found, spanAttr);
                var nextIndex = index + repl.length;
                inNewString = this.replaceStringInStringAtIndex(forString, repl, inNewString, index);
                var test = this.splitString(inNewString, nextIndex);
                finalString += test[0];
                inNewString = test[1];
                stopStr = test[1];
                currentID += 1;
            }
            else
            {
                shouldStop = true
                finalString += stopStr;
                if (finalString == "")
                {
                    finalString = checkString;
                }
                break;
            }
        }


        return finalString;
    }

    //kompletter Text (inString) kann nach einem Schlüsselwort (searchString) durchsucht
    //hierbei können attribute für die Regex klasse mitgegeben werden (attributes), attribute sind zum Beispiel "gi" für global und case insensitive
    //Rückgabewert ist ein Array aus Objekten [{found:String, index:int}] mit Informationen über das gefundene Objekt und dem Index an dem es im Text gefunden wurde
  this.searchStringInString = function(searchString, inString, attributes)
  {
      var regex = this.getRegexForSearchString(searchString, null, null, attributes)
      this.replaceStringInString();
      return this.executeSearchRegex(inString, regex);
  }

  //wie "seachStringInString", suche beginnt aber erst ab einem bestimmten Index
  //hierfür wird das Object inString abgeschnitten und ein Substring beginnend vom Index gebildet, es wird nur  der substring durchsucht
  this.searchStringInStringBeginningAtIndex = function (searchString, beginningAtIndex, inString, attributes)
  {
      searchString = this.searchString.substring(beginningAtIndex);
      var regex = this.getRegexForSearchString(searchString, null, null, attributes);
      return this.executeSearchRegex(inString, regex);
  }

  //wie searchStringInString, allerdings sind die Attribute vordefiniert und der String wird Case Insensitive durchsucht
  this.searchStringInStringCaseInSensitive = function (searchString, inString)
  {
      var regex = this.getRegexForSearchString(searchString, null, null, "g")
      return this.executeSearchRegex(inString, regex);
  }

  //wie searchStringInString, allerdings sind die Attribute vordefiniert und der String wird nicht global durchsucht, es wird also nur bis zum ersten Ergebniss gesucht und dieses zurückgegeben
  this.searchStringInStringTillFirstMatch = function (searchString, inString)
  {
      var regex = this.getRegexForSearchString(searchString, null, null, "i")
      return this.executeSearchRegex(inString, regex);
  }

  this.searchStringInStringTillFirstMatchIgnoreTags = function(searchString, inString)
  {
      var regex = this.getRegexForSearchStringIgnoringTags(searchString, "i");
      return this.executeSearchRegex(inString, regex);
  }

  /*
  kompletter string (inString) wird durchsucht (searchString) und alle Ergebnisse werden ersetzt durch replaceString
  Suchen und ersetzen geschieht mittels Regex
  Rückgabewert: 
  {
      replaced:[{found:string, index:int}] //Array aus Objekten mit Informationen über die gefunden Inhalte
      result:string //der ersetzte String
  }
  */
  this.searchAllSpans = function(inString)
  {
      var regexA = new RegExp();
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

/* 
wie replaceStringInString, allerdings wird nur ein Ergebniss ersetzt, welches durch den Index definiert wird
hierfür wird idr zuerst eine suche ausgeführt
Rückgabewert ist der ersetze String
*/
    this.replaceStringInStringAtIndex = function (searchString, replaceString, inString, AtIndex)
  {
      var strs = this.splitString(inString, AtIndex);
      var inSubString = strs[1];
      var regex = this.getRegexForSearchString(searchString, null, null, "i");
      var newStr = inSubString.replace(regex, replaceString);

      return strs[0] + newStr;
  }

  //Art

  /*
  string wird von html bold tags umschlossen
  Rückgabewert ist der umschlossene String
  */
  this.makeStringFat = function (str)
  {
      return this.addTagsToString(str, "<b>", "</b>");
  }

  /*
  string wird von html italic tags umschlossen
  Rückgabewert ist der umschlossene String
  */
  this.makeStringKursiv = function (str)
  {
      return this.addTagsToString(str, "<i>", "</i>");
  }

  /*
  string wird von html underlined tags umschlossen
  Rückgabewert ist der umschlossene String
  */
  this.makeStringUnderlined = function (str)
  {
      return this.addTagsToString(str, "<u>", "</u>");
  }

  /*
  Überprüfung ob string (str) bold ist, es wird eine Überprüfung auf die <b> Tags ausgeführt
  Rückgabewert ist ein bool
  */
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

  /*
  Überprüfung ob string (str) italic ist, es wird eine Überprüfung auf die <i> Tags ausgeführt
  Rückgabewert ist ein bool
  */
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

  /*
  Überprüfung ob string (str) underlined ist, es wird eine Überprüfung auf die <u> Tags ausgeführt
  Rückgabewert ist ein bool
  */
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

  /*
  Überprüfung ob string (str) bestimmte Tags enthält, es kann sowohl ein openTag als auch ein closingTag durchgeführt werden
  Rückgabewert ist ein bool
  */
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


    /*
    unused
  */
  this.remvoeAllAttrFromString = function (str)
  {
      str = str.replace(/<\/?[^>]*>/g, "");

      return str;
  }

  /*
  bold (<b>) Attribute werden vom string (str) entfernt, Rückgabewert ist der String ohne die entsprechenden Attribute
  */
  this.removeFatAttrFromString = function (str)
  {
      return this.removeTagsFromString(str, "<b>", "</b>");
  }

  /*
  italic (<i>) Attribute werden vom string (str) entfernt, Rückgabewert ist der String ohne die entsprechenden Attribute
  */
  this.removeKursivAttrFromString = function (str)
  {
      return this.removeTagsFromString(str, "<i>", "</i>");
  }

  /*
  underlined (<u>) Attribute werden vom string (str) entfernt, Rückgabewert ist der String ohne die entsprechenden Attribute
  */
  this.removeUnderLinedFromString = function (str)
  {
      return this.removeTagsFromString(str, "<u>", "</u>");
  }

    /*
    Opening(openingTag) und ClosingTag(closingTag) können zu string (str) hinzugefügt werden. Rückgabewert ist der umschlossene String
  */
  this.addTagsToString = function (str, openingTag, closingTag)
  {
      return openingTag + str + closingTag;
  }

  /*
  String wird durch einen Regulären Ausdruck auf HTML Tags durchsucht.
  rückgabewert sind alle gefundenen tags [{found:string, index:int}]
  */
  this.getTagsFromString = function (str)
  {
      var reg = new RegExp("<[^>]*>", "gi");

      return this.executeSearchRegex(str, reg);
  }

  /*
  opening (opentag) und closingTag (closingTag) können von einem string(str) entfernt werden, sofern sie vorhandend sind
  Es werden nur der erste und der letzte gefundene Tag entfernt
  Rückgabewert ist der String ohne die entsprechenden Tags
  */
  this.removeTagsFromString = function (str, opentag, closingTag)
  {
      var wobeg = this.removeOpeningTag(str, opentag);
      var wobegend = this.removeClosingTag(wobeg, closingTag);
      return wobegend;
  }

  /*
  openingTag (opentag) kann von einem string(str) entfernt werden, sofern er vorhandend ist
  Es wird nur der erste Tag entfernt
  Rückgabewert ist der String ohne den entsprechenden Tag
  */
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

  /*
  closingtag (closingtag) kann von einem string(str) entfernt werden, sofern er vorhandend ist
  Es wird nur der letzte Tag entfernt
  Rückgabewert ist der String ohne den entsprechenden Tag
  */
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

  
  /*
  string (str) wird per regex auf span tags durchsucht, span tags werden entfernt
  rückgabewert ist ein string ohne die entsprechende Tags
  */
  this.removeSpanWithAttributes = function(str)
  {
      str = str.replace(/<\/?span[^>]*>/g, "");

      return str;
  }
  //Helper

  /*search Regex (regex) wird auf zu durchsuchenden string (text) ausgeführt
  Rückgabewert ist ein Array aus Objekten, welche Informationen über die gefundenen Objecte beinhaltent [{found:string,index:int}] 
*/
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
	              res.push({
                  found:match,
                  index:match.index
              });          }
      }

      return res;
  }

/*
regex wird gebildet aus zu suchendem String (searchString) 
es können attribute zum durchsuchen mitgegeben werden (attributes)
zusätzliche kann ein opening und closingtag angefügt werden
rückgabewert ist das regex Objekt
*/
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

  this.getRegexForSearchStringIgnoringTags = function(searchString, attributes)
  {
      var regString = "";
      for(var i = 0; i < searchString.length; i++)
      {
          var curChar = searchString.charAt(i);
          regString += curChar;
          if (i < searchString.length + 1)
          {
              regString += "?[<[^>]*>]";
          }
          
      }

      if (attributes == null)
      {
          attributes = "i";
      }

      var retRegex = new RegExp(regString, attributes);

      return retRegex;
  }

  this.splitString = function (str, index) {
        return [str.substring(0, index), str.substring(index)];
    }
};
