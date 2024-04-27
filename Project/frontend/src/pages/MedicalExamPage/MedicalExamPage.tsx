import React, { useState } from 'react';
import { Container, Fieldset, ProgressBar, ProgressBarr } from './MedicalExamPage.styled';

const MedicalExamPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [previous, setPrevious] = useState(false);
  const [percent, setPercent] = useState(0);
  const [toPercent, setToPercent] = useState(0);

  const divStyle: React.CSSProperties = {
    padding: '20px 30px'
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep < 2 ? prevStep + 1 : prevStep);
    setPercent((step + 1) * 33.33);
    setToPercent(percent+33.33)
    setPrevious(false);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep > 0 ? prevStep - 1 : prevStep);
    setPercent((step - 1) * 33.33);
    setToPercent(percent-33.33)
    setPrevious(true);
  };

  

  return (
    <Container>
      <ProgressBar>
        <li className={step === 0 || step===1 || step === 2 ? 'active' : ''}>Account Setup</li>
        <li className={step === 1 || step===2 ? 'active' : ''}>Social Profiles</li>
        <li className={step === 2 ? 'active' : ''}>Personal Details</li>
      </ProgressBar>
    

        <Fieldset className="fieldset" style={{ display: step === 0 ? 'block' : 'none' }}>
        <ProgressBarr percent={(step + 1) * 33.33} previous={previous} toPercent ={toPercent} />
            <div className='TitleN'>
            
            <h2 className="fs-title">Symptoms</h2>
            </div>
            <div>
            <h3 className="fs-subtitle">This is step 1</h3>
            <input type="text" name="email" placeholder="Email" />
            <input type="password" name="pass" placeholder="Password" />
            <input type="password" name="cpass" placeholder="Confirm Password" />
            <input type="button" className="next action-button" onClick={nextStep} value="Next" />
            </div>
            
        </Fieldset>

      <Fieldset className="fieldset" style={{ display: step === 1 ? 'block' : 'none' }}>
      <ProgressBarr percent={(step + 1) * 33.33} previous={previous} toPercent ={toPercent} />
        <h2 className="fs-title">Blod Analysis</h2>
        <h3 className="fs-subtitle">Your presence on the social network</h3>
        <input type="text" name="twitter" placeholder="Twitter" />
        <input type="text" name="facebook" placeholder="Facebook" />
        <input type="text" name="gplus" placeholder="Google Plus" />
        <input type="button" className="previous action-button" onClick={prevStep} value="Previous" />
        <input type="button" className="next action-button" onClick={nextStep} value="Next" />
      </Fieldset>

      <Fieldset className="fieldset" style={{ display: step === 2 ? 'block' : 'none' }}>
      <ProgressBarr percent={(step + 1) * 33.33} previous={previous} toPercent ={toPercent}/>
        <h2 className="fs-title">Anamnezis</h2>
        <h3 className="fs-subtitle">We will never sell it</h3>
        <input type="text" name="fname" placeholder="First Name" />
        <input type="text" name="lname" placeholder="Last Name" />
        <input type="text" name="phone" placeholder="Phone" />
        <textarea name="address" placeholder="Address"></textarea>
        <input type="button" className="previous action-button" onClick={prevStep} value="Previous" />
      </Fieldset>
    </Container>
  );
};

export default MedicalExamPage;
