# DEV React-Native-Apollo Starter

This is a repository with starter code for new frontend mobile projects at DEV.

**NOTE: When starting a project, update the title and provide a description here for the project. You should also put any engineering-specific information here that you think might be important for future engineers to know (quirks of an API, for example).**

To start a new project built off of this repository, click the green "Use this Template" button.

### Running the project

```bash
$ npm i
$ npm run start
```

## Contributing to this project

Please use the workflow and git conventions outlined [here](https://docs.google.com/document/d/1MJUp3kGXOG2ck8phtELk1Ph2AcBFZDMpM9j8dJTCeIw/edit?usp=sharing) when making contributions to this project. The guidelines are designed to increase the long term efficacy of the our engineering efforts, meaning the effort that goes into following these standards today will help save the engineers of tomorrow a considerable amount of time.

## Project Layout

### Project Structure

This repository contains the general frontend mobile file structure conventions we use at DEV. It has react-navigation, apollo integration, and tyled-components. It also has a full devloper environment with prettier, eslint, and travis set up. The repository was designed first and foremost to scale to large projects. It should be easy to extend the base file structure and setup here to much larger projects.

```
project-repo-name
└───__tests__
|
└───.github
|
└───android
|
└───ios
│   └───fastlane
|
└───node_modules
│
└───src
│   │   App.js
|   |   client.js
│   │   config.js
|   |   theme.js
│   │
│   └───assets
│   |
│   └───components
│   |   └───LineInput
|   |   |   └─── index.js
|   |   |   └─── styles.js
|   |   |   └─── graphql.js
│   |   └───PageHeader
│   |   └───SubmitButton
│   │
│   └───navigation
│   |   └───AuthNavigator.js
│   |   └───MainNavigator.js
│   |   └───SettingsNavigator.js
│   |   └───RootNavigator.js
|   |
│   └───screens
│       └───Auth
|       |   └───Login
|       |   |   └───index.js
|       |   |   └───styles.js
|       |   |   └───graphql.js
|       |   └───Register
|       |   └───ForgotPassword
│       └───Main
|       |   └───LandingScreen
|       |   └───Profile
│       └───Settings
|           └───MySettings
|           └───FAQ
│
|   .buckconfig
|   .eslintrc.json
|   .flowconfig
|   .gitattributes
|   .gitignore
|   .npmrc
|   .prettierrc
|   .travis.yml
|   .watchmanconfig
|   app.json
|   babel.config.js
|   index.js
|   metro.config.js
|   package-lock.json
|   package.json
|   README.md
```

### Important Directories and Files

- **.github**

  - Used to store our PR and Issue templates, if you needed to create new templates or update the existing ones, they would go here.

- **ios, android**

  - These are the build files for the iOS and Android versions of the app. **Important:** Messing around in these folders can result in corrupt apps and _horrible_ bugs. You shouldn't touch anything here except for the Fastlane configuration. Otherwise, all changes to the iOS/Android configurations should be made through Xcode or Android Studio, as they automatically manage all the intracacies of the builds.

- **fastlane**

  - This directory contains the Fastlane configuration that allows easier deployment to iTunes Connect (and eventually the App Store). You will need to configure this with the specific credentials of your project.

- **src**

  - The main directory. Used to store all javascript files

- **App.js**

  - The root component. Any resources that need to be accessed by the whole app (like redux, theme provider, apollo provider, etc.) must be stored here. We try to keep this file light, so only put work here if it is **_absolutely_** necessry

- **config.js**

  - Used to store constants that are important to the functionality of the app (like api urls, api keys, query limits, etc.)

- **theme.js**

  - Used to store constants that are important to style (like colors, fonts, widths, heights, etc.). This is also where we load our fonts.

- **components**

  - The top level components folder is used to store components that will be used throughout the app.

- **navigation**

  - This contains the react-navigation setup and navigators that organize the userflow in the app. RootNavigator, as the name suggests, is the top-level navigator that is used in App.js.

- **screens**

  - Used to store the different screens of the app. This directory should probably use a couple subdirectories to divide up your screens in a logical way--probably something reminiscent of the navigator structure (see the flowchart above).

- **navigation**

  - The top level components folder is used to store components that will be used throughout the app.
