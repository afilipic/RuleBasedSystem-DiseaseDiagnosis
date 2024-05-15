import React, { useState } from "react";
import {
    Anchor,
    Button,
    Container,
    Form,
    Overlay,
    OverlayContainer,
    Paragraph,
    RegButton,
    RightOverlayPanel,
    SignInContainer,
    Title,
    Wrapper,
} from "../LoginPage/LoginPage.styled";
import { NewUser } from "../../models/User";
import UserService from "../../services/UserService/UserService";
import useUser from "../../utils/UserContext/useUser";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../components/shared/toast/CustomToast";
import { getNext } from "../../utils/functions/getNextPage";
import { DoubleInput, Input, InputGroup, Select } from "./RegistrationPage.styled";

export interface Props {
    signinIn?: boolean;
}

const RegistrationPage = () => {
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
            .then((response: any) => {
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
                            <Title>Registracija</Title>
                            <Input
                                type="text"
                                placeholder="Ime"
                                name="ime"
                                value={loginUser.password}
                                onChange={handleLoginInputChange}
                            />
                            <Input
                                type="text"
                                placeholder="Prezime"
                                name="prezime"
                                value={loginUser.password}
                                onChange={handleLoginInputChange}
                            />
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
                            <InputGroup>
                            <DoubleInput
                                type="text"
                                placeholder="Telefon"
                                name="telefon"
                                value={loginUser.password}
                                onChange={handleLoginInputChange}
                            />
                            <DoubleInput
                                type="date"
                                placeholder="Datum rodjenja"
                                name="datRodj"
                                value={loginUser.username}
                                onChange={handleLoginInputChange}
                            />
                            </InputGroup>
                            <InputGroup>
                                <Select
                                    name="pol"
                                    value={loginUser.username}
                                >
                                    <option value="">Izaberite pol</option>
                                    <option value="musko">Muško</option>
                                    <option value="zensko">Žensko</option>
                                </Select>

                                <Select
                                    name="krvnaGrupa"
                                    value={loginUser.username}
                                    
                                >
                                    <option value="">Izaberite krvnu grupu</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </Select>
                            </InputGroup>
                            <InputGroup>
                                <DoubleInput
                                    type="number"
                                    placeholder="Visina (cm)"
                                    name="visina"
                                    value={loginUser.username}
                                    onChange={handleLoginInputChange}
                                />
                                <DoubleInput
                                    type="number"
                                    placeholder="Težina (kg)"
                                    name="tezina"
                                    value={loginUser.username}
                                    onChange={handleLoginInputChange}
                                />
                            </InputGroup>                            
                            <RegButton onClick={handleSignIn}>Registruj</RegButton>
                        </Form>
                    </SignInContainer>

                    <OverlayContainer signinIn={signInPanel}>
                        <Overlay signinIn={signInPanel}>
                            <RightOverlayPanel signinIn={signInPanel}>
                                <Title>Registrujte pacijenta</Title>
                                <Paragraph>
                                    Unesite sve neophodne podatke!
                                </Paragraph>
                            </RightOverlayPanel>
                        </Overlay>
                    </OverlayContainer>
                </Container>
            </Wrapper>
        </div>

    );
};

export default RegistrationPage;
