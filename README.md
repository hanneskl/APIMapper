APIMapper
=========

Javascript mapper for JSON

Examples:

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
var oldObject =  {"path1": [{"oldVariableName1": "1"}]};
var map = [{"_path": "path1", "newValue1": "parseInt(oldVariableName1)"}];
mapArray(map, oldObject);
```

##Multiple values
```
var oldObject =  [{"path1": [{"oldVariableName1": 1, "oldVariableName2": "Hello"}, {"oldVariableName1": 2}]}];
var map = [{"_path": "path1", "newValue1": "oldVariableName1", "newValue2": "oldVariableName2"}];
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
var oldObject =  {"path1": {"path2": [{"oldVariableName1": 1}]}};
var map = [{"_path": "path1.path2", "newValue1": "oldVariableName1"}];
mapArray(map, oldObject);
```

###Complex dot syntax with [i]
```
var oldObject =  {"path1": [{"path2": [{"oldVariableName1": 1}]}]};
var map = [{"_path": "path1[0].path2", "newValue1": "oldVariableName1"}];
mapArray(map, oldObject);
```

##Todo
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