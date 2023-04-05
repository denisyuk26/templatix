# Templatix

## Instalation

`npm install templatix --save-dev`

## Config initialization

```
// package.json
...your code
scripts: {
  ...your code
  "generate-config": "templatix-init", // create config file
  "generate": "templatix" // generate files
}

```

## Config fields

| Field                            | Description                                         | Default        |
| -------------------------------- | --------------------------------------------------- | -------------- |
| framework                        | The chosen framework                                | react          |
| router                           | The chosen router library                           | type-route     |
| extension_list.general_extension | The general extension for files                     | ts             |
| extension_list.style             | The extension for stylesheets                       | module.scss    |
| extension_list.route             | The extension for route files                       | route.ts       |
| extension_list.page              | The extension for page files                        | ts             |
| extension_list.component         | The extension for component files                   | ts             |
| output.general                   | The directory for general output                    | src/output     |
| output.routes                    | The directory for route output                      | src/routes     |
| react.output.page                | The directory for page components in a React app    | src/pages      |
| react.output.component           | The directory for general components in a React app | src/components |
| react.extension_list.page        | The extension for page components in a React app    | page.tsx       |
| react.extension_list.component   | The extension for general components in a React app | tsx            |

## Comand line arguments

| Option name | Type   | Description                                          | Required | Alias |
| ----------- | ------ | ---------------------------------------------------- | -------- | ----- |
| name        | string | Name of the entity                                   | true     | n     |
| type        | string | Type of generated template (component, page, entity) | true     | t     |
| framework   | string | Framework of the entity (React)                      | false    | f     |
| path        | string | Path to the generated file                           | false    | p     |
| parentRoute | string | Parent route of the generated page                   | false    | pr    |

## Usage

### Page template creation

```
npm run generate -- --type page --name login
```

### Route template creation

```
npm run generate -- --type route --name login
```

### Route with parent

```
npm run generate -- --type route --name user --parentRoute users
```
