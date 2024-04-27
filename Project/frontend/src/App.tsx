import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import MyRoutes from './utils/routes';
import Navbar from './components/shared/navbar/Navbar';
import Footer from './components/shared/footer/Footer';
import { AppContainer, ContentContainer } from './App.styled';
import { useRef, useState } from 'react';
import { icons, infoItems, menuOptions, navbarTitle, theme } from './utils/data';
import { ThemeProvider } from 'styled-components';
import { LoginUser } from './models/User';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [user, setUser] = useState<LoginUser | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const footerRef = useRef(null);

  const determineRole = (user: LoginUser | null): string => {
    if (!user) return "guest";
    return user.role;
  };

  const role = determineRole(user);
  const filterMenuOptions = (userRole: string) => {
    switch (userRole) {
      case "USER":
        return menuOptions.filter((option) =>
          option.role === "user" || option.role === "logged" || option.role === "all"
        );
      case "ADMIN":
        return menuOptions.filter((option) =>
          option.role === "admin" || option.role === "logged" || option.role === "all"
        );
      case "SUPERADMIN":
        return menuOptions.filter((option) =>
          option.role === "superadmin" || option.role === "logged" || option.role === "admin" || option.role === "all"
        );
      default:
        return menuOptions.filter((option) =>
          option.role === "guest" || option.role === "all"
        );
    }
  };

  const finalOptions = filterMenuOptions(role)
  
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
