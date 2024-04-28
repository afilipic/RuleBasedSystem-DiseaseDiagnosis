import React, { useState } from 'react';
import {
    HomePageContainer,
    LeftSide,
    Title,
    SmallText,
    RightSide,
    CustomButton,
    StyledFontAwesomeIcon,
    InfoCardContainer,
    InfoCard,
    CircleIcon,
    SmallText2,
    Title2,
    Title3,
    StyledSmartHomeImage,
    StyledFontAwesomeIconInfo,
    StyledTitleWithLines,
    ImageContainer,
    OverlayText,
    Image2,
    Container,
    Title4,
    Description,
    InfoCard2,
    InfoCard3,
    SmallText3,
    TitleB,
    TitleW,
    StyledFontAwesomeIconInfoWhite,
} from './HomePage.styled';
import { faArrowDown, faArrowUp, faUserMd, faCalendarPlus, faHeartbeat } from "@fortawesome/free-solid-svg-icons";


const HomePage = () => {
    const [showMore, setShowMore] = useState(false);


    const handleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <>
        <HomePageContainer>
            {/* Left Side */}
            <LeftSide>
                <Title>Najbolja medicinska i zdravstvena usluga</Title>
                <SmallText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </SmallText>
                
                {showMore && (
                    <SmallText>
                        Additional text goes here. You can add more details about making homes smarter.
                    </SmallText>
                )}
                
                <CustomButton onClick={handleShowMore}>
                    {showMore ? 'Prikaži manje' : 'Prikaži više'}
                    <StyledFontAwesomeIcon icon={showMore ? faArrowUp : faArrowDown} />
                </CustomButton>
            </LeftSide>
            
            {/* Right Side */}
            <RightSide>
                <StyledSmartHomeImage src="/pic2.png" alt="Doctor" />
            </RightSide>
            </HomePageContainer>
            
            <>
            
                <Title3>Naše zdravstvene usluge</Title3>
                <StyledTitleWithLines>MedicLab</StyledTitleWithLines>
                
            <InfoCardContainer>
                <InfoCard>
                    <CircleIcon>
                            <StyledFontAwesomeIconInfo icon={faUserMd} />         
                    </CircleIcon>
                    <Title2>Raspored doktora</Title2>
                    <SmallText2>Some description text here.</SmallText2>
                </InfoCard>

                {/* Card 2 */}
                <InfoCard2>
                    <CircleIcon>
                            <StyledFontAwesomeIconInfo icon={faHeartbeat} />
                    </CircleIcon>
                    <TitleB>Hitan poziv</TitleB>
                    <SmallText3>Some description text here.</SmallText3>
                </InfoCard2>

                {/* Card 3 */}
                <InfoCard3>
                    <CircleIcon>
                            <StyledFontAwesomeIconInfoWhite icon={faCalendarPlus} />
                    </CircleIcon>
                        <TitleW>Zakažite svoj termin</TitleW>
                    <SmallText3>Some description text here.</SmallText3>
                </InfoCard3>
            </InfoCardContainer>
            </>
            <Container>
                <ImageContainer>
                    <Image2 src="/home2.png" alt="Your Image" />
                </ImageContainer>
                <OverlayText>
                    <Title4>Šta možete da očekujete?</Title4>
                    <Description>Additional text goes here. You can add more details about making homes smarter.Additional text goes here. You can add more details about making homes smarter.Additional text goes here. You can add more details about making homes smarter.Additional text goes here. You can add more details about making homes smarter.</Description>
                </OverlayText>
            </Container>
        </>
    );
};

export default HomePage;
