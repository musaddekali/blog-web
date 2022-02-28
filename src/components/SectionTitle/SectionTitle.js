import './SectionTitle.css';

const SectionTitle = ({ children }) => {
    return (
        <div className="section-title">
            <h2>
                <span>{children}</span>
            </h2>
        </div>
    )
}

export default SectionTitle;
