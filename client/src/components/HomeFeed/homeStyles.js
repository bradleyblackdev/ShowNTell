/*
lets store things in the theme object variable;
neutral // text color, border color
primary // background-color...probably it
secondary // background-color of main message of subscription
tertiary //
quaternary // alternate text color

*/

import styled, { css } from 'styled-components';

const homeStyles = (theme) => {
  const { neutral, primary, secondary, tertiary, quaternary } = theme;

  const HomeTitle = styled.div`
  color:white;
  font-weight: bold;
  font-size: 28px;
  font-family: 'Work Sans', sans-serif;
  margin-top: 1%;
  margin-left: 20%
  `;

  const HomeFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30%;
  margin-left: 20%;
  `;
};

export default homeStyles;
