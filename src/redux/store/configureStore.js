import { applyMiddleware , compose} from "redux";
import { legacy_createStore as createStore } from 'redux';
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducers";


const configureStore = () => {
    const middleware = [thunk];
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancer = composeEnhancer(applyMiddleware(...middleware));
    const store = createStore(rootReducer(), enhancer);
  return (store)
}

export default configureStore;