import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { ToolkitPage } from './components/ToolkitPage';
import { CalculatorPage } from './components/Calculator/CalculatorPage';
import { FurtherReadingPage } from './components/Reading/FurtherReadingPage';
import { NotFoundPage } from './components/NotFoundPage';
import { AppContainer } from './styles/StyledComponents';

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/toolkit/*" element={<ToolkitPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/reading" element={<FurtherReadingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
