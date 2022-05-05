import{render, screen, cleanup} from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom';
import Footer from '../Footer'

afterEach(()=>{
    cleanup();
})

test('Should the render Footer Component 1', () => {
    render(
        <Router>
            <Footer/>
        </Router>
    )
    const footerElement = screen.getByTestId('Footer-1')
    expect(footerElement).toBeInTheDocument()
})

test('Should the render Footer Component 2', () => {
    render(
        <Router>
            <Footer/>
        </Router>
    )
    const footerElement = screen.getByTestId('Footer-2')
    expect(footerElement).toBeInTheDocument()
})

test('Should the render Footer Component 3', () => {
    render(
        <Router>
            <Footer/>
        </Router>
    )
    const footerElement = screen.getByTestId('Footer-3')
    expect(footerElement).toBeInTheDocument()
})

test('Should the render Footer Component 4', () => {
    render(
        <Router>
            <Footer/>
        </Router>
    )
    const footerElement = screen.getByTestId('Footer-4')
    expect(footerElement).toBeInTheDocument()
})

test('Should the render Footer Component 5', () => {
    render(
        <Router>
            <Footer/>
        </Router>
    )
    const footerElement = screen.getByTestId('Footer-5')
    expect(footerElement).toBeInTheDocument()
})