import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { filters, heroes } from '../reducers'
import thunk from 'redux-thunk'

const stringMiddleware = () => (dispatch) => (action) => {
	if (typeof action === 'string')
		return dispatch({
			type: action,
		})
	return dispatch(action)

}

// const enhancers = (createStore) => (...args) => {
// 	const store = createStore(...args)
// 	const oldDispatch = store.dispatch
// 	store.dispatch = (action) => {
// 	}
// 	return store
// }

const store = createStore(
	combineReducers({ filters, heroes }),
	compose(
		applyMiddleware(stringMiddleware, thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
)

export default store
