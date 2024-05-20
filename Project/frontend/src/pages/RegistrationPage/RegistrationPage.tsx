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
import { NewUser, UserDTO } from "../../models/User";
import UserService from "../../services/UserService/UserService";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../components/shared/toast/CustomToast";
import { DoubleInput, Input, InputGroup, Select } from "./RegistrationPage.styled";
import Role from "../../models/enums/Role";

export interface Props {
    signinIn?: boolean;
}

const RegistrationPage = () => {
    const [signInPanel, setSignInPanel] = useState(true);

    const navigate = useNavigate();
    const [userDTO, setUserDTO] = useState<UserDTO>({
        username: "",
        firstname: "",
        lastname: "",
        telephoneNumber: "",
        password: "",
        birthDate: new Date(),
        gender: "",
        height: null,
        weight: null,
        bloodType: "",
        role: Role.PATIENT,
        verified: false,
    });

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setPasswordValid] = useState(true);
    const [isWeightValid, setIsWeightValid] = useState(true);
    const [isHeightValid, setIsHeightValid] = useState(true);
    const [isFirstNameValid, setFirstNameValid] = useState(true);
    const [isLastNameValid, setLastNameValid] = useState(true);
    const [isGenderValid, setGenderValid] = useState(true);
    const [isBloodTypeValid, setBloodTypeValid] = useState(true);
    const [isBirthDateValid, setBirthDateValid] = useState(true);
    const [isTelephoneNumberValid, setTelephoneNumberValid] = useState(true);

    type ValidationRules = {
        [key in keyof UserDTO]?: (value: string) => void;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (validationRules[name as keyof UserDTO]) {
            validationRules[name as keyof UserDTO]!(value);
        }

        setUserDTO(prevState => ({
            ...prevState,
            [name]: name === "birthDate" ? new Date(value) : value,
        }));
    };

    const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!validateInputs()) {
            return;
        }
        console.log(userDTO);
        UserService.registerPatient(userDTO)
            .then(response => {
                showToast("Registracija uspešna!");
                navigate("/doctor-home-page");
            })
            .catch(error => {
                console.error("Error registering:", error);
                showToast("Došlo je do greške, probajte ponovo!");
            });


    };

    const validateInputs = () => {
        let isValid = true;

        if (!userDTO.username || !userDTO.firstname || !userDTO.lastname || !userDTO.password || !userDTO.telephoneNumber || !userDTO.birthDate || !userDTO.gender || !userDTO.height || !userDTO.weight || !userDTO.bloodType) {
            showToast("Popuni sva polja");
            isValid = false;
            setFirstNameValid(!!userDTO.firstname);
            setLastNameValid(!!userDTO.lastname);
            setIsEmailValid(!!userDTO.username);
            setPasswordValid(!!userDTO.password);
            setTelephoneNumberValid(!!userDTO.telephoneNumber);
            setIsHeightValid(!!userDTO.height);
            setIsWeightValid(!!userDTO.weight);
            setGenderValid(!!userDTO.gender);
            setBirthDateValid(!!userDTO.birthDate && !isBirthDateValid);
            setBloodTypeValid(!!userDTO.bloodType);

        } else {
            if (!isFirstNameValid) {
                showToast("Ime nije validno.");
                isValid = false;
            }
            if (!isLastNameValid) {
                showToast("Prezime nije validno");
                isValid = false;
            }
            if (!isEmailValid) {
                showToast("Email adresa nije validna.");
                isValid = false;
            }
            if (!isPasswordValid) {
                showToast("Sifra nije validna.");
                isValid = false;
            }
            if (!isTelephoneNumberValid) {
                showToast("Telefon nije validan.");
                isValid = false;
            }
            if (!isWeightValid) {
                showToast("Težina mora biti između 3 i 200.");
                isValid = false;
            }
            if (!isHeightValid) {
                showToast("Visina mora biti između 60 i 230.");
                isValid = false;
            }
        }

        return isValid;
    };

    const validationRules: ValidationRules = {
        firstname: (value: string) => setFirstNameValid(value.length <= 30),
        lastname: (value: string) => setLastNameValid(value.length <= 30),
        username: (value: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsEmailValid(emailRegex.test(value));
        },
        telephoneNumber: (value: string) => setTelephoneNumberValid(value.length <= 12),
        weight: (value: string) => {
            const weight = parseFloat(value);
            setIsWeightValid(weight >= 3 && weight <= 200);
        },
        height: (value: string) => {
            const height = parseFloat(value);
            setIsHeightValid(height >= 60 && height <= 230);
        },
        password: (value: string) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            setPasswordValid(passwordRegex.test(value));
        },
        birthDate: (value: string) => {
            const selectedDate = new Date(value);
            const today = new Date();
            setBirthDateValid(selectedDate < today);
        },
        gender: (value: string) => setGenderValid(value !== ""),
        bloodType: (value: string) => setBloodTypeValid(value !== ""),
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
                                name="firstname"
                                value={userDTO.firstname}
                                onChange={handleInputChange}
                                className={isFirstNameValid ? "" : "invalidInput"}
                            />
                            <Input
                                type="text"
                                placeholder="Prezime"
                                name="lastname"
                                value={userDTO.lastname}
                                onChange={handleInputChange}
                                className={isLastNameValid ? "" : "invalidInput"}
                            />
                            <Input
                                type="email"
                                placeholder="Email"
                                name="username"
                                value={userDTO.username}
                                onChange={handleInputChange}
                                className={isEmailValid ? "" : "invalidInput"}
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={userDTO.password}
                                onChange={handleInputChange}
                                className={isPasswordValid ? "" : "invalidInput"}
                            />
                            <InputGroup>
                                <DoubleInput
                                    type="text"
                                    placeholder="Telefon"
                                    name="telephoneNumber"
                                    value={userDTO.telephoneNumber}
                                    onChange={handleInputChange}
                                    className={isTelephoneNumberValid ? "" : "invalidInput"}
                                />
                                <DoubleInput
                                    type="date"
                                    placeholder="Datum rodjenja"
                                    name="birthDate"
                                    value={userDTO.birthDate.toISOString().split("T")[0]}
                                    onChange={handleInputChange}
                                    className={isBirthDateValid ? "" : "invalidInput"}
                                />
                            </InputGroup>
                            <InputGroup>
                                <Select
                                    name="gender"
                                    value={userDTO.gender}
                                    onChange={handleInputChange}
                                    className={isGenderValid ? "" : "invalidInput"}
                                >
                                    <option value="">Izaberite pol</option>
                                    <option value="musko">Muško</option>
                                    <option value="zensko">Žensko</option>
                                </Select>

                                <Select
                                    name="bloodType"
                                    value={userDTO.bloodType}
                                    onChange={handleInputChange}
                                    className={isBloodTypeValid ? "" : "invalidInput"}
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
                                    name="height"
                                    value={userDTO.height ?? ""}
                                    onChange={handleInputChange}
                                    className={isHeightValid ? "" : "invalidInput"}
                                />
                                <DoubleInput
                                    type="number"
                                    placeholder="Težina (kg)"
                                    name="weight"
                                    value={userDTO.weight ?? ""}
                                    onChange={handleInputChange}
                                    className={isWeightValid ? "" : "invalidInput"}
                                />
                            </InputGroup>
                            <RegButton onClick={handleRegister}>Registruj</RegButton>
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
