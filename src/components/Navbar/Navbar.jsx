import React from "react";
import "./Navbar.css";
import { Link, useRouter } from "preact-router";
import sphinxLogo from "../../assets/sphinxLogoSvg.svg";

export const Navbar = ({ user, onSignOut, backendUrl }) => {
	const [router] = useRouter();
	const isLinkActive = (patterns) => {
		return patterns.some((pattern) => new RegExp(pattern).test(router.url));
	};

	return (
		<nav className="navbar">
			<div className="navbar-container">
				<div className="navbar-content">
					<div className="navbar-brand">
						<img src={sphinxLogo} alt="Sphinx Logo" className="brand-logo" />
						<span className="brand-text">Sphinx</span>
					</div>

					<div className="nav-links">
						{user ? (
							<>
								<Link
									href="/"
									className={`nav-link ${
										isLinkActive(["^/$"]) ? "active" : ""
									}`}
								>
									<span>Home</span>
								</Link>

								<Link
									href="/create-flashcards"
									className={`nav-link ${
										isLinkActive([
											"/create-flashcards",
											"^/create-flashcards/[^/]+$",
										])
											? "active"
											: ""
									}`}
								>
									<span>Create New Flashcards</span>
								</Link>

								<Link
									href="/flashcard-sets"
									className={`nav-link ${
										isLinkActive([
											"/flashcard-sets",
											"^/flashcard-viewer/[^/]+$",
											"^/quiz/[^/]+$",
											"^/speed-challenge/[^/]+$",
										])
											? "active"
											: ""
									}`}
								>
									<span>Your Flashcards</span>
								</Link>
							</>
						) : null}

						<div className="auth-section">
							{user ? (
								<div className="user-section">
									<span className="user-name">{user.name}</span>
									<button onClick={onSignOut} className="sign-out-button">
										<span>Sign Out</span>
									</button>
								</div>
							) : (
								<a
									href={`${backendUrl}/oauth2/authorization/google`}
									className="sign-in-button"
								>
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
