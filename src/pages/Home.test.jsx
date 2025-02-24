import { render, screen } from '@testing-library/preact'
import { AuthContext } from '../auth/AuthContext'
import Home from './Home'
import { describe, it, expect, vi } from 'vitest'

describe('Home Component', () => {
    it('renders greeting with user name', () => {
        const mockUser = { name: 'John' }

        render(
            <AuthContext.Provider value={{ user: mockUser }}>
                <Home />
            </AuthContext.Provider>
        )

        // Check if greeting contains the first name
        expect(screen.getByText(/Good (morning|afternoon|evening), John/i)).toBeInTheDocument()
    })

    it('does not render anything when user is not authenticated', () => {
        render(
            <AuthContext.Provider value={{ user: null }}>
                <Home />
            </AuthContext.Provider>
        )

        // The component should not render anything
        expect(document.body.textContent).toBe('')
    })
})