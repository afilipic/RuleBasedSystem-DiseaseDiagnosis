import styled, { keyframes } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const HomePageContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.secondColor};;
`;

export const LeftSide = styled.div`
flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align text to the left */
  margin-top: 70px;
  margin-left: 135px;
 z-index: 100;
`;

export const Title = styled.h1`
  font-size: 70px;
  color: white;
  margin-bottom: 10px;
  z-index: 100;
  text-align:left;
`;

export const SmallText = styled.p`
z-index: 100;
  font-size: 1em;
  color: ${({ theme }) => theme.colors.superlightblue};;
  text-align: left; /* Align text to the left */
  margin-bottom: 5px; /* Reduce the gap between sentences */
  margin-block-start: 0;
      margin-right: 140px;
      
`;

export const Button = styled.button`
  margin-top: 10px;
`;
export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
`;
export const StyledFontAwesomeIconInfo = styled(FontAwesomeIcon)`
  width:30px;
  height:30px;
  color: ${({ theme }) => theme.colors.lightblue};;
  
`;
export const StyledFontAwesomeIconInfoWhite = styled(FontAwesomeIcon)`
  width:30px;
  height:30px;
  color:white;
  
`;
export const RightSide = styled.div`

  margin-left: -200px;

`;

export const Image = styled.img`
    width: 800px;
    height: auto;
`;
const enlargeButton = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
`;
export const CustomButton = styled.button`
   border-radius: 30px;
  padding: 15px 35px;
  background-color: ${({ theme }) => theme.colors.lightblue};;
  color: black;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
  transition: transform 0.5s;

  &:hover {
    animation: ${enlargeButton} 0.5s forwards;
  }
`;
export const ArrowIcon = styled.i`
  margin-left: 5px;
`;
export const TextContainer = styled.div`
  margin-left: 50px;
  margin-top: 30px;
`;

export const InfoCardContainer = styled.div`
  display: flex;
  justify-content: center;
  padding:40px;
  
`;

// Define a styled component for the individual cards
export const InfoCard = styled.div`
  width: 200px;
  height: 200px; /* Set height equal to width to make it a square */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 20px 25px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.3);;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 0px;
  background-color:white;
`;
export const InfoCard2 = styled.div`
  width: 250px;
  height: 250px; /* Set height equal to width to make it a square */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 20px 25px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.3);;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 0px;
  margin-top :-22px;
  background-color:${({ theme }) => theme.colors.darkblue};;
`;
export const InfoCard3 = styled.div`
  width: 200px;
  height: 200px; /* Set height equal to width to make it a square */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 20px 25px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.3);;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
  background-color:${({ theme }) => theme.colors.lightblue};;
`;

// Define a styled component for the circle icon
export const CircleIcon = styled.div`
  margin-top: 20px;
  width: 70px;
  height: 70px;
  background-color: #FFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

// Define a styled component for the title
export const Title2 = styled.div`
  font-size: 21px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Title3 = styled.div`
padding-top: 80px;
  font-size: 45px;
  font-weight: 700;
  color: black;

`;
export const TitleW = styled.div`
font-size: 21px;
  font-weight: bold;
  margin-bottom: 8px;
  color: white;

`;
export const TitleB = styled.div`
font-size: 21px;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.lightblue};;

`;
export const StyledTitleWithLines = styled.div`
  font-size: 21px;
  font-weight: bold;
  position: relative;
  display: inline-block;
  padding: 0 5px; 
  color: ${({ theme }) => theme.colors.lightblue};;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 30px; /* Adjust the width of the lines */
    height: 2px;
    background-color: ${({ theme }) => theme.colors.lightblue};; /* Change the color as needed */
  }

  &::before {
    left: 0;
    transform: translateX(-100%);
  }

  &::after {
    right: 0;
    transform: translateX(100%);
  }
`;

// Define a styled component for the smaller text
export const SmallText2 = styled.div`
  font-size: 14px;
  color: #777;
`;
export const SmallText3 = styled.div`
  font-size: 14px;
  color: white;
`;
export const StyledSmartHomeImage = styled.img`
  margin-bottom: -5px;
  max-width: 68%;
  height: auto; 
  width: 800px;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 40px;
  padding-bottom: 40px;
  background:${({ theme }) => theme.colors.superlightblue};;


`;

export const ImageContainer = styled.div`
  width: 57%;
`;

export const Image2 = styled.img`
  width: 100%;
  height: 500px;
`;
export const Title4 = styled.div`
  font-size: 25px;
  margin-bottom: 20px;
  margin: 15px;
  font-weight: bold;
`;

export const Description = styled.div`
  font-size: 18px;
  line-height: 30px;
  margin: 15px;
`;
export const OverlayText = styled.div`
  position: relative;
  width: 500px;
  height: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 5px 20px 25px rgba(0, 0, 0, 0.4);
  text-align: left;
  color:black;
  line-height: 40px; /* Vertical centering for the text */
  margin-left: -90px; /* Overlapping 20% of the image from the right */
  z-index: 1; /* Ensure the text appears above the image */
  padding: 20px;
`;