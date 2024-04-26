import Navbar from "../Navbar/Navbar";
import PropTypes from 'prop-types'

const MainFrame = ({ setSearchTerm }) => {
  
  return (
    <div className="mainFrameContainer">
      <Navbar setSearchTerm={setSearchTerm} />
      <div className="contentContainer">
        <h2 className="titulo">Que cada vino sea un Ritual.</h2>
        <img src="/images/copa.jpg" alt="" className="mainImgContainer" />
        <h1 className="logo">Ritual del Vino</h1>
      </div>
    </div>
  );
};
export default MainFrame;

MainFrame.propTypes={
  setSearchTerm: PropTypes.func.isRequired
}
