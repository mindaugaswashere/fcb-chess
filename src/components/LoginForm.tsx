import React from "react";
interface Props {
	setOpen: any;
}
const LoginForm = ({ setOpen }: Props) => {
	const paspaudziau = (e: any) => {
		e.preventDefault();
		if (e.target[0].value === "sveiki" && e.target[1].value === "sveiki") {
			setOpen(true);
		} else {
			console.log("login attempt failed");
		}
	};

	return (
		<div className="chess-login white-text">
			<form onSubmit={(e) => paspaudziau(e)} className="login-form">
				<br />
				<input placeholder="Login" className="login-input" type="input" />

				<input placeholder="Password" className="login-input" type="password" />
				<br />
				<input type="submit" className="submit-button" value="Play!" />
			</form>
		</div>
	);
};
export default LoginForm;
