# Generate file

```
This will auto generate the component, screens or redux files base on name and template you defined
```

**Open project terminal**

1. yarn plop
2. Enter module name (should be in PascalCase)
3. Chose module type you want to create

   - screens:
   * create screens/{{moduleName}}
   * modify screens/index.js
   * modify RouteKey.js
   * modify ScreenService.js
   * modify StackNavigation.js

   - component:
   * create components/{{moduleName}}

   - store:
   * create constants/{{moduleName}}
   * create reducer/{{moduleName}}
   * create saga/{{moduleName}}
   * create selectors/{{moduleName}}
   * modify reducers/index.js
   * modify saga/index.js
   * modify selectors/index.js

## More information check at [plopjs/plop](https://github.com/plopjs/plop)
