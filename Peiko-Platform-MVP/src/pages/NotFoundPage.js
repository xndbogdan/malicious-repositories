import React, { useContext } from 'react';
import Container from '../components/layout/Container';
import CenteredBlock from '../components/layout/CenteredBlock';
import Heading from '../components/typography/Heading';
import Button from '../components/buttons/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useScrollToTopOnPageLoad from '../hooks/useScrollToTopOnPageLoad';

const NotFoundPage = () => {
   
  useScrollToTopOnPageLoad();

  return (
    <Container fullHeight contentCenteredMobile padding="4rem 2rem 2rem 2rem">
      <CenteredBlock>
        <Heading as="h2" headingClass="h1" textCenteredOnMobile>
          Oh noes! A big ol' 404 error!
        </Heading>
        <Heading as="h3" headingClass="h5" textCenteredOnMobile>
          This page doesn't exist! Nothing to see here…
        </Heading>
        <Wrapper>
          <Button as={Link} to="/" large primary fullWidthOnMobile autoFocus>
            Back to Home
          </Button>
        </Wrapper>
      </CenteredBlock>
    </Container>
  );
};

const Wrapper = styled.div`
  @media screen and (min-width: 1024px) {
    margin-top: 1.5rem;
  }
`;

export default NotFoundPage;
