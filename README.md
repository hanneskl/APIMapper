APIMapper
=========

Javascript mapper for JSON

Examples:
#Simple
```
var oldObject =  {"path1": [{"oldVariableName1": 1}]};
var map = [{"_path": "path1", "newValue1": "oldVariableName1"}];
mapArray(map, oldObject);
```
returns
```
{"newValue1": 1}
```

#Simple with functions calls