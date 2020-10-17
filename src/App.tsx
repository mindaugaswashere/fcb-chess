import React from "react";
import Board from "./components/Board";
import LoginForm from "./components/LoginForm";
function App() {
	const [open, setOpen] = React.useState(false);
	return (
		<div className="main">
			{open ? <Board /> : <LoginForm setOpen={setOpen} />}
		</div>
	);
}

export default App;
