import './App.css';
import TestBox from './components/TestBox/TestBox';

function App() {
    return (
        <TestBox
            testName="Test"
            description="Simple description for the test"
        />
        // <div className="App">
        //     <header className="App-header">
        //         <img src={logo} className="App-logo" alt="logo" />
        //         <p>
        //             Edit <code>src/App.js</code> and save to reload.
        //         </p>
        //         <a
        //             className="App-link"
        //             href="https://reactjs.org"
        //             target="_blank"
        //             rel="noopener noreferrer">
        //             Learn React
        //         </a>
        //     </header>
        // </div>
    );
}

export default App;
