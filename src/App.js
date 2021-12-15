import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import TopBar from "./components/topComponent";
import CharPage from "./pages/charPage";

function App() {
	return (
		<Router>
			<TopBar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/char/:charName" element={<CharPage />} />
			</Routes>
		</Router>
	);
}

export default App;
