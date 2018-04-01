# Developer Guide for Mturk Engine

This guide will walk you through the following:

* Starting Mturk Engine in development.
* Creating a build (single file) of Mturk Engine.
* Technologies used in Mturk Engine.
* Explanation of file structure.

This guide assumes you're in a Unix-like environment, which includes Mac, Linux, and Windows Subsystem for Linux.

You'll need `yarn` and the latest version of `node` installed on your machine.

* [Node installation instructions](https://nodejs.org/en/download/package-manager/)
* [Yarn installation instructions](https://yarnpkg.com/lang/en/docs/install/)

# Starting Mturk Engine in development.

Getting Mturk Engine running in development involves just 2 commands. First clone this repo with

```shell
git clone https://github.com/Anveio/mturk-engine.git
cd mturk-engine
```

Be warned that I frequently push to master so cloning from the above URL may give you some unfinished or experimental code. You can use the GitHub user interface to browse the repo as it was during specific versions and clone from there, for example: https://github.com/Anveio/mturk-engine/tree/1.4.2

Then run the following:

```shell
yarn install
yarn start
```

`yarn install` will install all of Mturk Engine's dependencies. `yarn start` will compile the dependencies and the application's source code and launch a browser tab running the application. Any changes you save to files in the `/src` folder will cause the application to reload with your changes.

## Sending authenticated requests to worker.mturk.com.

There are 2 things we need to do in order to send authenticated requests to worker.mturk.com:

1.  Satisfy Mturk's CORS policy
2.  Send along our credentials (e.g. so we can accept and return HITs)

### Satisfying Mturk's CORS policy.

Sending network requests to `https://worker.mturk.com` from `localhost:8000` will not work because the site's CORS policy blocks requests from origins that aren't 'worker.mturk.com'. In order to bypass this, Mturk Engine uses a proxy server, located in the `server` folder, that will take network requests sent to it and pipe them to mturk with the proper headers.

### Sending credentials with our requests

We can send our credentials the same way we do in the browser: cookies. The proxy server will attach cookies to the request but we have to provide them. Create a file in the `server` folder called `cookie.js` with the following command:

```shell
touch ./server/cookie.js && echo "module.exports = " >> ./server/cookie.js
```

**IMPORTANT: It's important that the file be called `cookie.js` so that it's ignored by git (as specified in .gitignore). It will contain sensitive data so make sure you don't upload its contents to a repo somewhere.**

After logging into Mturk, open the developer tools with F12, switch to the "Network" tab (you may need to refresh the page) and click the top most entry. Examine the "Request Headers" section and copy the contents following "Cookie" and paste it between quotes after `module.exports =` in your `./server/cookie.js` file. Ensure you didn't accidentally copy any new-line symbols as that will cause 'illegal character' errors.

Now you can start up the proxy server. Assuming you're in the project's top level directory:

```shell
cd server
yarn install
yarn start
```

When running in development, Mturk Engine will send requests to this proxy server (running on port 7777).

# Creating a build of Mturk Engine.

Creating a build of Mturk Engine is simple and done with a single command:

```shell
yarn build
```

This will make a minified production build suitable to be used in browsers in the `./build/static/js` folder. The location of the file is not optimal (and it's set by ts-react-scripts) so you can optionally run the release script located in the `generate-release` folder. First you'll need to install the packages specified in that directory's `package.json` which shouldn't take too long.

```shell
cd ./generate-release
yarn install
cd ..
```

Then to create a release with the version number 2.0.0, for example, you could run

```shell
yarn release 2.0.0
```

# Technologies Used in Mturk Engine

The major technologies used in Mturk Engine in approximate order of importance (most important first):

* [TypeScript](https://github.com/Microsoft/TypeScript)
* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux)
* [Immutable.js](https://facebook.github.io/immutable-js/)
* [Redux-saga](https://github.com/redux-saga/redux-saga)
* [Reselect](https://github.com/reactjs/reselect)

Mturk Engine also uses the following component libraries

* [Polaris](https://github.com/Shopify/polaris)
* [Blueprint](https://github.com/palantir/blueprint)

To ensure code quality and consistent formatting, the project uses [tslint](https://github.com/palantir/tslint) and [prettier](https://github.com/prettier/prettier) (with print width set to 80 characters).

Some of the technologies explained, briefly:

* **TypeScript** is JavaScript with type annotations for functions, objects, and variables. It allows you to confidently make changes to one part of the application without worrying that your change is silently breaking another part of the application.
* **React** is used to declare UI components and to efficiently update the DOM.
* **Redux** allows us to store the application's state (e.g. a user's search options) in a single global variable and assign slices of the application's state to components. Those components will then only update when the underlying data changes.
* **Immutable**.js and immutable data structures pair well with redux because redux decides whether our application will update by comparing the current application state to the application state after an action is dispatched. When supporting a state consisting of thousands of entries, computing whether two states are equal is an expensive process. So if the largest sets of data (blocklists, hitDatabase) are immutable, we can cheapen that calculation greatly.
* **Redux-saga** is used to cleanly handle asynchronous and side-effect causing behavior. All network requests, for example are handled by redux-saga, as well as anything timing based, e.g. search delay and watchers.
* **Reselect** allows us to efficiently manipulate data before it reaches our components. For example, every time our search returns results, we need to filter out HITs that don't have a high enough T.O., then we need to sort them according to the user's preference, and then we need to group the unread HITs before the read HITs. Reselect allows us to make that computation once, not recompute when the data doesn't change, and share the result across all the components that would need it.

# Explanation of File Structure

Everything that ends up in the final built .js file is in the `/src` folder.

### `./types.d.ts`

This file contains almost all of the object types present in the application. Some interstitial types are colocated with the code they're relevant to. Important here is the `RootState` interface which describes our application's state.

### `/constants`

The `index.ts` file contains the all the types of actions in our application. These action types determine which reducer or reducers are triggered. The reducer then alters the application's state in a predictable way.

### `/actions`

These files contain the functions that create the objects that are passed to reducers. Components call these functions and dispatch them to the store to trigger changes.

### `/components`

These files contain the markup for the UI as well as the logic of mapping the application state to specific components.

### `/reducers`

Reducers are simple functions that check the type of each dispatched action and return a new application state when the action's `type` matches.

### `/selectors`

Functions that describe how to manipulate data. E.g. sorting, filtering and grouping search results.

### `/api`

These async functions make network requests. If the network request is successful (and a document object is received), the api function also calls parsing functions to extract data from the received document. Otherwise, they throw an error. That error is propagated to a saga, which handles the error by dispatching the appropriate `SOME_API_FAILURE` action.

### `/sagas`

These are the link between action dispatching functions and api functions. Sagas translate `SOME_API_REQUEST` actions into `SOME_API_SUCCESS` actions or `SOME_API_FAILURE` actions.

### Note: Mturk Engine ships with Redux DevTools enabled. Download Redux DevTools for your browser: [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) / [Firefox](https://addons.mozilla.org/en-US/firefox/addon/remotedev/)
