import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import LogoApp from '../assets/logo-academy.png';
import BgAcademy from '../assets/background-academy.png';

const Login = ({ onLoginSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLoginSuccess();
    };

    return (
        <div className="login-page" style={{ backgroundImage: `url(${BgAcademy})` }}>    
           <div className="login-overlay"></div>
            <div className="login-card">
                <h2 className="login-welcome">Welcome</h2>
                <div className="login-logo-wrapper">
                    <div className="login-logo">
                        <img src={LogoApp} alt="Logo" className="logo-img" />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="login-form-group">
                        <label>USERNAME</label>
                        <input 
                            type="text" 
                            name="username"
                            className="login-input"
                            placeholder="Username" 
                            value={formData.username}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="login-form-group">
                        <label>KATA SANDI</label>
                        <div className="password-wrapper">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password"
                                className="login-input"
                                placeholder="Kata Sandi" 
                                value={formData.password}
                                onChange={handleChange}
                                required 
                            />
                            <button 
                                type="button" 
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="login-submit-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;