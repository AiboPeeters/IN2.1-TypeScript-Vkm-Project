import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
    return (
        <div className="layout">
            <nav className="navbar">
                <h1 className="logo">Avans VKM</h1>
                <div className="nav-links">
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/vkms"
                        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
                    >
                        VKM's
                    </NavLink>
                </div>
            </nav>

            <main className="content">
                <Outlet />
            </main>

            <footer className="footer">© Aibo Peeters</footer>
        </div>
    );
}
