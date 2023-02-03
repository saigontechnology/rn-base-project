const MODULE_TYPE = {
  Screen: 'screens',
  Store: 'store',
  Component: 'component',
}

module.exports = function (plop) {
  const component = [
    {
      type: 'add',
      path: 'src/components/{{properCase name}}.js',
      templateFile: 'generators/component/index.js.hbs',
    },
  ]
  const screensView = [
    {
      type: 'add',
      path: 'src/screens/{{properCase name}}Component/{{properCase name}}Screen.js',
      templateFile: 'generators/module/Module.view.js.hbs',
    },
    {
      type: 'add',
      path: 'src/screens/{{properCase name}}Component/index.js',
      templateFile: 'generators/module/Module.index.js.hbs',
    },
    {
      type: 'modify',
      path: 'src/screens/index.js',
      pattern: /\/\/ Screen Export/gi,
      template: "// Screen Export\r\nexport * from './{{properCase name}}Component'",
    },
    {
      type: 'modify',
      path: 'src/navigation/RouteKey.js',
      pattern: /\/\** Screen \*\//g,
      template: "/** Screen */\r\n  {{properCase name}}Screen: '{{properCase name}}Screen',",
    },
    {
      type: 'modify',
      path: 'src/navigation/ScreenService.js',
      pattern: /\/\/ Screen Import/gi,
      template:
        "// Screen Import\r\nimport {{properCase name}}Screen from '../screens/{{properCase name}}Component/{{properCase name}}Screen'",
    },
    {
      type: 'modify',
      path: 'src/navigation/ScreenService.js',
      pattern: /\/\/ Screen Match/gi,
      template:
        '// Screen Match\r\n    case RouteKey.{{properCase name}}Screen:\r\n      return {{properCase name}}Screen',
    },
    {
      type: 'modify',
      path: 'src/navigation/ScreenService.js',
      pattern: /\/\/ Screen Options/gi,
      template: '// Screen Options\r\n    case RouteKey.{{properCase name}}Screen:',
    },
  ]
  const store = [
    {
      type: 'add',
      path: 'src/store/constants/{{camelCase name}}.js',
      templateFile: 'generators/redux/constants.js.hbs',
    },
    {
      type: 'add',
      path: 'src/store/reducers/{{camelCase name}}.js',
      templateFile: 'generators/redux/reducer.js.hbs',
    },
    {
      type: 'add',
      path: 'src/store/saga/{{camelCase name}}.js',
      templateFile: 'generators/redux/saga.js.hbs',
    },
    {
      type: 'modify',
      path: 'src/store/reducers/index.js',
      pattern: /\/\/ Reducer Imports/gi,
      template: "// Reducer Imports\r\nimport {{camelCase name}} from './{{camelCase name}}'",
    },
    {
      type: 'modify',
      path: 'src/store/reducers/index.js',
      pattern: /\/\/ Reducers/gi,
      template: '// Reducers\r\n  {{camelCase name}},',
    },
    {
      type: 'modify',
      path: 'src/store/reducers/index.js',
      pattern: /\/\/ Reducer Export/gi,
      template: "// Reducer Export\r\nexport * from './{{camelCase name}}'",
    },
    {
      type: 'modify',
      path: 'src/store/saga/index.js',
      pattern: /\/\/ Saga Imports/gi,
      template: "// Saga Imports\r\nimport {{camelCase name}}Saga from './{{camelCase name}}'",
    },
    {
      type: 'modify',
      path: 'src/store/saga/index.js',
      pattern: /\/\/ Sagas/gi,
      template: '// Sagas\r\n    ...{{camelCase name}}Saga,',
    },
    {
      type: 'add',
      path: 'src/store/selectors/{{camelCase name}}.js',
      template: '// export const actionSelector = state => state.{{camelCase name}}\n',
    },
    {
      type: 'modify',
      path: 'src/store/selectors/index.js',
      pattern: /\/\/ Selector/gi,
      template: "// Selector\r\nexport * from './{{camelCase name}}'",
    },
  ]
  plop.setGenerator('module', {
    description: 'Generates new module with or without redux connection',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Module name (Casing will be modified)',
      },
      {
        type: 'list',
        name: 'type',
        message: 'Choose Module type',
        choices: ['screens', 'component', 'store'],
      },
    ],
    actions(data) {
      switch (data.type) {
        case MODULE_TYPE.Screen:
          return screensView
        case MODULE_TYPE.Store:
          return store
        case MODULE_TYPE.Component:
          return component
        default:
          break
      }
    },
  })
}
