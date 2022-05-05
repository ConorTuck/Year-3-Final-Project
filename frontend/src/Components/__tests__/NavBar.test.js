import{render, screen, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter as Router } from 'react-router-dom';
import Navbar from '../NavBar'

afterEach(()=>{
    cleanup();
})

test('Should render Navbar Component 1', () => {
    render(
        <Router>
            <Navbar/>
        </Router>
    )
    const navbarElement = screen.getByTestId('navbar-1')
    expect(navbarElement).toBeInTheDocument()
   expect(navbarElement).toHaveTextContent('Sentiment Tool')
})

test('Should render Navbar Component 2', () => {
    render(
        <Router>
            <Navbar/>
        </Router>
    )
    const navbarElement = screen.getByTestId('navbar-2')
    expect(navbarElement).toBeInTheDocument()
})

test('Should render Navbar Component 3 ', () => {
    render(
        <Router>
            <Navbar/>
        </Router>
    )
    const navbarElement = screen.getByTestId('navbar-3')
    expect(navbarElement).toBeInTheDocument()
})

test('Should render Navbar Component 4', () => {
    render(
        <Router>
            <Navbar/>
        </Router>
    )
    const navbarElement = screen.getByTestId('navbar-4')
    expect(navbarElement).toBeInTheDocument()
})

test('Should render Navbar Component 5', () => {
    render(
        <Router>
            <Navbar/>
        </Router>
    )
    const navbarElement = screen.getByTestId('navbar-5')
    expect(navbarElement).toBeInTheDocument()
})

test('Should render Navbar Component 6', () => {
    render(
        <Router>
            <Navbar/>
        </Router>
    )
    const navbarElement = screen.getByTestId('navbar-6')
    expect(navbarElement).toBeInTheDocument()
})

test('Should not render Navbar Component 7', () => {
    render(
        <Router>
            <Navbar/>
        </Router>
    )
    const navbarElement = screen.queryByTestId('navbar-7')
    expect(navbarElement).toBeNull();
})

test('Should not render Navbar Component 8', () => {
    render(
        <Router>
            <Navbar/>
        </Router>
    )
    const navbarElement = screen.queryByTestId('navbar-8')
    expect(navbarElement).toBeNull();
})

test('Should not render Navbar Component  9', () => {
    render(
        <Router>
            <Navbar/>
        </Router>
    )
    const navbarElement = screen.queryByTestId('navbar-9')
    expect(navbarElement).toBeNull();
})

test('Should not render Navbar Component 10', () => {
    render(
        <Router>
            <Navbar/>
        </Router>
    )
    const navbarElement = screen.queryByTestId('navbar-10')
    expect(navbarElement).toBeNull();
})

test('Should not render Navbar Component 11', () => {
    render(
        <Router>
            <Navbar/>
        </Router>
    )
    const navbarElement = screen.queryByTestId('navbar-11')
    expect(navbarElement).toBeNull();
})