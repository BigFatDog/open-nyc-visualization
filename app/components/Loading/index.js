import React from 'react';
import styled from 'styled-components';

const CentralContainer = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: black;
  background: rgb(245, 244, 249);
  padding: 0px;
  margin: 0px;

  flex-direction: column;
  text-align: center;
`;

const Loading = ({ msg }) => (
  <CentralContainer>
    <i className="fas fa-circle-notch fa-spin" style={{ fontSize: '36px' }} />
    {msg}
  </CentralContainer>
);

export default Loading;
