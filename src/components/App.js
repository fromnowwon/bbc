import "./App.scss";
import Header from "./Header";
import Scroll from "./Scroll";
import StaticContents from "./StaticContents";

function App() {
    return (
		<div className="App">
			<div className="wrapper" style={{ padding: "1rem" }}>
				<Header />
				<Scroll />
				<StaticContents />
			</div>
		</div>
	);
}

export default App;
