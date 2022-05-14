import './App.module.css';
import Routing from './pages/Routing';

import CombinedProvider from './store/CombinedProvider';

function App() {
    return (
        <CombinedProvider>
            <Routing/>
        </CombinedProvider>
    );
}

export default App;
