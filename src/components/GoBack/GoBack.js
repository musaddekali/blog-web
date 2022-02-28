import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa"
import './GoBack.css';

const GoBack = () => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(-1)} className="go-back">
            <FaChevronLeft /> Back to page
        </div>
    )
}

export default GoBack;
