import './navBar.css';
import React from 'react';
import {NavLink,Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometer,faShoppingCart,faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../auth';

export function NavBar() {
    const {user,logout} = useAuth()

    return (
        <nav>
            <div className='container'>
                <Link to='/dashboard' className='brand'><h1>Product Admin</h1></Link>
                <div className='navlist'>
                    <NavLink to='/dashboard'><FontAwesomeIcon icon={faTachometer} size='lg' style={{color : '#ffffff'}} className='icon'/>
                    Dashboard</NavLink>
                    <NavLink to='/product'><FontAwesomeIcon icon={faShoppingCart} size='lg' style={{color : '#ffffff'}} className='icon'/>
                    Product</NavLink>
                    <NavLink to='/account'><FontAwesomeIcon icon={faUser} size='lg' style={{color : '#ffffff'}} className='icon'/>
                    Account</NavLink>
                </div>
                <div className='logout'>
                    {
                        user && <Link to='/login' onClick={logout}>Logout</Link>
                    }
                </div>
            </div>
        </nav>
    )
}

export default NavBar;