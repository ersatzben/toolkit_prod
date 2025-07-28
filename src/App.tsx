import { Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { ToolkitPage } from './components/ToolkitPage';
import { CalculatorPage } from './components/Calculator/CalculatorPage';
import { FurtherReadingPage } from './components/Reading/FurtherReadingPage';
import { AppContainer } from './styles/StyledComponents';

function App() {
  const location = useLocation();

  const showHeader = location.pathname !== '/';

  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/toolkit/*" element={<ToolkitPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/reading" element={<FurtherReadingPage />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </AppContainer>
  );
}

export default App;
