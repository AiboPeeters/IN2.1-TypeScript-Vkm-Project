import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";

export default function RootLayout() {
    const [user, setUser] = useState<string | null>("Admin");

    const handleLoginLogout = () => {
        if (user) {
            setUser(null);
        } else {
            setUser("Admin");
        }
    };

    return (
        <div className="layout">
            <nav className="navbar">
                <h1 className="logo">Avans VKM</h1>
                <div className="nav-links">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "nav-item active" : "nav-item"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/vkms"
                        className={({ isActive }) =>
                            isActive ? "nav-item active" : "nav-item"
                        }
                    >
                        VKM's
                    </NavLink>
                </div>

                <div className="user-info" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "1rem" }}>
                    {user ? (
                        <>
                            <span>Ingelogd als <strong>{user}</strong></span>
                            <button onClick={handleLoginLogout} className="detail-btn" style={{ padding: "0.3rem 0.6rem", fontSize: "0.9rem" }}>Logout</button>
                        </>
                    ) : (
                        <button onClick={handleLoginLogout} className="detail-btn" style={{ padding: "0.3rem 0.6rem", fontSize: "0.9rem" }}>Login</button>
                    )}
                </div>
            </nav>

            <main className="content">
                <Outlet />
            </main>

            <footer className="footer">© Aibo Peeters</footer>
        </div>
    );
}
