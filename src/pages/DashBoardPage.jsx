import { Container, Flex,Box } from "@chakra-ui/react";
import BoxDashboard from "../components/Dashboard/BoxDashboard";
import './styles/DashBoardPage.css'
import TableDashboard from "../components/Dashboard/TableDashboard";
import { useState, useEffect } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const DashBoardPage = () => {
  

  useEffect(() => {
    const handleResize = () => {
      setShowArrrowBack(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [showArrowBack, setShowArrrowBack] = useState(window.innerWidth <= 500);

  const navigate = useNavigate();

  const handleNavigate = ()=>{
    navigate(-1)
  }
  return (
    <>
    <div className="mainDashboardContainer">
    

    {showArrowBack && <ArrowBackIcon className="arrowIconDashboard" onClick={handleNavigate}/>}
    <div className="dashboardTitleContainer">
    <span className="dashboardTitle">Dashboard</span>
    </div>
    
      <Container maxW="100%" h="100vh" p={0} id="DashboardPageContainer">
        <Flex h="100%" direction={{ base: 'column', md: 'row' }}>
          <Flex flexGrow={2} direction="column" p={4}>
            <Flex mb={4} className="boxContainer" wrap='wrap' justifyContent="space-between">
              <BoxDashboard numberValue={50} name={'Visitas'} background={'#272953'} />
              <BoxDashboard numberValue={50} name={'Ventas'} background={'#272953'} />
              <BoxDashboard numberValue={50} name={'Clientes'} background={'#272953'} />
              <BoxDashboard numberValue={50} name={'Ganancias'} background={'#272953'} />
            </Flex>
            
          </Flex>
          <Box flexGrow={1} p={4}>
            <TableDashboard />
          </Box>
        </Flex>
      </Container>
    </div>
    
    </>
    
  );
};
export default DashBoardPage;
