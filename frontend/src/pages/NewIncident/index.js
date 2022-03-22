import React, {useState} from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
//import axios from 'axios';

import api from '../../service/Api';
import './style.css';
import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
    const history = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId =localStorage.getItem('ongId');

//função para criar un novo caso
    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value,
        };
        try{
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            history.push('/profile');

        }catch(err){
            alert('Erro ao cadastrar caso, tente novamente')

        }
    }

    return (
        <div className ="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt =" Be The Hero"/>
                    <h1>Cadastrar casos</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heróe para resolver isso.</p>
                    <Link  className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                        valtar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="titulo do caso"
                        value= {title}
                        onChange ={e => setTitle(e.target.value)}    
                    />
                    <textarea 
                        placeholder="Descrição"
                        value= {description}
                        onChange ={e => setDescription(e.target.value)}    
                    />
                    <input 
                        placeholder="valor em AOA"
                        value= {value}
                        onChange ={e => setValue(e.target.value)}
                    />
                      
                    <button className="button" type = "submit">Cadastrar</button>
    
                </form>
            </div>
        </div>

    );
}
