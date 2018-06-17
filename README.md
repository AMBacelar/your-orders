Quick tecnical test

currently deployed to https://your-orders.herokuapp.com/

time limit of 3 hours starting only once I start writing code itself.

After a second read through I came to a descision on how I'll build the app.
  * started the project with `create-react-app`
  * routing and deep linking with `react-router-dom`
  * I decided to not use state at all, and manipulate everything through the `redux` store
  * the documentation requested one search box for multiple fields, so I implemented a javascript text-search engine `elasticlunr`
  * the documentation requested settings that persist throughout navigation, so I knew I was going to use `redux` from the beginning
  * since pagination was requested, I knew that it would be best to emulate a `limit, offset` system to accomodate that... although I didn't get to actually implement it, the functionality is already mocked.
  * For the sake of readablility I implemented `react-bootstrap` just so things are easier to manipulate and better displayed, due to time constraints, I made no attempt to desing any sort of UI.

  I admittedly did spend too much time on the api side of things, siply to set up the hydration of the dataset, and no time at all on the details page, although deep linking is working, and the details page does display the order object.

  Regretfully, I didn't manage to write any tests of my own.
    Had I had the time, 
      I would write a few tests to ensure that the api is doing as it should.
        Fortunately, in the front end side, a lot of it is simple movement of data.
        If React bugs out on setting props/if Redux breaks in the documented implementation, then there are bigger issues than I can afford to fix.

My assumptions on the api is similar to the implementation that I set up, where the search actions would be `axios` calls, which is why I set the api end to return promises.

A small time sink came with the implementation of the search filters, I would normally use state for some of the features, and utilize the callback built into `this.setState` but in the end I changed how I set up the functions slightly and implemented `redux-thunk` which allows me to return a funtion that can call dispatch when I desire, allowing the utilisation in `./src/actions/search.js {onChangeFilters}` where after dispatch I return a resolved promise, allowing me to use `.then()` as a callback (I am indeed aware of `async await` but the simple `.then()` served it's purpose well enough in this case, especially with the time constraints )

to update the dataset run
`node ./src/_mockApi/generateDataset.js`

to run the app in a local environment run
`npm start`