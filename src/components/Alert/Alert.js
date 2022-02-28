import { useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import { useGlobalContext } from '../../context/context';
import './alert.css';

const Alert = () => {
    const { alert, handleAlert } = useGlobalContext();
    const { type, msg, alertIcon } = alert;

    const handleClose = () => {
        handleAlert();
    }

     useEffect(() => {
        const timeOut = setTimeout(() => {
            handleAlert();
        }, 3000);
        return () => clearTimeout(timeOut);
    }, [alert, handleAlert]);

    return (
        <div className="alert-container">
            <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
                {alertIcon}
                {msg}
                <button
                    onClick={handleClose}
                    type="button"
                    className="btn alert-close"
                >
                    <GrClose />
                </button>
            </div>
        </div>
    )
}

export default Alert;