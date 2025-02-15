import React from 'react';
import './Navbar.css';
import { Link } from 'preact-router';

export const Navbar = ({ user, onSignOut, backendUrl }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-content">
                    <div className="navbar-brand">
                        <span className="brand-text">Sphinx</span>
                    </div>

                    <div className="nav-links">
                        <Link href="/" className="nav-link">
                            <span>Home</span>
                        </Link>

                        <Link href="/quizzes" className="nav-link">
                            <span>Flashcards</span>
                        </Link>

                        <div className="auth-section">
                            {user ? (
                                <div className="user-section">
                                    <span className="user-name">{user.name}</span>
                                    <button onClick={onSignOut} className="sign-out-button">
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            ) : (
                                <a href={`${backendUrl}/oauth2/authorization/google`}
                                    className="sign-in-button">
                                    Sign in with Google
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};