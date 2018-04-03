# What is this?

This is a server used in development to bypass CORS issues and to send authenticated requests to Mturk.

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
