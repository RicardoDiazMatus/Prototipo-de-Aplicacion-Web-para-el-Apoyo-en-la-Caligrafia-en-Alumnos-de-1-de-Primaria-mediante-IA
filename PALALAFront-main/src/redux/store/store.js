import { createStore } from "redux";
import { rootReducer } from "../reducers/reducer";
import { appState } from "../state/state";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, appState);
export const persistor = persistStore(store);