import React from "react";
import { BrowserRouter, Route, Routes, Link, Outlet } from "react-router-dom";
// import pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Playground from "./pages/Playground";

// import components
import Footer from "./components/Footer";
import { HomeContextProvider } from "./context/HomeContext";

/* Client-Side Routing */
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={
                        <HomeContextProvider>
                            <Home />
                        </HomeContextProvider>
                    } />
                    <Route path="auth" element={<Auth />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="profile" element={<Profile />} />

                    {/* Dummy page for experimenting with components */}
                    <Route path="playground" element={<Playground />} />

                    {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

/* Global Layout */
function Layout() {
    return (
        <>
            <main>
                <Outlet />
            </main>
            <Footer></Footer>
        </>
    );
}

/* 404 Page for Invalid URLs */
function NoMatch() {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                rowGap: "1rem",
            }}>
            <h2>404 Not found!</h2>
            <p>
                <Link to="/" style={{ color: "var(--clr-purple-primary)" }}>
                    Go to the home page
                </Link>
            </p>
        </div>
    );
}

export default App;
