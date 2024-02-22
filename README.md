# Burger House Landing App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

## Development server

Run `npm install` to install all the necessary npm packages.

Run `ng serve --open` for a dev server. The server will automatically open in the browser at `http://localhost:4200/`. The application will reload automatically if you make any changes to the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Example:

Run `ng generate service App` to generate `app.service.ts` file to store the logic of connecting to the backend there

## Build and Deploy to GitHub Pages

1. Change `outputPath` value to `"outputPath": "docs,"` in `angulat.json` file.

2. Increase size of the application up to 1mb in `angular.js` to get rid of build warnings:

```
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "1mb",
    "maximumError": "1mb"
  },
  {
    "type": "anyComponentStyle",
    "maximumWarning": "1mb",
    "maximumError": "1mb"
  }
],
```

3. Make sure that `src\index.html` file uses root directory: 
```
<base href="/">
```

4. Run `ng build --aot --configuration=production` (command for Angulat 16) to build the project. The build artifacts will be stored in the `docs/` directory.

5. Go to `https://github.com/YOUR_USERNAME/YOUR_REPONAME/settings/pages` settings and chosse the `main` branch and `docs` as the source folder and Click 'Save' button:

![GitHub Pages](./src/assets/images/github-pages.png)

6. Push your changes to GitHub.

7. Check your deployment:

    `https://github.com/YOUR_USERNAM/YOUR_REPONAME/deployments`

    or

    `https://YOUR_USERNAM.github.io/YOUR_REPONAME/`

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
