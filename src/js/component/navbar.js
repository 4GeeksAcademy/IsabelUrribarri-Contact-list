import React, { useContext } from "react";
import { Context } from "../store/appContext";
import ErrorMessage from "./errorMessage";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	console.log(store.agendas)

	let dropAgendas = store.agendas.map((item, id) => {
		return (
			<option value={item} id={id}>{item}</option>
		)
	})

	return (
		<nav className="navbar navbar-secondary bg-secondary mb-3">
				<span className="navbar-brand ms-3 h1">Contact List</span>
				<div className="dropdown">
					<select className="form-select" name="agendas" id="agendas" onChange={(e) => actions.setAgenda(e.target.value)}>
						<option id={-1} disabled selected value> -- select an agenda -- </option>
						{dropAgendas}
					</select>
				</div>

				<ErrorMessage />

		</nav>
	);
};