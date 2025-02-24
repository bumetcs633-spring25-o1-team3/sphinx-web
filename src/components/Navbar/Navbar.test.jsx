import { render, screen, fireEvent } from '@testing-library/preact';
import { Navbar } from './Navbar';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setMockUrl } from 'preact-router';

// Mock preact-router's useRouter hook
vi.mock('preact-router', () => {
    let mockUrl = '/'; // Default route

    return {
        useRouter: () => [{ url: mockUrl }], // Mock router state
        Link: (props) => <a {...props} />,
        setMockUrl: (url) => {
            mockUrl = url;
        },
    };
});

describe('Navbar Component', () => {
    const backendUrl = 'http://localhost:8085';
    const mockUser = { name: 'Test User', email: 'test@example.com' };
    const mockSignOut = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders correctly when user is logged in', () => {
        render(<Navbar user={mockUser} onSignOut={mockSignOut} backendUrl={backendUrl} />);

        // Check if brand name is present
        expect(screen.getByText('Sphinx')).toBeInTheDocument();

        // Check if navigation links are present
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Create New Flashcards')).toBeInTheDocument();
        expect(screen.getByText('Your Flashcards')).toBeInTheDocument();

        // Check if user section is rendered correctly
        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('Sign Out')).toBeInTheDocument();
    });

    it('renders correctly when user is not logged in', () => {
        render(<Navbar user={null} onSignOut={mockSignOut} backendUrl={backendUrl} />);

        // Check if brand name is present
        expect(screen.getByText('Sphinx')).toBeInTheDocument();

        // Navigation links should not be present when user is not logged in
        expect(screen.queryByText('Home')).not.toBeInTheDocument();
        expect(screen.queryByText('Create New Flashcards')).not.toBeInTheDocument();
        expect(screen.queryByText('Your Flashcards')).not.toBeInTheDocument();

        // Check if sign in button is present
        expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
    });

    it('calls onSignOut when sign out button is clicked', () => {
        render(<Navbar user={mockUser} onSignOut={mockSignOut} backendUrl={backendUrl} />);

        // Click sign out button
        fireEvent.click(screen.getByText('Sign Out'));

        // Check if onSignOut was called
        expect(mockSignOut).toHaveBeenCalledTimes(1);
    });

    it('has correct href for sign in button', () => {
        render(<Navbar user={null} onSignOut={mockSignOut} backendUrl={backendUrl} />);

        const signInButton = screen.getByText('Sign in with Google');
        expect(signInButton.getAttribute('href')).toBe(`${backendUrl}/oauth2/authorization/google`);
    });

    // Test for active links with different router URLs
    it('highlights active links based on URL', async () => {
        // Update mock for different URLs
        setMockUrl('/create-flashcards');

        const { rerender } = render(
            <Navbar user={mockUser} onSignOut={mockSignOut} backendUrl={backendUrl} />
        );

        // Create New Flashcards should be active
        const createFlashcardsLink = screen.getByText('Create New Flashcards');
        expect(createFlashcardsLink.parentElement).toHaveClass('active');
        expect(screen.getByText('Home').parentElement).not.toHaveClass('active');

        // Change URL to test another route
        setMockUrl('/flashcard-sets');

        rerender(<Navbar user={mockUser} onSignOut={mockSignOut} backendUrl={backendUrl} />);

        // // Your Flashcards should be active
        expect(screen.getByText('Your Flashcards').parentElement).toHaveClass('active');
        expect(screen.getByText('Home').parentElement).not.toHaveClass('active');
    });
});