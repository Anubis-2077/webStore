//import { useEffect, useState } from 'react';
import './styles/ProductDetail.css';
//import axios from "axios";

const ProductDetail = () =>{
    /* const [paymentMethods, setPaymentMethods] = useState([]);

    useEffect (()=>{
        const fetchPaymentMethods = async ()=>{
            try {
                const response = await axios.get('https://api.mercadopago.com/v1/payment_methods', {
                    headers: {
                        'Authorization': `Bearer ${import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY}`
                    }
                  });
                  setPaymentMethods(response.data);
                  console.log('fetching success')
            } catch(error){
                console.log('Error fetching payment methods: ', error)

            }
        }
        fetchPaymentMethods();


    }, []); */


    return(
        <div className='productDetail'>
            
            <div className='productInfo'>
                <p>500 | Vendidos</p>
                <h2>
                    Wampa Malbec Reserva
                </h2>
                <p className="precio">
                    $5000
                </p>
                <div>
                <a href="">Medios de pago</a>
                </div>

            </div>
            <div className='image'>
                <img src="https://th.bing.com/th/id/OIP.SPvmbJBNogL5OjmqvtQozwHaEk?pid=ImgDet&w=134&h=89.33333333333333&c=7&dpr=1,5" alt=""  />
            </div>

        </div>
        
    )
}

export default ProductDetail