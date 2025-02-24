import './Dialog.css';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="dialog-overlay" onClick={onClose}>
            <div className="dialog-content" onClick={e => e.stopPropagation()}>
                <h2 className="dialog-title">{title}</h2>
                <p className="dialog-message">{message}</p>
                <div className="dialog-buttons">
                    <button className="dialog-button cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="dialog-button confirm" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;