import Navbar from "../Navbar/Navbar";
import './styles/ProductPage.css'
import ProductDetail from "./ProductDetail";
import CartInfo from "../Cart/CartInfo";




const ProductPage = () =>{
    return(
        <>
        <Navbar/>
        <div className="productContainer">
            

            <div className="infoContainer">
                <div className="productDetailContainer">
                    <ProductDetail/>
                </div>
                <div className="cartDetailContainer"></div>
            </div>
            <div className="cartInfoContainer">
                
            </div>
        </div>
        </>
        
    )
}
export default ProductPage