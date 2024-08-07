
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({ type, onClick, icon, iconClass, label, className, dataDismiss }) => {
    return (
        <button
            type={type}
            className={`btn ${className}`}
            onClick={onClick}
            data-dismiss={dataDismiss}
        >
            {icon && <FontAwesomeIcon icon={icon} className={iconClass} />}
            <span>{label}</span>
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.object,
    iconClass: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    dataDismiss: PropTypes.string,
};



export default Button;
