import React, { useState } from "react";
import { BsPower } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { Link, Redirect } from "react-router-dom";

export default function SettingsComponent(){

    return (
        <main className="mt-5">
            <Link style={{color: '#834bc4', textDecoration: 'none'}} onClick={() => localStorage.clear()} to = '/logout'>
            <div className="d-flex justify-content-center">
                <div className="mr-2">
                <h5>Logout</h5>
                </div>
                <div>
                <IconContext.Provider value={{ color: '#834bc4', size: '22px' }} >
                    <BsPower />
                </IconContext.Provider>
                </div>
            </div>
            </Link>
        </main>
    )
}