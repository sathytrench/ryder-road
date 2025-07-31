## About

This is a WIP light frontend built on top of the Airtable API, meant to be an index of a client's collection of
rare books and ephemera.

There is little local development you can do without having access to environment variables, but I wanted
this code to be open source reference for anyone who might be trying to figure out how to
fetch data from Airtable.

You can check out the progress of the deployed site here: [https://ryder-road.netlify.app/](https://ryder-road.netlify.app/).

## Libraries

I get a kick out of trying to build stuff with as little dependence on third party libraries as possible.
This is meant to be a very simple app, and so far I'm using [wouter](https://github.com/molefrog/wouter) for frontend routing
and [airtablejs](https://github.com/airtable/airtable.js/), Airtable's official JavaScript client.

Everything else is built in React and good old vanilla CSS.

## Available Scripts
- `npm start` runs the app in the development mode on [http://localhost:3000](http://localhost:3000).
- `npm test` launches the test runner in the interactive watch mode.
- `npm run build` correctly bundles React in production mode, optimizes the build for the best performance, and builds the app for production to the `build` folder.

## Acknowledgments

The CSS code for the .sr-only class was found here: https://kittygiraudel.com/snippets/sr-only-class/,
in an effort to keep the form visually stylish but still accessible to screenreaders.

## Future goals

- TypeScript conversion
- testing