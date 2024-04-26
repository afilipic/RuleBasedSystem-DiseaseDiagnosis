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
                <Title>Best Medical and Healthcare Service</Title>
                <SmallText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </SmallText>
                
                {showMore && (
                    <SmallText>
                        Additional text goes here. You can add more details about making homes smarter.
                    </SmallText>
                )}
                
                <CustomButton onClick={handleShowMore}>
                    {showMore ? 'Show Less' : 'Show More'}
                    <StyledFontAwesomeIcon icon={showMore ? faArrowUp : faArrowDown} />
                </CustomButton>
            </LeftSide>
            
            {/* Right Side */}
            <RightSide>
                <StyledSmartHomeImage src="/pic2.png" alt="Smart Home" />
            </RightSide>
            </HomePageContainer>
            
            <>
            
                <Title3>Our Healthcare Services</Title3>
                <StyledTitleWithLines>MedicLab Services</StyledTitleWithLines>
                
            <InfoCardContainer>
                <InfoCard>
                    <CircleIcon>
                            <StyledFontAwesomeIconInfo icon={faUserMd} />         
                    </CircleIcon>
                    <Title2>Doctors Timtable</Title2>
                    <SmallText2>Some description text here.</SmallText2>
                </InfoCard>

                {/* Card 2 */}
                <InfoCard2>
                    <CircleIcon>
                            <StyledFontAwesomeIconInfo icon={faHeartbeat} />
                    </CircleIcon>
                    <TitleB>Emergency Call</TitleB>
                    <SmallText3>Some description text here.</SmallText3>
                </InfoCard2>

                {/* Card 3 */}
                <InfoCard3>
                    <CircleIcon>
                            <StyledFontAwesomeIconInfoWhite icon={faCalendarPlus} />
                    </CircleIcon>
                        <TitleW>Make An Appointemnt</TitleW>
                    <SmallText3>Some description text here.</SmallText3>
                </InfoCard3>
            </InfoCardContainer>
            </>
            <Container>
                <ImageContainer>
                    <Image2 src="/home2.png" alt="Your Image" />
                </ImageContainer>
                <OverlayText>
                    <Title4>What you can expect?</Title4>
                    <Description>Additional text goes here. You can add more details about making homes smarter.Additional text goes here. You can add more details about making homes smarter.Additional text goes here. You can add more details about making homes smarter.Additional text goes here. You can add more details about making homes smarter.</Description>
                </OverlayText>
            </Container>
        </>
    );
};

export default HomePage;
