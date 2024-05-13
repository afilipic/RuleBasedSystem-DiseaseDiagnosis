import React, { useState } from "react";
import {
  Anchor,
  Button,
  Container,
  Form,
  Input,
  Overlay,
  OverlayContainer,
  Paragraph,
  RightOverlayPanel,
  SignInContainer,
  Title,
  Wrapper,
} from "./LoginPage.styled";
import { NewUser } from "../../models/User";
import UserService from "../../services/UserService/UserService";
import useUser from "../../utils/UserContext/useUser";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../components/shared/toast/CustomToast";
import { getNext } from "../../utils/functions/getNextPage";

export interface Props {
  signinIn?: boolean;
}

const LoginPage = () => {
  const [signInPanel, setSignInPanel] = useState(true);

  const [loginUser, setLoginUser] = useState({
    username: "",
    password: "",
  });

  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    UserService.login(loginUser)
      .then((response : any) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        showToast("Login Successful!");
        navigate(getNext(response.data.role))

      })
      .catch((error: any) => {
        console.error("Error logging in:", error);
        showToast(error.response.data);
      });
  };
  

  return (
    <div>
    <Wrapper>
      <Container>
        <SignInContainer signinIn={signInPanel}>
          <Form>
            <Title>Sign in</Title>
            <Input
              type="email"
              placeholder="Email"
              name="username"
              value={loginUser.username}
              onChange={handleLoginInputChange}
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={loginUser.password}
              onChange={handleLoginInputChange}
            />
            <Anchor href="#">Forgot your password?</Anchor>
            <Button onClick={handleSignIn}>Sign In</Button>
          </Form>
        </SignInContainer>

        <OverlayContainer signinIn={signInPanel}>
          <Overlay signinIn={signInPanel}>
            <RightOverlayPanel signinIn={signInPanel}>
              <Title>Hello, Friend!</Title>
              <Paragraph>
                Enter Your personal details and start journey with us
              </Paragraph>
            </RightOverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>
    </Wrapper>
    </div>

  );
};

export default LoginPage;
