import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dropdowns.css'

function Dropdowns({ options, listItemWidth, inputValue, setInputValue }) {
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate(); // Hook to navigate

    const toggleOptions = () => {
        setShowOptions((prevShowOptions) => !prevShowOptions);
    };

    const selectOption = (option) => {
        setInputValue(option);
        setShowOptions(false);

        navigate(`/${option.toLowerCase()}`);
    };

    return (
        <div className="combobox">
            <div className="combobox-input" onClick={toggleOptions}>
                <input type="text" value={inputValue} readOnly style={{ width: listItemWidth }} />
                <span className={`arrow ${showOptions ? 'up' : 'down'}`}></span>
            </div>
            {showOptions && (
                <ul className="combobox-options">
                    {options.map((option, index) => (
                        <li key={index} onClick={() => selectOption(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdowns;
