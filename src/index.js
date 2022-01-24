import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./static/fonts/font.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";

let defaultState = [{ animation: true }];

function reducer(state = defaultState, action) {
	if (action.type === "애니메이션 끄기") {
		let newState = [...state];
		newState[0].animation = false;
		return newState;
	} else if (action.type === "애니메이션 켜기") {
		let newState = [...state];
		newState[0].animation = true;
		return newState;
	}
	return state;
}

let store = createStore(reducer);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
