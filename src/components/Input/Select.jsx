import PropTypes from 'prop-types'

const Select = ({ label, className = '',options, ...props }) =>{

    const classes = `form-control ${className}`;

    return (
        <div className="form-group row">
            {label && <label className="col-sm-2 col-form-label">{label}</label>}
            <div className="col-sm-10">
            <select className={classes} {...props}>
                <option value="" disabled className='disabledOption'>Seleccione una opción</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            </div>
        </div>
    )
}

Select.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    props: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    
}

export default Select
