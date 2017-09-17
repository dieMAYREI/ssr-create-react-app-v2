import merge from "lodash.merge";

let store = {};

export function saveStoreData(storeData) {
  // Here you could delete some data that should net be stored (specific to the current request/user)

  store = merge(store, storeData);
}

export function getStoreData() {
  return Object.assign({}, store);
}
