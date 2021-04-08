import React from 'react'


export default function Summary ({data}) {

    var subTotal= data.reduce && data.reduce(
        (acc, element)=> acc+=element.line.price
        , 0 )

    //ejemplo con map data && data.map(i=> subtotal=subtotal+i.line.price)


    return (
        <div>
            <p> Subtotal:$ {subTotal && subTotal} </p>
            <p> Envío: GRATIS </p>
            <p> TOTAL: $ {subTotal && (subTotal && subTotal).toFixed(2)} </p>
        </div>
    )
}

