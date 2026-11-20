import { useState, useEffect } from "react";
import axios from "axios";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useNavigate
} from "react-router-dom";
import "./App.css";

const API = "http://localhost:5000/api";

function Auth() {
    const [mode, setMode] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const endpoint = mode === "register"
                ? `${API}/auth/register`
                : `${API}/auth/login`;

            const body = mode === "register"
                ? { name, email, password }
                : { email, password };

            const response = await axios.post(endpoint, body);

            setMessage(response.data.message);

            if (mode === "login") {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            }

        } catch (error) {
            setMessage(error.response?.data?.message || "Request failed");
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>FullStack App</h1>
                <h2>{mode === "login" ? "Login" : "Register"}</h2>

                <form onSubmit={handleSubmit}>
                    {mode === "register" && (
                        <input
                            placeholder="Full Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">
                        {mode === "login" ? "Login" : "Register"}
                    </button>
                </form>

                <p>{message}</p>

                <button
                    className="switch-btn"
                    onClick={() => {
                        setMode(mode === "login" ? "register" : "login");
                        setMessage("");
                    }}
                >
                    {mode === "login"
                        ? "Create an account"
                        : "Already have an account? Login"}
                </button>
            </div>
        </div>
    );
}

function Dashboard() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("Loading dashboard...");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(`${API}/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(response.data.user);
                setMessage(response.data.message);

            } catch (error) {
                localStorage.removeItem("token");
                navigate("/");
            }
        }

        fetchDashboard();
    }, [navigate]);

    function logout() {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className="dashboard">
            <nav>
                <h2>My Dashboard</h2>
                <button onClick={logout}>Logout</button>
            </nav>

            <div className="welcome-card">
                <h1>Dashboard</h1>
                <p>{message}</p>

                {user && (
                    <>
                        <h2>Welcome, {user.name}!</h2>
                        <p>User ID: {user.id}</p>
                        <p>Email: {user.email}</p>
                    </>
                )}
            </div>
        </div>
    );
}

function ProtectedRoute({ children }) {
    return localStorage.getItem("token")
        ? children
        : <Navigate to="/" />;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;