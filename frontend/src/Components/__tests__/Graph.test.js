import{render, screen, cleanup} from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom';
import GraphSVG from '../Graph';

afterEach(()=>{
    cleanup();
})

test('Should render graph Component 1', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.getByTestId('Graph-1')
    expect(graphElement).toBeInTheDocument()
})


test('Should render graph Component 2', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.getByTestId('Graph-2')
    expect(graphElement).toBeInTheDocument()
})

test('Should render graph Component 3', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.getByTestId('Graph-3')
    expect(graphElement).toBeInTheDocument()
})

test('Should render graph Component 4', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-4')
    expect(graphElement).toBeNull()
})

test('Should render graph Component 5', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-5')
    expect(graphElement).toBeNull()
})

test('Should render graph Component 6', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-6')
    expect(graphElement).toBeNull()
})

test('Should render graph Component 7', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-7')
    expect(graphElement).toBeNull()
})

test('Should render graph Component 8', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-8')
    expect(graphElement).toBeNull()
})

test('Should render graph Component 9', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-9')
    expect(graphElement).toBeNull()
})

test('Should render graph Component 10', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-10')
    expect(graphElement).toBeNull()
})

test('Should render graph Component 11', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.getByTestId('Graph-11')
    expect(graphElement).toBeInTheDocument()
})

test('Should render graph Component 12', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.getByTestId('Graph-12')
    expect(graphElement).toBeInTheDocument()
})

test('Should render graph Component 13', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.getByTestId('Graph-13')
    expect(graphElement).toBeInTheDocument()
})

test('Should render graph Component 14', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.getByTestId('Graph-14')
    expect(graphElement).toBeInTheDocument()
})

test('Should render graph Component 16', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-16')
    expect(graphElement).toBeNull()
})
test('Should render graph Component 17', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-17')
    expect(graphElement).toBeNull()
})
test('Should render graph Component 18', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-18')
    expect(graphElement).toBeNull()
})
test('Should render graph Component 19', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-19')
    expect(graphElement).toBeNull()
})
test('Should render graph Component 20', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-20')
    expect(graphElement).toBeNull()
})

test('Should render graph Component 21', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-21')
    expect(graphElement).toBeNull()
})

test('Should render graph Component 22', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.getByTestId('Graph-22')
    expect(graphElement).toBeInTheDocument()
})

test('Should render graph Component 23', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.getByTestId('Graph-23')
    expect(graphElement).toBeInTheDocument()
})

test('Should render graph Component 24', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.getByTestId('Graph-24')
    expect(graphElement).toBeInTheDocument()
})

test('Should render graph Component 25', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.getByTestId('Graph-25')
    expect(graphElement).toBeInTheDocument()
})

test('Should render graph Component 26', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.getByTestId('Graph-26')
    expect(graphElement).toBeInTheDocument()
})

test('Should render graph Component 27', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.getByTestId('Graph-27')
    expect(graphElement).toBeInTheDocument()
})

test('Should render graph Component 28', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-28')
    expect(graphElement).toBeNull()
})

test('Should render graph Component 29', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-29')
    expect(graphElement).toBeNull()
})

test('Should render graph Component 30', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-30')
    expect(graphElement).toBeNull()
})
test('Should render graph Component 31', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-31')
    expect(graphElement).toBeNull()
})
test('Should render graph Component 32', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-32')
    expect(graphElement).toBeNull()
})
test('Should render graph Component 33', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-33')
    expect(graphElement).toBeNull()
})
test('Should render graph Component 34', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.getByTestId('Graph-34')
    expect(graphElement).toBeInTheDocument()
})
test('Should render graph Component 35', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.getByTestId('Graph-35')
    expect(graphElement).toBeInTheDocument()
})
test('Should render graph Component 36', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-36')
    expect(graphElement).toBeNull()
})
test('Should render graph Component 37', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-37')
    expect(graphElement).toBeNull()
})
test('Should render graph Component 38', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.queryByTestId('Graph-38')
    expect(graphElement).toBeNull()
})
test('Should render graph Component 39', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.getByTestId('Graph-39')
    expect(graphElement).toBeInTheDocument()
})
test('Should render graph Component 40', () => {
    render(
        <Router>
            <GraphSVG
                sentimentData={[]}
                price={[]}
                assetName={"Eosio"}
            />
        </Router>
    )
    const graphElement = screen.getByTestId('Graph-40')
    expect(graphElement).toBeInTheDocument()
})

