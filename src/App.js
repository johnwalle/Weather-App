import WeatherApp from './Components/WeatherApp/WeatherApp';
import NotFound from './Components/WeatherApp/NotFound';


import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
            <Route exact path="/" element={<WeatherApp />} />
            <Route exact path="/not-found" element={<NotFound />} />

        </Routes>
       </Router>
    </div>
  );
}

export default App;
