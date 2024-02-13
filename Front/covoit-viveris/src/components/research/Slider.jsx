import React from 'react';

const Slider = ({ onToggle }) => {
    // Function to handle the change of the slider (checkbox)
    const handleChange = (e) => {
        // Call the onToggle prop with the new mode
        onToggle(e.target.checked ? 'map' : 'text');
    };

    return (
        <div className="toggle-slider">
            <label className="switch">
                <input type="checkbox" onChange={handleChange} />
                <span className="slider round"></span>
            </label>
            <style jsx>{`
                /* Styling for the slider */
                .switch {
                  position: relative;
                  display: inline-block;
                  width: 60px;
                  height: 34px;
                }

                /* Hide default HTML checkbox */
                .switch input {
                  opacity: 0;
                  width: 0;
                  height: 0;
                }

                /* The slider */
                .slider {
                  position: absolute;
                  cursor: pointer;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background-color: #ccc;
                  -webkit-transition: .4s;
                  transition: .4s;
                }

                .slider:before {
                  position: absolute;
                  content: "";
                  height: 26px;
                  width: 26px;
                  left: 4px;
                  bottom: 4px;
                  background-color: white;
                  -webkit-transition: .4s;
                  transition: .4s;
                }

                input:checked + .slider {
                  background-color: #2196F3;
                }

                input:focus + .slider {
                  box-shadow: 0 0 1px #2196F3;
                }

                input:checked + .slider:before {
                  -webkit-transform: translateX(26px);
                  -ms-transform: translateX(26px);
                  transform: translateX(26px);
                }

                /* Rounded sliders */
                .slider.round {
                  border-radius: 34px;
                }

                .slider.round:before {
                  border-radius: 50%;
                }
            `}</style>
        </div>
    );
};

export default Slider;
