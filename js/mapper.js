//MAP
var mapArray = function(map, obj) {

	"use strict";

	//VALIDATION
	if (map === undefined) {
		window.console.warn("Missing parameter map");
		return undefined;
	}
	if (obj === undefined) {
		window.console.warn("Missing parameter array");
		return undefined;
	}
	if (!map instanceof Array) {
		window.console.warn("Map is no array");
		return undefined;
	}
	if (obj instanceof Array) {
		window.console.warn("Object should not be an array");
		return undefined;
	}
	if (map.length === 0) {
		window.console.warn("Map is empty");
		return undefined;
	}
	if (Object.keys(map[0]).length < 2) {
		window.console.warn("Map has to few arguments. Needs '_path' and at least 1 variable");
		return undefined;
	}

	//GET "_path" VARIABLE FROM CHILD
	var path = map[0]._path;
	//VALIDATION
	if (path === undefined) {
		window.console.warn("Missing variable '_path' in map.");
		return undefined;
	}

	//GO DOWN PATH TO FIND THE ARRAY
	var pathComponents = path.split(".");
	var originalArray = mapArrayPath(pathComponents[0], obj);
	for (var i = 1; i < pathComponents.length; i++) {
		var component = pathComponents[i];
		originalArray = mapArrayPath(component, originalArray);
	}

	var array = [];

	//VALIDATION
	if (originalArray === undefined){
		window.console.warn("Could not find '" + path + "' in " + JSON.stringify(obj));
		return undefined;
	}
	if (!originalArray instanceof Array){
		window.console.warn(originalArray + " is not an array");
		return undefined;
	}

	//LOOP ARRAY
	for (i = 0; i < originalArray.length; i++) {

		var parsedObject = mapObject(map[0], originalArray[i]);
		array.push(parsedObject);
	}
	return array;
};

var mapArrayPath = function (path, obj) {

	"use strict";

	if (path === undefined) {
		window.console.warn("Missing path");
		return undefined;
	}
	if (obj === undefined) {
		window.console.warn("Missing object");
		return undefined;
	}

	var positionOfOpeningSquareBrackets = path.indexOf("[");
	var positionOfClosingSquareBrackets = path.indexOf("]");
	var originalValue;
	if (positionOfOpeningSquareBrackets > 0 && positionOfClosingSquareBrackets > 0) {
		originalValue = obj[path.substr(0, positionOfOpeningSquareBrackets)][parseInt(path.substr(positionOfOpeningSquareBrackets + 1, positionOfClosingSquareBrackets - positionOfOpeningSquareBrackets - 1))];

	} else {
		originalValue = obj[path];
	}

	if (originalValue === undefined) {
		window.console.warn("Could not find '" + path + "' in " + JSON.stringify(obj));
	}
	return originalValue;
};

var mapObject = function(map, obj) {

	"use strict";

	if (map === undefined){
		window.console.warn("Missing map");
		return undefined;
	}
	if (obj === undefined) {
		window.console.warn("Missing object");
		return undefined;
	}
	if (typeof obj !== 'object') {
		window.console.warn("Object is wrong type " + typeof obj);
		return undefined;
	}

	//ARRAY
	if (map instanceof Array) {
		return (mapArray(map, obj));
	}

	//PARSE OBJECT
	else if (typeof map === 'object') {

		var returnObj = {};

		//LOOP VALUES
		for (var key in map) {

			if (map.hasOwnProperty(key)) {

				var newVariable = map[key];
				var originalValue;

				//FUNCTION
				var positionOpenBracket = newVariable.indexOf("(");
				var positionClosingBracket = newVariable.indexOf(")");
				if (typeof newVariable === "string" && positionOpenBracket > 0 && positionClosingBracket > 0) {

					var functionName = newVariable.substr(0, positionOpenBracket);
					var path = newVariable.substr(positionOpenBracket + 1, positionClosingBracket - positionOpenBracket - 1);
					var workingFunction = window[functionName];

					var parameter = obj[path];

					//VALIDATE
					if (workingFunction === undefined) {
						originalValue = undefined;
					} else if (parameter === undefined) {
						originalValue = undefined;
					} else {
						originalValue = workingFunction(parameter);
					}
					returnObj[key] = originalValue;
				}

				//NORMAL STRING VALUES -> PARSE AND RETURN
				else if ((typeof newVariable === "string" || typeof newVariable === "number") && key !== "_path") {

					//CATCH DOT SYNTAX
					var pathComponents = newVariable.split(".");
					var firstComponent = pathComponents[0];
					//CATCH [i] SYNTAX
					originalValue = mapArrayPath(firstComponent, obj);
					for (var i = 1; i < pathComponents.length; i++) {
						var component = pathComponents[i];
						originalValue = mapArrayPath(component, originalValue);
					}
					returnObj[key] = originalValue;
				}

				//ARRAYS -> MAP
				if (newVariable instanceof Array) {
					var parsedObject = mapObject(newVariable, obj);
					returnObj[key] = parsedObject;
				}
			}
		}
		return returnObj;
	}

	else {
		window.console.warn("Wrong type " + typeof map + " of map " + JSON.stringify(map));
		return undefined;
	}
}