import PropTypes from 'prop-types'
import React from 'react';


const Input = React.forwardRef(({ label, type, className = '', ...props }, ref) => {
    const classes = `form-control ${className}`;
    return (
        <div className="form-group row">
            {label && <label className="col-sm-2 col-form-label">{label}</label>}
            <div className="col-sm-10">
                <input ref={ref} type={type} className={classes} {...props} />
            </div>
        </div>
    );
});

// Asignación del displayName
Input.displayName = 'Input';

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    
};

export default Input;

