import React,{useState, useEffect}from 'react';
import {FiPower, FiTrash2} from 'react-icons/fi';
import{Link, useNavigate} from 'react-router-dom'

import api from '../../service/Api';


import './styles.css'
import logoImg from '../../assets/logo.svg'

export default function Profile(){
    const history = useNavigate();
    const[incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');


    useEffect(() => {
        api.get('profile',{
            headers:{
                Authorization: ongId,
            }
        }).then(response =>{
            setIncidents(response.data);
        })
    }, [ongId]);
    //função assincrona para deletar um caso
    async function handleDeleteIncidente(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            //atualizar a dom depois de deletar um caso
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch(err) {
            alert('Errro ao deletar caso, tente novamente.');
        }
    }
    //função para fazer logout do sistema
    function handleLogout(){
        localStorage.clear();
        history('/')

    }


    return(

        <div className ="profile-container">
            <header>
                <img src = {logoImg} alt =" Be the Hero" />
                <span>Bem vinda, {ongName}</span>
                <Link className ="button" to ="/incidents/new">cadastrar novo caso</Link>
                <button onClick= {handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident =>(
                    <li key ={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}e</p>

                        <strong>DESCRIÇÂo:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style:'currency', currency:'AOA'}).format(incident.value)}</p>
                        <button onClick ={ ()=> handleDeleteIncidente(incident.id)} type = "button">
                            <FiTrash2 size={20} color ="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>

    );
}