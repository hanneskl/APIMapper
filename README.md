APIMapper
=========

Javascript mapper for JSON. Transforms any JSON into another schema. 

Arrays are dealt with automatically: If no parameter is give, the first object is returned.

#Examples:

Return value is always
```
{"newValue1": 1}
```

##Simple
```
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
```
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
```
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

##Simple dot syntax
```
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

###Complex dot syntax with [i]
```
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
Filter on array object
- [last()]
- [last()-1]
- [position()<3]
- [lang]
- [!lang]
- [lang='en']
- [lang!='en']
- [price>35.00]
- [price==35.00]
- [price!=35.00]
- [price<35.00]

#License

APIMapper is released under the MIT license. See LICENSE for details.