- [PlatIA - WEB-UI](#platia---web-ui)
  - [VS Code (Visual Studio Code) - IDE](#vs-code-visual-studio-code---ide)
    - [Extensions](#extensions)
      - [@cedric-matheus](#cedric-matheus)
    - [Settings](#settings)
      - [@cedric-matheus](#cedric-matheus-1)
    - [Development container (DevContainer)](#development-container-devcontainer)
      - [Como utilizar?](#como-utilizar)
    - [Workspace](#workspace)
      - [How to use?](#how-to-use)
      - [How to install the recommended workspace extensions](#how-to-install-the-recommended-workspace-extensions)
  - [Project](#project)
    - [Project Structure](#project-structure)
    - [Settings](#settings-1)
      - [Linter Settings (.eslintrc.json)](#linter-settings-eslintrcjson)
      - [JavaScript VS Code Project Settings (jsconfig.json)](#javascript-vs-code-project-settings-jsconfigjson)
      - [Styleguidist settings (styleguide.config.js)](#styleguidist-settings-styleguideconfigjs)
      - [CRACO Settings - Ant Design Theme](#craco-settings---ant-design-theme)
    - [Dependencies](#dependencies)
      - [Production Dependencies (build)](#production-dependencies-build)
      - [Development Dependencies (dev)](#development-dependencies-dev)
    - [Scripts](#scripts)
      - [Install Dependencies](#install-dependencies)
      - [Start Jest - Unit Tests (Dev)](#start-jest---unit-tests-dev)
      - [Start Styleguidist - Development Playground (Dev)](#start-styleguidist---development-playground-dev)
      - [Start Project (Dev)](#start-project-dev)

# PlatIA - WEB-UI

Web frontend of the artificial intelligence platform.

## VS Code (Visual Studio Code) - IDE

VS Code (Visual Studio Code) is a lightweight and functional integrated
development environment (IDE), which can be customized to meet different
development needs.

### Extensions

Extensions to expand the development functionality in a ReactJS project.

```php // just to improve highlight
esbenp.prettier-vscode                                                    // Prettier - Code formatter
dbaeumer.vscode-eslint                                                    // ESLint - Rules validation
mgmcdermott.vscode-language-babel                                         // Babel Javascript - Modern JavaScript syntax highlighting
OfHumanBondage.react-proptypes-intellisense                               // React PropTypes Intellisense - Intellisense from PropTypes
suming.react-proptypes-generate                                           // React PropTypes Generate - Automatic PropTypes Generator
```

#### @cedric-matheus

Personal extensions @cedric-matheus uses.

```php // just to improve highlight
// Themes
PKief.material-icon-theme                                                 // Material Icon Theme - Custom icon theme
dracula-theme.theme-dracula                                               // Dracula Official - Theme VS Code

// Utilities
wayou.vscode-todo-highlight                                               // TODO Highlight - Highlights of special markings
bierner.jsdoc-markdown-highlighting                                       // JSDoc Markdown Highlight - Markdown syntax highlights in JSDoc
alefragnani.Bookmarks                                                     // Bookmarks - Mark lines of code and navigate between markings
yzhang.markdown-all-in-one                                                // Markdown All in One - Markdown writing utilities
shd101wyy.markdown-preview-enhanced                                       // Markdown Preview Enhanced - Markdown Viewer
ms-vscode-remote.vscode-remote-extensionpack                              // Remote Development - Work with development containers (Docker)
streetsidesoftware.code-spell-checker                                     // Code Spell Checker - Spell checker
streetsidesoftware.code-spell-checker-portuguese-brazilian                // Brazilian Portuguese - Code Spell Checker - PT-BR Dictionary for Code Spell Checker
CoenraadS.bracket-pair-colorizer-2                                        // Bracket Pair Colorizer 2 - Block limiter highlight
zhucy.project-tree                                                        // project-tree - Project file tree generator
ms-azuretools.vscode-docker                                               // Docker - Docker Utilities

// Collaboration
MS-vsliveshare.vsliveshare                                                // Live Share - Real-time collaboration

// Environment variables
mikestead.dotenv                                                          // DotENV - Syntax highlighting for .env files (environment variables)
```

### Settings

VS Code configurations that will facilitate and accelerate the development in ReactJS.

```json
{
  "editor.rulers": [80, 120],                                             // Code limit rulers
  "editor.insertSpaces": true,                                            // Insert spaces in indentation
  "editor.tabSize": 2,                                                    // Indentation size
  "editor.formatOnSave": true,                                            // Format on save
  "editor.formatOnPaste": true,                                           // Format when pasting
  "editor.defaultFormatter": "esbenp.prettier-vscode",                    // Default code formatter
  "prettier.singleQuote": true,                                           // Prettier - Use single quotes in strings
  "prettier.arrowParens": "always",                                       // Prettier - Always use parentheses in arrow functions
  "prettier.trailingComma": "es5",                                        // Prettier - Add a comma at the end as per ES5 standard
  "files.watcherExclude": {                                               // Exclude files and/or directories from checks/validations
    "**/build/**": true,
    "**/node_modules/**": true,
    "**/coverage/**": true,
  },
  "editor.codeActionsOnSave": {                                           // Actions on save
    "source.fixAll": true                                                 // Correct all possible errors (linters)
  },
  "typescript.validate.enable": false,                                    // Disable TypeScript validations
  "prettier.jsxSingleQuote": true,                                        // Prettier - Use single quotes in JSX files
  "emmet.includeLanguages": {                                             // Emmet - Include languages
    "javascript": "javascriptreact"
  }
}
```

#### @cedric-matheus

Personal settings @cedric-matheus uses.

```json
{
  "[markdown]": {                                                         // Language settings
    "editor.defaultFormatter": "yzhang.markdown-all-in-one"               // Default code formatter
  },
  "cSpell.language": "en,pt,pt_BR",                                       // Code Spell Checker - Spell checker dictionaries
  "emmet.triggerExpansionOnTab": true,                                    // Emmet - Expand abbreviations on the tab key
  "workbench.iconTheme": "material-icon-theme",                           // Icon theme
  "material-icon-theme.activeIconPack": "react_redux",                    // Material Icon Theme - Active icon pack
  "material-icon-theme.folders.associations": {                           // Material Icon Theme - Association of icons to folders
    "DesignSystem": "Theme"                                               // "DesignSystem" folder receives the "Theme" icon
  },
  "workbench.colorTheme": "Dracula",                                      // vs code theme
  "editor.fontFamily": "Fira Code",                                       // font
  "editor.fontLigatures": true,                                           // enable font ligatures (font must be compatible)
  "ProjectTree.withComment": true                                         // activate comments in the generation of the project tree
}
```

### Development container (DevContainer)

Development containers are isolated development environments that work inside a container (Docker).

#### Como utilizar?

To use a development container we must have **Docker** installed on our
_machine_ and the **Remote Development** extension on _VS Code_.

With the prerequisites installed::

1. Open the project's root folder in VS Code;
2. Press <kbd>CTRL/CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd>;
3. In the command palette select the option `Remote-Containers: Reopen in Container`;
4. Wait for the configuration to finish.

**NOTE:** Some network conflicts may occur, this is because the valid network
in the container is the current network, active at the time of assembly, when we
access a VPN or change networks, Docker stops recognizing the network container
as valid. To fix this, just go back to the old network (disable the VPN) or run
the command `Remote-Containers: Rebuild Container` or
`Remote-Containers: Rebuild and Reopen in Container`.

### Workspace

Workspace is a way to standardize and isolate VS Code settings according to the project.

#### How to use?

1. Access the project folder in VS Code;
2. Press <kbd>CTRL/CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd>;
3. In the command palette select the option `Workspaces: Open workspace...`;
4. Select the environment configuration file (**web-ui.code-workspace**).
5. Wait to finish.

**NOTE:** Workspace has only extension recommendations, so extensions must be
installed manually, unless using a development container.

#### How to install the recommended workspace extensions

1. Make sure the work area is open;
2. Press <kbd>CTRL/CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd>;
3. In the command palette select the option `Extensions: Show Recommended Extensions`;
4. Select the `WORKSPACE RECOMMENDATIONS` tab;
5. Install all recommended extensions;

## Project
Project information and characteristics.

### Project Structure
Project directory and file structure.
```
web-ui
├─ .devcontainer                                                          // development container configurations
├─ .dockerignore                                                          // skipped files docker
├─ .eslintrc.json                                                         // eslint settings
├─ .env                                                                   // environment variable file
├─ .env.example                                                           // sample environment variables file
├─ .env.production                                                        // production environment variables file
├─ .env.test                                                              // test environment variables file
├─ .github                                                                // github settings
├─ .gitignore                                                             // skipped git files
├─ Dockerfile                                                             // docker image configuration
├─ LICENSE                                                                // project license
├─ README.md                                                              // project readme
├─ craco.config.js                                                        // craco settings
├─ default.conf                                                           // nginx configuration
├─ jsconfig.json                                                          // vss js settings
├─ package.json                                                           // project settings
├─ public                                                                 // public project folder
├─ sonar-project.properties                                               // sonar settings
├─ src                                                                    // project root folder
│  ├─ assets                                                              // application assets
│  ├─ components                                                          // application components
│  ├─ containers                                                          // application containers
│  ├─ index.js                                                            // application initialization file
│  ├─ serviceWorker.js                                                    // standard react pwa utility
│  ├─ services                                                            // application services
│  ├─ setupTests.js                                                       // test configurations (enzyme)
│  ├─ store                                                               // application stores
│  ├─ style.less                                                          // global application styles
│  ├─ uiComponents                                                        // design system components
│  ├─ utils.js                                                            // utilities
│  └─ variables.less                                                      // style variables
├─ styleguide.config.js                                                   // styleguide configuration
├─ web-ui.code-workspace                                                  // workspace configuration
└─ yarn.lock                                                              // registration of project dependencies
```

### Settings
Project settings.

#### Linter Settings (.eslintrc.json)
ESLint (rules validation) settings.
```json
// .eslintrc.json
{
  "env": {                                                                // environment settings / global variables
    "browser": true,                                                      // browsers
    "es6": true,                                                          // Modern JavaScript (ES6)
    "node": true,                                                         // NodeJS
    "commonjs": true,                                                     // CommonJS
    "jest": true,                                                         // Jest
  },
  "extends": [                                                            // extending features / validations (plugins)
    "eslint:recommended",                                                 // recommended validations ESLint
    "plugin:import/errors",                                               // import validations (errors)
    "plugin:import/warnings",                                             // import validations (warnings)
    "plugin:jsdoc/recommended",                                           // JSDoc recommended validations
    "plugin:react/recommended",                                           // recommended validations ReactJS
    "plugin:react-hooks/recommended",                                     // recommended validations ReactJS hooks
    "plugin:jest/recommended",                                            // recommended validations Jest
    "plugin:jsx-a11y/recommended",                                        // recommended accessibility validations
    "plugin:react-redux/recommended"                                      // recommended validations React Redux
  ],
  "parser": "babel-eslint",                                               // configuring modern javascript parsing
  "parserOptions": {                                                      // parsing options
    "ecmaFeatures": {                                                     // ecma features
      "jsx": true                                                         // use jsx
    },
    "ecmaVersion": 11,                                                    // ecmascript version
    "sourceType": "module"                                                // type of document source (import)
  },
  "settings": {                                                           // linter settings
    "import/resolver": {                                                  // import settings
      "node": {                                                           // NodeJS
        "extensions": [                                                   // module / file extensions
          ".js",
          ".jsx"
        ],
        "moduleDirectory": [                                              // module directories
          "node_modules",
          "src/"
        ]
      },
      "react": {                                                          // react settings
        "version": "detect"                                               // version
      }
    }
  },
  "rules": {                                                              // rule settings
    "jsdoc/require-param": [1, { "enableRootFixer": false }]              // remove autofix from parameters
  },
  "overrides": [                                                          // override rules
    {                                                                     // react component rules
      "files": [                                                          // files to override rules
        "*.jsx"                                                           // react components
      ],
      "rules": {                                                          // rules
        "jsdoc/require-param": "off",                                     // disabling the need for parameters in JSDoc
        "jsdoc/require-returns": "off"                                    // disabling the need to return in JSDoc
      }
    },
  ]
}
```

#### JavaScript VS Code Project Settings (jsconfig.json)
Configuration used by the VS Code JavaScript interpreter.

```json
// jsconfig.json
{
  "compilerOptions": {                                                    // compiler options
    "jsx": "react",                                                       // react
    "baseUrl": "src"                                                      // project base (root)
  },                                                                      
  "include": ["src"]                                                      // include module paths for correct functioning of intellisense
}
```

#### Styleguidist settings (styleguide.config.js)
Styleguidist settings (documentation and component playground)

```js
// styleguide.config.js
const { addLessLoader } = require('customize-cra');                       // library to customize webpack configurations

module.exports = {                                                        // override settings
  dangerouslyUpdateWebpackConfig(webpackConfig) {                         // active less
    const newWebpackConfig = addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
      },
    })(webpackConfig);

    return newWebpackConfig;
  },
  require: ['less-loader', './src/style.less'],                           // load project styles
  sections: [                                                             // project modules
    {
      name: 'Components',
      description: 'Application components.',
      components: ['src/components/**/*.component.jsx'],
    },
  ],
};
```

#### CRACO Settings - Ant Design Theme
```js
// craco.config.js
const CracoLessPlugin = require('craco-less');

module.exports = {                                                        // custom configuration (override)
  plugins: [
    {
      plugin: CracoLessPlugin,                                            // use craco plugin less
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,                                      // enabling inline javascript
          },
        },
      },
    },
  ],
};

```

### Dependencies
Project libraries dependencies.

#### Production Dependencies (build)
```json
{
...
  "dependencies": {
    "antd": "4.6.4",                                                      // design system library (wm)
    "axios": "^0.20.0",                                                   // request library
    "istextorbinary": "^5.11.0",                                          // utility to check if a file name is text or binary
    "react": "^16.13.1",                                                  // react - ui spa framework
    "react-contextmenu": "^2.14.0",                                       // context menu utility for react
    "react-copy-to-clipboard": "^5.0.1",                                  // utility to copy to the clipboard in react
    "react-csv": "^2.0.3",                                                // utility to create csv files on the front
    "react-dnd": "^11.1.3",                                               // drag and drop utility for react
    "react-dnd-html5-backend": "^11.1.3",                                 // html5 backend for react dnd
    "react-dom": "^16.13.1",                                              // react utilities for gift manipulation
    "react-draggable": "^4.4.3",                                          // react utility to create drag components
    "react-flow-renderer": "^5.6.0",                                      // flow mounting component for react
    "react-google-button": "^0.7.1",                                      // react utility for google signin button
    "react-google-picker": "^0.1.0",                                      // react utility for google picker
    "react-grid-layout": "^1.1.1",                                        // utility for creating layouts in grid format
    "react-image-lightbox": "^5.1.1",                                     // light box component for react
    "react-redux": "^7.2.1",                                              // redux utilities for react
    "react-resize-detector": "^5.2.0",                                    // browser resize detection utility
    "react-resize-panel": "^0.3.5",                                       // resizable panel component
    "react-router-dom": "^5.2.0",                                         // route libraries for react
    "react-scripts": "3.4.4",                                             // cra scripts and settings (create react app)
    "redux": "^4.0.4",                                                    // redux - flow-based state manager
    "redux-thunk": "^2.3.0",                                              // redux middleware for asynchronous actions
    "universal-cookie": "^4.0.2",                                         // javascript cookie utility
    "uuid": "^8.3.0"                                                      // utility for creating UUID
  }
...
}
```

#### Development Dependencies (dev)
Development dependencies.

```json
{
...
  "devDependencies": {
    "@axe-core/react": "^4.1.0",                                          // utility to validate accessibility rules in the browser
    "@craco/craco": "^5.8.0",                                             // create react app configuration override (CRACO) - used to customize the antd theme
    "babel-eslint": "10.1.0",                                             // parser (parsing) of modern javascript for ESLint
    "craco-less": "^1.17.0",                                              // less plugin for craco
    "customize-cra": "^1.0.0",                                            // utility to customize cra applications (create react app)
    "enzyme": "^3.10.0",                                                  // testing utility for react
    "enzyme-adapter-react-16": "^1.15.4",                                 // enzyme adapter for react
    "enzyme-to-json": "^3.5.0",                                           // enzyme to json converter (snapshot test)
    "eslint-config-react-app": "^5.2.1",                                  // basic react settings for eslint
    "eslint-import-resolver-node": "^0.3.4",                              // imports solver for eslint
    "eslint-plugin-import": "^2.22.0",                                    // eslint plugin for import validations
    "eslint-plugin-jest": "^24.0.1",                                      // eslint plugin for Jest validations
    "eslint-plugin-jsdoc": "^30.5.1",                                     // eslint plugin for JSDoc validations
    "eslint-plugin-jsx-a11y": "^6.3.1",                                   // eslint plugin for accessibility validations
    "eslint-plugin-react": "^7.20.6",                                     // eslint plugin for React validations
    "eslint-plugin-react-hooks": "^4.1.2",                                // eslint plugin for React hook validations
    "eslint-plugin-react-redux": "^3.3.0",                                // eslint plugin for React Redux validations
    "jest-sonar-reporter": "^2.0.0",                                      // convert jest output to sonar
    "nock": "^13.0.4",                                                    // http server mock
    "react-styleguidist": "^11.1.4",                                      // playground and component documentation
    "redux-mock-store": "^1.5.3"                                          // utility to mock store
  }
...
}

```

### Scripts
Project scripts.

#### Install Dependencies
To install the project's dependencies, just execute the command below in a terminal inside the project root.

```shell
# install project dependencies with yarn
yarn

# install project dependencies with npm
npm install
```

#### Start Jest - Unit Tests (Dev)
To start Jest, run the command below.

```shell
# start jest with yarn
yarn test

# start jest with npm
npm run test
```

#### Start Styleguidist - Development Playground (Dev)
To start the styleguidist component development playground, run the command
below at the project root.

```shell
# start styleguidist with yarn
yarn styleguide

# start styleguidist with npm
npm run styleguide
```

#### Start Project (Dev)
To start the project in development mode, just execute the command below in a
terminal within the project root.

```shell
# start project with yarn
yarn start

# start project with npm
npm start
```