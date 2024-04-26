import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import MyRoutes from './utils/routes';
import Navbar from './components/shared/navbar/Navbar';
import Footer from './components/shared/footer/Footer';
import { AppContainer, ContentContainer } from './App.styled';
import { useRef, useState } from 'react';
import { icons, infoItems, navbarTitle, theme } from './utils/data';
import { ThemeProvider } from 'styled-components';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const footerRef = useRef(null);

  const [finalOptions, setFinalOptions] = useState([
    { href: '/home', value: 'Home' },
    { href: '/about', value: 'About' },
    { href: '/contact', value: 'Contact' },
  ]);
  return (
    <div className="App">
       <ThemeProvider theme={theme}>
       <Router>
            <AppContainer className="App">
            <Navbar
                footerRef={footerRef}
                title={navbarTitle}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                options={finalOptions}
              />              
              <ContentContainer isMenuOpen={isMenuOpen}>
                <MyRoutes />
              </ContentContainer>
              <Footer ref={footerRef} icons={icons} infoItems={infoItems} />
            </AppContainer>
          </Router>
      </ThemeProvider>
      
    </div>
  );
}

export default App;
