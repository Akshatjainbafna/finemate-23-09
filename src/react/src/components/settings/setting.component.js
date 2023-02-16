import React, { useState } from "react";
import { BsPower } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { IconContext } from "react-icons/lib";
import { Link, Redirect } from "react-router-dom";

export default function SettingsComponent(){

    return (
        <main className="m-4">
            <Link style={{color: 'var(--lightThemeFontSecondary)', textDecoration: 'none'}} onClick={() => localStorage.clear()} to = '/logout'>
            <div className="d-flex">
                <h5 className='mr-3'>Logout</h5>
                <IconContext.Provider value={{ color: 'var(--lightThemeFontSecondary)', size: '20px' }}>
                    <FiLogOut />
                </IconContext.Provider>
                <div>
                </div>
            </div>
            </Link>
        </main>
    )
}