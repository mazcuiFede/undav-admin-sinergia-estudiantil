import './App.css';
import "fontsource-roboto";
import RouterConfig from './navigation/routerConfig';
import { BrowserRouter } from 'react-router-dom';
import "typeface-roboto";

function App() {
  return (
    <div>
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </div>
  );
}

export default App;
