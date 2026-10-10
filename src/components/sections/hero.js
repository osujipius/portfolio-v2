import React from 'react';
import styled from 'styled-components';
// import { email } from '@config';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 768px) {
    min-height: unset;
    justify-content: flex-start;
    padding-top: calc(var(--nav-height) + 40px);
    padding-bottom: 5vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Pius Osuji.</h2>;
  const three = <h3 className="big-heading">I build web apps with superpowers.</h3>;
  const four = (
    <>
      <p>
        I spec, build and scale software across the stack. These days, that involves teaming up with
        AI agents to shape frontend experiences, develop backend services and automate workflows.
      </p>
    </>
  );
  const five = (
    <a className="email-link" href="mailto:osujipius7@gmail.com" target="_blank" rel="noreferrer">
      Reach out!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {items.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
    </StyledHeroSection>
  );
};

export default Hero;
