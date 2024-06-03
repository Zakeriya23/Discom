import { useContext, useState } from "react";
import axios from 'axios';
import { UserContext } from "./UserContext.jsx";

export default function AuthPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
    const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

    async function onSubmit(ev) {
        ev.preventDefault();
        try {
            const url = isLoginOrRegister === 'register' ? '/register' : '/login';
            const { data } = await axios.post(url, { username, password }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            setLoggedInUsername(username);
            setId(data.id);
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <div className="background">
            <form onSubmit={onSubmit} className="form-card">
                <div className="form-title">Welcome 👋</div>
                <div className="form-subtitle">
                    {isLoginOrRegister === 'register' ? 'Create an account to get started' : 'Set a username to get started'}
                </div>

                <div className="auth">
                    <div className="auth-label">Username</div>
                    <input
                        className="auth-input"
                        name="username"
                        value={username}
                        onChange={ev => setUsername(ev.target.value)}
                    />
                </div>

                <div className="auth">
                    <div className="auth-label">Password</div>
                    <input
                        className="auth-input"
                        name="password"
                        type="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                </div>

                <button className="auth-button" type="submit">
                    {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
                </button>

                <div className="">
                    {isLoginOrRegister === 'register' && (
                        <div>
                            Already a member?
                            <button
                                className="auth-button"
                                type="button"
                                onClick={() => setIsLoginOrRegister('login')}
                            >
                                Login here
                            </button>
                        </div>
                    )}
                    {isLoginOrRegister === 'login' && (
                        <div>
                            Don't have an account?
                            <button
                                className="auth-button"
                                type="button"
                                onClick={() => setIsLoginOrRegister('register')}
                            >
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
