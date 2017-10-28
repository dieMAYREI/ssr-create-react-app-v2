# React Router Redux SSR Prefetch Helmet Boilerplate

## Capabilities
* React + Redux + ReactRouter4
* SSR
* Prefetch data
* Shared Initial State
* React helmet & server side rendering
* 404 status code ^.^

## Install
``` bash
npm install
npm run build
npm run start:server
```

## Persistent Store
It can be useful to persist the store-data (including the API responses), to speed things up and prevent running into API rate-limits (especially server-side).

You should however add some invalidation logic, to get fresh data from time to time.

### Client
[`redux-persist`](https://github.com/rt2zz/redux-persist) is a nice library for this. 
It can be helpful to delay rendering until rehydration is complete. v5 includes a `PersistGate` component, for v4 we used this wrapper: [HydratedAppProvider](src/containers/HydratedAppProvider.js)

### Server
One way to solve this is to store the store-data outside of the request. Example:

* [`PersistentStoreData`](server/PersistentStoreData.js)
* Call `saveStoreData(storeObject)` after rendering the response
* Use `getStoreData()` as initial state in `configureStore(initialState)`
