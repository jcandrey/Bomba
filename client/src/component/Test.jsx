


import React, {useState} from 'react'
import axios from 'axios'
import Authaxios from '../axios'

export default function Test(){

    const [state, setState]=useState({
        name:'gabi',
        description:'hola',
        price:1,
        stock:3,
        categoriesId:[2,4,5],
        files:''
    })


 const subirProducto= ()=>{
    
    return Authaxios.post('products/addProduct', state)
    .then((res)=>(console.log(res), subirImagen(res.data.id)))
    .catch((res)=> console.log(res))
}
    

const subirImagen=async (idProd)=>{
    const form= new FormData()
    for(let img=0; img<state.files.length; img++){
        form.append('image', state.files[img])
    }   
        return await Authaxios.post(`products/images/${idProd}`, form,  {headers:{'Content-type': 'multipart/form-data'}})
        .then((r)=> console.log(r))
        .catch((r)=> console.log(r))    

}

    return(
        <>
            <input type="file" name='image' multiple onChange={(e)=> setState({...state, files:e.target.files})}></input>
            <button onClick={subirProducto}>subir</button>
        </>
    )
}