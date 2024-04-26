import PropTypes from 'prop-types'

const TextArea = ({ label, className = '', ...props }) =>{

    const classes = `form-control ${className}`;

    return (
        <div className="form-group row">
            {label && <label className="col-sm-2 col-form-label">{label}</label>}
            <div className="col-sm-10">
                <textarea className={classes} {...props} />
            </div>
        </div>
    )
}

TextArea.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    props: PropTypes.string
    
}

export default TextArea
