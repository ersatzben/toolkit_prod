import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { ToolkitPage } from './components/ToolkitPage';
import { ROICalculator } from './components/ROICalculator';
import { FurtherReading } from './components/FurtherReading';
import { Header } from './components/Header';
import { TopBanner } from './components/TopBanner';
import { AppContainer } from './styles/StyledComponents';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackToSplash = () => {
    navigate('/');
  };

  const showHeader = location.pathname !== '/';

  return (
    <AppContainer>
      <TopBanner />
      {showHeader && (
        <Header 
          title={
            location.pathname === '/toolkit' ? "UK R&D Policy Toolkit – Learn about R&D Policy Tools" :
            location.pathname === '/calculator' ? "UK R&D Policy Toolkit – Calculate Return on Investment" :
            location.pathname === '/reading' ? "UK R&D Policy Toolkit – Guide to Evaluating R&D Returns" :
            "UK R&D Policy Toolkit"
          }
          onBackToSplash={handleBackToSplash}
        />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/toolkit" element={<ToolkitPage />} />
        <Route path="/calculator" element={<ROICalculator />} />
        <Route path="/reading" element={<FurtherReading />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
