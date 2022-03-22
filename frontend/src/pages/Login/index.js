import React, { useState} from 'react';
import api from '../../service/Api';
import { Link, useNavigate} from 'react-router-dom';

import {FiLogIn} from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';


export default function Login(){ 

    const [id, setId] = useState();
    const history = useNavigate()

     async function handleLogin(e){
        e.preventDefault();
        try {
            const response = await api.post('sessions', {id});
            //console.log(response.data.name);
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err){
            alert("Falha no login, tente novamente. ");
        }
    }
    return(
        <div className = "login-container">
            <section className ="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit ={handleLogin}>
                    <h1>Faça seu login</h1>
                    <input 
                        placeholder ="Seu ID"
                        value = {id}
                        onChange ={e => setId(e.target.value)}
                    />
                    <button className="button" type ="submit">Entrar</button>

                    <Link  className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041"/>
                        Sigin Up
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>

    );
}