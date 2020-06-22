import {createStore, applyMiddleware, compose} from "redux"
import rootReducer from './reducers/index'
import reduxImmutableStateInvariant from "redux-immutable-state-invariant"
import thunk from 'redux-thunk'

export default function configureStore ( initialState ) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose //adds support for redux devtools

    return createStore( rootReducer,
        initialState,
        composeEnhancers( applyMiddleware( thunk, reduxImmutableStateInvariant() ) ) )

    //reduxImmutableStateInvariant warns us if we mutate a state variable in the store. Added as dev dependency, wont affect production build.
}
