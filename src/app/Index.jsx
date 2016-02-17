import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import App from './components/App'
import appFactory from './reducers/app'
import thunkMiddleware from 'redux-thunk'


let store = createStore(
    appFactory(),
    applyMiddleware(
        thunkMiddleware
    ))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
// 
// getScheduleList().then(
//     (data) => store.dispatch(
//         scheduleListSet(data)
//     )
// )
// 
// getSettings().then(
//     (data) => store.dispatch(
//         timeFrameSettings(data)
//     )
//)