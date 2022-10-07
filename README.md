# ng-cleanup
 CLI tool to simplify Angular Components

## Installation
```bash
npm install -g ng-cleanup
```

## Usage
```bash
ng-cleanup list [path] [extension]

ng-cleanup list ./src/app .component.ts
ng-cleanup minify ./src/app/component/component.component.ts
ng-cleanup removeTests ./src/app .spec.ts
ng-cleanup removeConsoleLogs ./src/app .ts
```
## Options
```bash
list                 list all components in a project
minify               minify a component file
removeTests          remove all test files in a project
removeConsoleLogs    remove all console.logs in a project
```

### List
```bash
ng-cleanup list [path] [extension]

Example:
   ng-cleanup list ./src/app .component.ts

Output:
    
   './src/app/component/component.component.ts',
   './src/app/component2/component2.component.ts'
    
```

### Minify
```bash
ng-cleanup minify [path]

 An angular component is made from 3 files: html, css and ts.
 This tool will minify all 3 files and create a new component file.

 by changing the component decorator from
 @Component({
   selector: 'app-component',
   templateUrl: './component.html',
   styleUrls: ['./component.css']
 })
 
 to

 const html = '<div>html template</div>';
 const css = 'div { color: red; }';

 @Component({
   selector: 'app-component',
   template: html,
   styles: [css]
 })

```

### Remove Tests
***This is mostly a joke, don't use this option in production tests are important***

```bash
ng-cleanup removeTests [path] [extension]

before:
src
├── app
│   ├── component
│   │   ├── component.component.ts
│   │   ├── component.component.spec.ts
│   │   ├── component.html
│   │   └── component.css

after:

src
├── app
│   ├── component
│   │   ├── component.component.ts
│   │   ├── component.html
│   │   └── component.css

```

### Remove Console Logs
```bash
ng-cleanup removeConsoleLogs [path] [extension]

```


## Copyrigth
Diego Vallejo

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
