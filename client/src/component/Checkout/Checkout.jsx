import React, {useState,Helmet} from "react";
import Summary from "../Carrito/Summary"
import authAxios from '../../axios'
import { useEffect } from "react";
import {Link} from 'react-router-dom';
import jwt from 'jwt-simple';
import s from "../../styles/Checkout.module.css"

const Checkout= () =>{
 
    const querystring = window.location.search
    const params = new URLSearchParams(querystring)
    let payment_id = params.get('payment_id')
    console.log(payment_id)
   /*  name:'',
    surname:"", 
    id:"",
    articles:""
     */
    const[input, setInput]= useState({
        name: '',
        surname: '',
        street: '',
        number: '',
        apartament: '',
        city: '',
        cp: '',
        province: '',
        country: '',
        phone: '',
        comentario: '',
        articles: []
    })
    const[errors, setErrors] = useState({
        name: '',
        surname: '',
        street: '',
        number: '',
        apartament: '',
        city: '',
        cp: '',
        province: '',
        country: '',
        phone: '',
        error: true
        }); 

    function validate2(input) {
        switch(input.target.name){
            case 'surname':
            surname(input.target.value)
            break;
            case 'name': 
            name(input.target.value)
            break;
            case 'street': 
            street(input.target.value)
            break;
            case 'number': 
            number(input.target.value)
            break;
            case 'apartament': 
            apartament(input.target.value)
            break;
            case 'city': 
            city(input.target.value)
            break;
            case 'cp': 
            cp(input.target.value)
            break;
            case 'province': 
            province(input.target.value)
            break;
            case 'country': 
            country(input.target.value)
            break;
            case 'phone': 
            phone(input.target.value)
            break;
        }      
    }

    const name = (name) => {
        if (name === "") {
            return setErrors({...errors, name:'El nombre es requerido'})
        }else{
            return setErrors({...errors, name: null})
        }
    } 
    const surname = (surname) => {
        if (surname === "") {
            return setErrors({...errors, surname:'El apellido es requerido'})
        }else{
            return setErrors({...errors, surname: null})
        } 
    }   
    const number = (number) => {
        if (number === "") {
        return setErrors({...errors, number:'El numero es requerido'})
    }else{
        return setErrors({...errors, number: null})
    }}   
    const street = (street) => {
        if (street === "") {
        return setErrors({...errors, street:'La calle es requerida'})
    }else{
        return setErrors({...errors, street: null})
    }}   
    const apartament = (apartament) => {
        if (apartament === "") {
        return setErrors({...errors, apartament:'El departamento es requerido'})
    }else{
        return setErrors({...errors, apartament: null})
    } }  
    const city = (city) => {
        if (city === "") {
        return setErrors({...errors, city: 'El Barrio es requerido'})
    }else{
        return setErrors({...errors, city: null})
    }}   
    const cp = (cp) => {
        if (cp === "") {
        return setErrors({...errors, cp: 'El codigo postal es requerido'})
        }else{
            return setErrors({...errors, cp: null})
        }
    }   
    const province = (province) => {
        if (province === "") {
        return setErrors({...errors, province:'La provincia es requerido'})
    }else{
        return setErrors({...errors, province: null})
    }}   
    const country = (country) => {
        if (country === "") {
        return setErrors({...errors, country:'El pais es requerido'})
    }else{
        return setErrors({...errors, country: null})
    } 
    }
    const phone = (phone) => {
        if (phone === "") {
        return setErrors({...errors, phone:'El telefono es requerido'})
        }else{
            return setErrors({...errors, phone: null,  error: false})
        }
    }    

    const[flagPago, setFlagPago] = useState('');
    
    let userId
    if(localStorage.getItem('token')) var decoded = jwt.decode(localStorage.getItem('token'), "ecommerce-ft06-g07");
         if(decoded){
          userId= decoded.user.id}

    const handleChange =  (e) =>{    
            setInput({
            ...input,
            [e.target.name]: e.target.value,
            
        });
        validate2(e); 
        }

    

    useEffect(()=>{
        authAxios.get('cart/users/' + userId) 
        .then(ans => setInput({...input, articles: ans.data}))
        .catch(err=> console.log(err))
    
    },[])


    useEffect(()=>{ 
    },[flagPago])
    
    const handleSubmit = (e) => {
           
       authAxios.put('checkout/'+ userId, {
        surname: input.surname,
        name: input.name,
        street : input.street,
        number: input.number,
        apartament: input.apartament,
        city: input.city,
        cp: input.cp,
        province: input.province,
        country: input.country,
        phone: input.phone,
        comentario: input.comentario,
        articles: input.articles,
        payment_id: payment_id
        })
        .then(ans=> window.location = '/')
        .catch(err=> console.log(err))  
    
    }

    return(
        

        <div className={s.container}>
            <div className={s.revContainer}>               
                    <div className={s.datos}>
            <p>Completar los datos para realizar el envio </p>
            <p>(*) campos obligatorios</p>
            <label >nombre: *</label>           
            <input className={s.input}  onChange={handleChange} type="text" name='name' value={input.name}/>
                {!errors.name? null : <p className={s.error}>{errors.name}</p>}

            <label >apellido: *</label>           
            <input className={s.input} onChange={handleChange} type="text" name='surname' value={input.surname}/>
                {!errors.surname? null : <p className={s.error}>{errors.surname}</p>}

            <label >pais: *</label>           
            <input className={s.input} onChange={handleChange} type="text" name='country' value={input.country}/>
            {!errors.country? null : <p className={s.error}>{errors.country}</p>}

            <label >Provincia: *</label>           
            <input className={s.input} onChange={handleChange} type="text" name='province' value={input.province}/>
            {!errors.province? null : <p className={s.error}>{errors.province}</p>}

            <label >departamento: *</label>
            <input className={s.input} onChange={handleChange} type="text" name='apartament' value={input.apartament} />
            {!errors.apartament? null : <p className={s.error}>{errors.apartament}</p>}

            <label >Barrio: *</label>
            <input className={s.input} onChange={handleChange} type="text" name='city' value={input.city} />
            {!errors.city? null : <p className={s.error}>{errors.city}</p>}

            <label >codigo postal: *</label>
            <input className={s.input} onChange={handleChange} type="number" name='cp' value={input.cp} />
            {!errors.number? null : <p className={s.error}>{errors.number}</p>}

            <label >calle: *</label>
            <input className={s.input} onChange={handleChange} type="text" name='street' value={input.street} />
            {!errors.street? null : <p className={s.error}>{errors.street}</p>}

            <label >numero de casa: *</label>
            <input className={s.input} onChange={handleChange} type="number" name='number' value={input.number} />
            {!errors.number? null : <p className={s.error}>{errors.number}</p>}

            <label >telefono: *</label>
            <input className={s.input} onChange={handleChange} type="number" name='phone' value={input.phone} />
            {!errors.phone? null : <p className={s.error}>{errors.phone}</p>}

            <label >Comentario extra</label>
            <input className={s.input} onChange={handleChange} type="text" name='comentario' value={input.comentario} />
                </div>
                <div className={s.boton}>
            <Summary className={s.summary} data={input.articles}/>
            { errors.name || errors.surname || errors.country || errors.street || errors.number || errors.province || errors.apartament || errors.cp || errors.city  || errors.phone || errors.error ? <button className={s.disabled} disabled>Cerrar orden</button> :
            <button className={s.botonText} onClick={handleSubmit}>Cerrar orden</button>
            }
                </div>
        </div>
    </div>

    )

    
}

/* export function validate(input) {
    let errors = {};

    if (!input.name || !input.surname  || !input.country || !input.province || !input.apartament || !input.city || !input.cp || !input.street || !input.number || !input.phone ) {
        errors = 'Todos los campos son requeridos';
     }    
 
    
  
    return errors;
}
 */
export default Checkout;