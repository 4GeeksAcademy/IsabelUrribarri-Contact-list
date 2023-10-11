import { redirect } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: ["loading"],
			agendas: ["loading"],
			agenda: "default"
		},
		
		actions: {

			setAgenda(newAgenda) {
				setStore({"agenda": newAgenda});
				getActions().loadSomeData()

			},

			loadAgendas: () => {
				document.getElementById("connectionMessage").innerHTML = ("")

				fetch("https://playground.4geeks.com/apis/fake/contact/agenda")
				.then((recieved) => {
					if(!recieved.ok) {
						document.getElementById("connectionMessage").innerHTML = ("Connection problems: " + recieved.status )
					}
					return recieved.json()
				}).then((data) => {setStore({ "agendas": data }); console.log(data)})

			},

			loadSomeData: () => {

				document.getElementById("connectionMessage").innerHTML = ("")

				fetch("https://playground.4geeks.com/apis/fake/contact/agenda/" + getStore().agenda)
				.then((recieved) =>  {
					if(!recieved.ok) {
						document.getElementById("connectionMessage").innerHTML = ("Connection problems: " + recieved.status )
					}
					return recieved.json()
				})
				.then((data) => {setStore({ "contacts": data }); console.log(data)})
			},

			deleteClicked: (id) => {
				if(confirm("Are you sure to want to delete this contact?")) {

					document.getElementById("connectionMessage").innerHTML = ("")

					fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
						method:"DELETE"
					}).then((recieved) => 
					{	
						console.log(recieved)
						if(!recieved.ok) {
							console.log(recieved.status)
							document.getElementById("connectionMessage").innerHTML = ("Connection problems: " + recieved.status )
						}
						return recieved.json()
					})
					.then((data) => {
						console.log(data);
						alert("Contact deleted")
						getActions().loadSomeData()
						})
				}
			},

			newContactClicked: (name, email, address, phone, current) => {

				document.getElementById("connectionMessage").innerHTML = (" ")

				if(current) {
					fetch(`https://playground.4geeks.com/apis/fake/contact/${current.id}`, {
						method: "PUT",
						body: JSON.stringify(
							{
								"full_name": name,
								"email": email,
								"agenda_slug": getStore().agenda,
								"address": address,
								"phone": phone
							}),
						headers: {
							"Content-Type": "application/json"
						}
						
					}).then((recieved) => 
					{
						if(!recieved.ok) {
							document.getElementById("connectionMessage").innerHTML = ("Connection problems: " + recieved.status )
						}
						return recieved.json()
					}
					)
					.then((data) => {
						console.log(data);
						alert("Contact updated")
						getActions().loadSomeData()
					})
				} else {
					fetch("https://playground.4geeks.com/apis/fake/contact/", {
						method: "POST",
						body: JSON.stringify(
							{
								"full_name": name,
								"email": email,
								"agenda_slug": getStore().agenda,
								"address": address,
								"phone": phone
							}),
						headers: {
							"Content-Type": "application/json"
						}
						
					}).then((recieved) => 
					{
						if(!recieved.ok) {
							document.getElementById("connectionMessage").innerHTML = ("Connection problems: " + recieved.status )
						}
						return recieved.json()
					})
					.then((data) => {
						console.log(data)
						alert("Contact created")
						getActions().loadSomeData()
					})
				}


			}
		}
	};
};

export default getState;