import { TriangleAlert } from "lucide-react";

const ResetSettingsBtn = () => {
    // clear all the local storage settings to default
    const handleReset = () => {
        localStorage.clear();
        location.reload();
    };
    return (
        <button id="reset-btn" className="btn large-btn" onClick={handleReset}>
            <TriangleAlert /> <span>Reset All Settings</span>
        </button>
    );
}

export default ResetSettingsBtn;