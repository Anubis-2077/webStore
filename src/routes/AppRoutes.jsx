import { Routes, Route } from 'react-router-dom';
import IndexPage from '../pages/IndexPage';
import LoginPage from '../pages/LoginPage'; // Asegúrate de tener este componente

import CreateAccount from '../pages/CreateAccount';
import Profile from '../components/UserMenu/Profile';
import PasswordChange from '../components/UserMenu/PasswordChange';
import ProductPublishPage from '../pages/ProductPublishPage';
import ProductListPage from '../pages/ProductListPage';
import AdministrarCategoria from '../pages/AdministrarCategoria';
import ListCategories from '../pages/ListCategories';
import SearchPage from '../pages/SearchPage';
import OpenAnimation from '../components/OpenAnimation/OpenAnimation';
import NewProductPage from '../pages/NewProductPage';
import CartPage from '../pages/CartPage';
import DashBoardPage from '../pages/DashBoardPage';
import SuccessPage from '../pages/SuccessPage';
import DetalleEnvioPage from '../pages/DetalleEnvioPage';



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/create_account' element={<CreateAccount/>}/>
      <Route path='/user_profile' element={<Profile/>}/>
      <Route path='/change_password' element={<PasswordChange/>}/>
      <Route path='/publish_product' element={<ProductPublishPage/>}/>
      <Route path='/product_list' element={<ProductListPage/>}/>
      <Route path='/create_category' element={<AdministrarCategoria/>}/>
      <Route path='/category_list' element={<ListCategories/>}/>
      <Route path="/product/update/:id" element={<ProductPublishPage/>} />
      <Route path="/category/update/:id" element={<AdministrarCategoria/>} />
      <Route path="/search/results" element={<SearchPage/>} />
      <Route path="/openanimation" element={<OpenAnimation/>} />
      <Route path="/product/:id" element={<NewProductPage/>}/>
      <Route path='/cart/:id' element={<CartPage/>}/>
      <Route path='/dashboard' element={<DashBoardPage/>}/>
      <Route path='/success' element={<SuccessPage/>}/>
      <Route path='/detalle_envio/:id' element={<DetalleEnvioPage/>}/>
      
    </Routes>
  );
};

export default AppRoutes;