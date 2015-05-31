APIMapper
=========

APIMapper is a simple javascript mapper for JSON objects and transforms any JSON into another schema. This is used in javascript and node.js transformations of API data.

Arrays are dealt with automatically: If no addtional parameter is given, the first object is returned.

The function is

```javascript
mapArray(map: Object, oldObject: Object)
```

The map object is an Array with an mapping element or an mapping element itself:

```javascript
{
	"_path": (String) Path to the input property with dot and bracket syntax. i.e. foo.bar[0].fox[12].rabbit
	OutputPropertyName (String) : InputPropertyName (String)
}
```

#Examples:

Return object in these examples is:

```javascript
{
	"newValue1": 1
}
```

##Simple

```javascript
var oldObject =  {
	"path1": [
		{
			"oldVariableName1": 1
		}
	]
};

var map = [
	{
		"_path": "path1", 
		"newValue1": "oldVariableName1"
	}
];

mapArray(map, oldObject);
```

##Simple with functions calls ´

```javascript
var oldObject =  {
	"path1": [
		{
			"oldVariableName1": "1"
		}
	]
};

var map = [
	{
		"_path": "path1", 
		"newValue1": "parseInt(oldVariableName1)"
	}
];

mapArray(map, oldObject);
```

##Multiple values and arrays for input

```javascript
var oldObject = {
	"path1": [
		{
			"oldVariableName1": 1, 
			"oldVariableName2": "Hello"
		}, 
		{
			"oldVariableName1": 2
		}
	]
};

var map = [
	{
		"_path": "path1", 
		"newValue1": "oldVariableName1",
		"newValue2": "oldVariableName2"
	}
];

mapArray(map, oldObject);
```

Return value

```
[
	{"newValue1": 1, newValue2: "Hello"}, 
	{"newValue1": 2, newValue2: undefined}
]
```

##Simple dot syntax for deeper path structures

```javascript
var oldObject =  {
	"path1": {
		"path2": [
			{
				"oldVariableName1": 1
			}
		]
	}
};

var map = [
	{
		"_path": "path1.path2", 
		"newValue1": "oldVariableName1"
	}
];

mapArray(map, oldObject);
```

###Complex dot syntax with [i] for deeper path structures and arrays

```javascript
var oldObject =  {
	"path1": [
		{
			"path2": [
				{
					"oldVariableName1": 1
				}
			]
		}
	]
};

var map = [
	{
		"_path": "path1[0].path2",
		"newValue1": "oldVariableName1"
	}
];

mapArray(map, oldObject);
```

#Todos
1. Filter on array object
- [last()]
- [last()-1]
- [position()<3]
- [lang]
- [!lang]
- [lang=='en']
- [lang!='en']
- [price>35.00]
- [price==35.00]
- [price!=35.00]
- [price<35.00]

2. Add the ability to add constants to the returned object
2.1 Add conditions on constants

#Quality
Please use JSHint for code quality.

#Testing
Please add qunit tests before adding new funtionality. 

#License

APIMapper is released under the MIT license. See LICENSE for details.