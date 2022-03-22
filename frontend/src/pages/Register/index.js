import React, {useState} from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import { Link , useNavigate} from 'react-router-dom';
import api from '../../service/Api';
import './styles.css';
import logoImg from '../../assets/logo.svg';
//import heroesImg from '../../assets/heroes.png';
export default function Register(){
    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [whatsapp, setWhatsapp]= useState('');
    const [city, setCity]= useState('');
    const [uf, setUf]= useState('');
    const history = useNavigate();


   async function hangleRegister(e){
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try {
            const response = await api.post('ongs', data);
            alert(`seu ID de acesso: ${response.data.id}`);
            history('/')
        } catch(err){
            alert('Erro no cadastro, tente novamente.')
        }
    }
        
    return(
        <div className ="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt =" Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link  className="back-link" to="/">
                    <FiArrowLeft size={16} color="#E02041"/>
                        Login
                    </Link>
                </section>
                <form onSubmit = {hangleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value = {name}
                        onChange ={e => setName(e.target.value)}
                    
                    />
                    <input
                        type="email" 
                        placeholder="E-mail"
                        value = {email}
                        onChange ={e => setEmail(e.target.value)}

                    />
                    <input
                        placeholder="WhatsApp"
                        value = {whatsapp}
                        onChange ={e => setWhatsapp(e.target.value)}
                    />

                    <div className ="input-grup">
                        <input
                            placeholder="Cidade"
                            value = {city}
                            onChange ={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="UF"
                            style ={{ width : 80 }}
                            value = {uf}
                            onChange ={e => setUf(e.target.value)}
                         />
                    </div>
                    <button className="button" type = "submit">Cadastrar</button>
    
                </form>
            </div>
        </div>

    );

}