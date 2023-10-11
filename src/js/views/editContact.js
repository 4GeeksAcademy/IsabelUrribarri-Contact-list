import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = () => {
    const { store, actions } = useContext(Context);
    const [nameInput, setNameInput] = useState("")
    const [emailInput, setEmailInput] = useState("")
    const [addressInput, setAddressInput] = useState("")
    const [phoneInput, setPhoneInput] = useState("")
    const params = useParams();
    let currentContact = null


    useEffect(() => {
        if(params.theid) {
            currentContact = store.contacts.find((element) => element.id == params.theid)
            if(currentContact) {
                setNameInput(currentContact.full_name)
                setEmailInput(currentContact.email)
                setAddressInput(currentContact.address)
                setPhoneInput(currentContact.phone)
            }

        }
      }, []);



    return (
        <div className="container">
            <div className="d-flex justify-content-between mb-3">
                <h3>{`Edit Contact`}</h3>
                <Link to="/" className="btn btn-danger">Return</Link>
            </div>
        
            <div className="container">
                <div className="row m-2">
                    <label className="col-2">Full Name:
                    </label>
                    <input id="nameInput" className="col-10" value={nameInput} onChange={e => setNameInput(e.target.value)}></input>
                </div>

                <div className="row m-2">
                    <label className="col-2">Email:
                    </label>
                    <input id="emailInput" className="col-10" value={emailInput} onChange={e => setEmailInput(e.target.value)}></input>
                </div>

                <div className="row m-2">
                    <label className="col-2">Address:
                    </label>
                    <input id="addressInput" className="col-10" value={addressInput} onChange={e => setAddressInput(e.target.value)}></input>
                </div>

                <div className="row m-2">
                    <label className="col-2">Phone:
                    </label>
                    <input id="phoneInput" className="col-10" value={phoneInput} onChange={e => setPhoneInput(e.target.value)}></input>
                </div>


                
                
            </div>
            <button className="btn btn-success mt-3" onClick={() => actions.newContactClicked(
                document.getElementById("nameInput").value,
                document.getElementById("emailInput").value,
                document.getElementById("addressInput").value,
                document.getElementById("phoneInput").value,
                store.contacts.find((element) => element.id == params.theid)
                )}>Submit</button>
        </div>
    )
}