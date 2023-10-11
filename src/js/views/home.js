import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Contacts } from "./contacts";

export const Home = () => (
	<div className="container">
		<Contacts />
	</div>
);
