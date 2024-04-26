
import CardContainer from '../components/CardContainer/CardContainer';
import   './styles/IndexPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MainFrame from '../components/MainFrame/MainFrame';
import Divider from '../components/Divider/Divider';
import Footer from '../components/Footer/Footer';
import { useState } from 'react';


const IndexPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className='index_container'>
      <MainFrame setSearchTerm={setSearchTerm} />
      <Divider/>
      <CardContainer searchTerm={searchTerm} />
      <Footer/>
    </div>
  );
};

export default IndexPage;