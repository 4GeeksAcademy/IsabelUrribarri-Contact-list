import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { SingleContact } from "../component/singleContact";
import { Link } from "react-router-dom";


export const Contacts = ( ) => {
    const { store, actions } = useContext(Context);

    let profiles = store.contacts.map((item) => {
        return (
            <div>
                <SingleContact name={item.full_name} address={item.address} phone={item.phone} email={item.email} id={item.id} />
            </div>

        )

    })

    return (
        <div>
            <Link to="/edit" className="btn btn-success">Add New Contact</Link>
            {profiles}
        </div>
    )
}