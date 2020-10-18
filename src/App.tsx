import React, { useState } from "react";
import Board from "./components/Board";
import LoginForm from "./components/LoginForm";
function App() {
	const [open, setOpen] = useState(true);
	const [movesCount, setMovesCount] = useState(0);
	return (
		<div className="main">
			{open ? (
				<div>
					<Board movesCount={movesCount} setMovesCount={setMovesCount} />
					<div className="moves-counter">Movies count: {movesCount}</div>
				</div>
			) : (
				<LoginForm setOpen={setOpen} />
			)}
		</div>
	);
}

export default App;
