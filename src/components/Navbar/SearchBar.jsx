import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types'
import { useState, useEffect } from "react";





const SearchBar = ({ setSearchTerm }) => {
    // Usa solo un estado local para manejar la entrada de búsqueda.
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    
    
    const handleSearchChange = (event) => {
        setLocalSearchTerm(event.target.value);
        if (event.target.value !== '') {
            setIsExpanded(true); 
        }
    };

    const handleMouseEnter = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        if (localSearchTerm === '') {
            setIsExpanded(false); // Contrae la barra solo si no hay texto.
        }
    };
    
    useEffect(() => {
      setSearchTerm(localSearchTerm);
      console.log(localSearchTerm)
    }, [localSearchTerm, setSearchTerm]);
  
    return (
        <div className='searchContainer'
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}>
            

            <input 
            type="search"
            placeholder="Buscar producto" 
            value={localSearchTerm}
            onChange={handleSearchChange}
            className={`searchInput ${isExpanded ? 'expanded' : ''}`}
            
            />
            <SearchIcon  
            style={{color: '#FFFFFF'}}
            id="SearchIcon"
            className='searchIconNav'
             />
            

        </div>
    );
  };
  
  export default SearchBar;

  SearchBar.propTypes={
    setSearchTerm: PropTypes.func.isRequired
  }