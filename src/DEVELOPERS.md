# Developer Guide for Mturk Engine

### Note: Mturk Engine ships with Redux DevTools enabled. Download Redux DevTools for your browser: [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) / [Firefox](https://addons.mozilla.org/en-US/firefox/addon/remotedev/)

This guide will walk you through the following:

* Starting Mturk Engine in development.
* Creating a build (single file) of Mturk Engine.
* Technologies used in Mturk Engine.
* Explanation of file structure.

This guide assumes you're in a Unix-like environment, which includes Mac, Linux,  and Windows Subsystem for Linux. 

You'll also need `npm` installed on your machine. npm comes packaged with node so it's likely that you already have it. If not, run the following command in your terminal: 

```shell
curl -L https://www.npmjs.com/install.sh | sh
```

You can find additional installation instructions if necessary on [npm's github page](https://github.com/npm/npm).

# Starting Mturk Engine in development.

Getting Mturk Engine running in development involves just 2 commands. After cloning this repo, run the following:

```shell
npm install
npm start
```

`npm install` will install all of Mturk Engine's dependencies. `npm start` will compile the depencies and the application's source code and launch a browser tab running the application. Any changes you save to files in the `/src` folder will cause the application to reload with your changes.

## Sending authenticated requests to Mturk (the website)

There are 2 things we need to do in order to send requests to Mturk:

1. Bypass Mturk's CORS policy
2. Send authenticated requests (e.g. so we can accept and return HITs)

### Bypassing Mturk's CORS policy.

Sending network requests to `https://www.mturk.com` from `localhost:8000` will not work because mturk's CORS policy blocks requests from origins that aren't 'www.mturk.com'. In order to bypass this, Mturk Engine uses a proxy server, located in the `server` folder, that will take network requests sent to it and pipe them to mturk with the proper headers.

### Sending authenticated requests

We can send authenticated requests the same way we do in the browser: cookies. The proxy server will attach cookies to the request but we have to provide them. Create a file in the `server` folder called `cookies.js` with the following command:

```shell
touch ./server/cookies.js && echo "module.exports = " >> ./server/cookies.js
```

## **IMPORTANT: It's important that the file be called `cookies.js` so that it's ignored by git (as specified in .gitignore). It will contain sensitive data so make sure you don't upload its contents to a repo somewhere.**

After the `module.exports = ` is where you'll be pasting in your cookies as a string (meaning it will be between quotes). After logging into Mturk, open the developer tools and switch to the "Network" tab (you may need to refresh the page). Examine the "Request Headers" section and copy the contents following "Cookie" and paste it between quotes after `module.exports = ` in your `./server/cokies.js` file. Ensure you didn't accidentally copy any new-line symbols as that will cause 'illegal character' errors.

Now you can start up the proxy server. Assuming you're in the project's top level directory:

```shell
cd server
npm start
```

When running in development, Mturk Engine will send requests to this proxy server (running on port 7777).

# Creating a build of Mturk Engine.

Creating a build of Mturk Engine is simple and done with a single command:
```shell
npm run build
```

This will make a minified production build suitable to be used in browsers in the `./build/static/js` folder. The location of the file is not optimal (and it's set by ts-react-scripts) so you can optionally run the `generate-release` shell script in the project's root directory to move it to the proper folder and name it appropriately. In order to generate version `2.0.0` for example, run:

```shell
bash ./generate-release.sh 2.0.0
```

# Technologies Used in Mturk Engine

The major technologies used in Mturk Engine in approximate order of importance (most important first):

- [TypeScript](https://github.com/Microsoft/TypeScript)
- [React](https://github.com/facebook/react)
- [Redux](https://github.com/reactjs/redux)
- [Immutable.js](https://facebook.github.io/immutable-js/)
- [Redux-saga](https://github.com/redux-saga/redux-saga)
- [Reselect](https://github.com/reactjs/reselect)

Mturk Engine also uses the following component libraries

- [Polaris](https://github.com/Shopify/polaris)
- [Blueprint](https://github.com/palantir/blueprint) 

To ensure code quality and consistent formatting, the project uses [tslint](https://github.com/palantir/tslint) and [prettier](https://github.com/prettier/prettier) (with print width set to 80 characters).

Some of the technologies explained, briefly:

* **TypeScript** is JavaScript with type annotations for functions, objects, and variables. It allows you to confidently make changes to one part of the application without worrying that your change is silently breaking another part of the application. 
* **React** is used to declare UI components and to efficiently update the DOM.
* **Redux** allows us to store the application's state (e.g. a user's search options) in a single global variable and assign slices of the application's state to components. Those components will then only update when the underlying data changes.
* **Immutable**.js and immutable data structures pair well with redux because redux decides whether our application will update by comparing the current application state, to the application state after an action is dispatched. When supporting a state consisting of thousands of entries, computing whether two states are equal is an expensive process. So if the largest sets of data (blocklists, hitDatabase) are immutable, we can cheapen that calculation greatly.
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
These functions make network requests. If the network request is successful (and a document object is received), the api function also calls parsing functions to extract data from the received document. Otherwise, they throw an error. That error is propagated to a saga, which handles the error by dispatching the appropriate `SOME_API_FAILURE`.

### `/sagas`
These are the link between action dispatching functions and api functions. Sagas translate `SOME_API_REQUEST` into `SOME_API_SUCCESS` or `SOME_API_FAILURE`.
