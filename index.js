// ng-cleanup
// CLI tool to simplify Angular Components

//Use case:  File-minify minify component files
/*
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
*/

// this is done on files where the html template is small and the css is simple
// we you can change this parameters to fit your needs on fileMinify function
// @param htmlSizeLimit = 20 default value makes it so that files with html
// templates bigger than 20 lines will not be minified

import { readFileSync, writeFileSync } from "node:fs";

function fileMinify(componentPath, htmlSizeLimit = 20) {

  const componentFile = readFileSync(componentPath, "utf8");

  if (!componentFile) {
    console.log("File not found");
    return;
  }
  if (!componentFile.includes('@Component')) {
    console.log("Not a component file");
    return;
  }

  const htmlPath = componentFile.match(/templateUrl: '(.*)'/)[1];
  const cssPath = componentFile.match(/styleUrls: \['(.*)'\]/)[1];

  const html = htmlPath && readFileSync(htmlPath, "utf8");
  const css = cssPath && readFileSync(cssPath, "utf8");

  if (html.split("").length > htmlSizeLimit) {
    console.log("html template too big");
    return;
  }

  const newComponentFile = componentFile
    .replace(/templateUrl: '(.*)'/, `template: \`${html}\``)
    .replace(/styleUrls: \['(.*)'\]/, `styles: [\`${css}\`]`);

  writeFileSync(componentPath, newComponentFile);

  console.log("component minified");
}

// Use case: list all components in a project
// you can change the parameters to fit your needs on listComponents function
// @param path = './src/app' default value is "./src/app"
// @param extension = '.component.ts' default value is ".component.ts"

function listComponents(
  path = "./src/app",
  extension = ".component.ts"
) {
  const files = readFileSync(path, "utf8");
  const components = files.match(new RegExp(`(.*${extension})`, "g"));
  console.log(components);
}

// Use case: Remove all Test files in a project
// who needs tests anyway?
// you can change the parameters to fit your needs on removeTests function
// @param path = './src/app' default value is "./src/app"
// @param extension = '.spec.ts' default value is ".spec.ts"

// this is a Joke obviously, don't use this tool in production tests are important

function removeTests(
  path = "./src/app",
  extension = ".spec.ts"
) {
  const files = readFileSync(path, "utf8");
  const tests = files.match(new RegExp(`(.*${extension})`, "g"));
  tests.forEach((test) => {
    writeFileSync(test, "");
  });
  console.log("tests removed");
}

// Use case: Remove all console.log in a project
// you can change the parameters to fit your needs on removeConsoleLogs function
// @param path = './src/app' default value is "./src/app"
// @param extension = '.ts' default value is ".ts"

function removeConsoleLogs(
  path = "./src/app",
  extension = ".ts"
) {
  const files = readFileSync(path, "utf8");
  const components = files.match(new RegExp(`(.*${extension})`, "g"));
  components.forEach((component) => {
    const componentFile = readFileSync(component, "utf8");
    const newComponentFile = componentFile.replace(/console.log\(.*\)/g, "");
    writeFileSync(component, newComponentFile);
  });
  console.log("console.logs removed");
}


// CLI main function
// you can change the parameters to fit your needs on main function
// @param command = 'list' default value is "list"
// @param path = './src/app' default value is "./src/app"
// @param extension = '.component.ts' default value is ".component.ts"

function main(command = "list", path = "./src/app", extension = ".component.ts") {
  switch (command) {
    case "list":
      listComponents(path, extension);
      break;
    case "minify":
      fileMinify(path);
      break;
    case "removeTests":
      removeTests(path, extension);
      break;
    case "removeConsoleLogs":
      removeConsoleLogs(path, extension);
      break;
    default:
      console.log("command not found");
      console.log("commands: list, minify, removeTests, removeConsoleLogs");
      break;
  }
}

module.exports = { main };