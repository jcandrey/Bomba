const server = require('express').Router();
const Sequelize = require('sequelize')
const { Cart, Payment, Checkout, Line_Order, Product} = require('../db.js');
const {verificarToken} = require('../middleware/authentication.js');
const jwt =  require ('jsonwebtoken')
var nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport');
const PaymentController = require("../controllers/PaymentController");
 //importamos el controller

const PaymentService = require("../services/PaymentService"); 
//importamos el service

const PaymentInstance = new PaymentController(new PaymentService()); 
// Permitimos que el controller pueda usar el service



server.put("/:userId", (req,res)=>{

    let datos;
    const {comentario, phone, street, number, apartament, city, cp, province, country, name, surname, articles, payment_id} = req.body;
    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'ecommerce-ft06-g07', (err, decoded)=>{
    if(err){
        res.status(401).send(err)
    } 
    datos = decoded
    }) 
    let checkoutId;
    let cartId;
    let p1;
    Cart.findOne({where:{userId: req.params.userId, state: "created"}})
    .then((ans)=>{
        cartId = ans.id
        return Payment.findOne({where:{payment_id: payment_id}})
    }) 
    .then((ans)=>{
        console.log('0',ans.id)
       return Checkout.create({ phone, street , number ,  apartament, city, cp, province, country, comentario, paymentId: ans.id})
    }) 
    .then(ans => {
        console.log('1')
        checkoutId = ans.id
        return Payment.findOne({where:{payment_id: payment_id}})
    })
    .then((ans)=>{
        console.log('2')
        if(ans.status === 'approved')  return Cart.update({state: "completed", checkoutId},{where: {id: cartId}} )
        if(ans.status === 'pending') return Cart.update({state: "pending", checkoutId},{where: {id: cartId}} )
    })
    .then(ans =>{
        console.log('3')
        return Cart.findAll({where:{ state:'completed', checkoutId}, 
            include: {model: Product, through: Line_Order}
        })
    })         
    .then(ans=>{ 
        console.log('4')
    return p1 = ans[0].products.map(async prod=>{
                return await Product.update({stock: prod.stock - prod.Line_Order.quantity}, {where:{id: prod.id }})
        })
    })
    .then(ans=> {
        console.log('5')
        return Promise.all(p1)
    })     
    .then(ans => {    
        console.log('6')
        return Cart.create({state:"created", userId: datos.user.id})
    }) 
    .then(()=>{
        
        let options = {
            auth: {
                api_key: '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'
            }
        }
        let total= 0;
        htmlContent = `<h2>Su pedido ya est?? en camino!</h2>
                <div>
                  <p>Su orden ser?? enviada a ${street} ${number} ${apartament}, ${city}, ${province}, ${country}. C??digo postal: ${cp}. Gracias por su compra!</p>
                  <p>Nombre completo: ${name} ${surname}.</p> 
                  <h4>Pedido #${checkoutId}: </h4>
                  <ul>${articles.map(a => 
                    `<li>Producto: ${a.product.name}, precio por unidad: $${a.product.price}, cantidad: ${a.line.quantity}.</li>
                    <p hidden>Subtotal: $${total += a.product.price * a.line.quantity}</p>`
                  )}</ul>
                  <h4>Total: $${total}</h4>
                </div>
              `; 

        let client = nodemailer.createTransport(sgTransport(options));

        let email = {
            from: 'bomba.ecommerce@gmail.com',
            to: "nariboyoro2@gmail.com",
            subject: 'Su orden est?? en camino!',
            html: htmlContent
        };
        client.sendMail(email, function(err, info) {
            if (err){
                console.log(err);
            }
            else {
                console.log('Mensaje enviado: ' + info);
                res.send("checkout realizado")
            }
        });
        
    })
    
    .catch(err=> res.status(500).send(err))
})

server.post("/payment/new", (req, res) => 
  PaymentInstance.getMercadoPagoLink(req, res) 
);

server.post("/webhook", (req, res) => PaymentInstance.webhook(req, res));

server.post("/success", (req, res) => {

    console.log(req.body)
    Payment.create( req.body)
    .then(ans=>{
        console.log(ans)
        res.status(200).send(ans)
    })
    .catch(err => res.status(500).send(err))

});

module.exports=server




