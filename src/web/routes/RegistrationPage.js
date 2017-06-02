import React from 'react';
import Frame from '../components/Frame';
import RegistrationForm from '../components/RegistrationForm';

const RegistrationPage = () => {
  return (
    <Frame showMenu={false}>
      <RegistrationForm />
    </Frame>
  );
};

export default RegistrationPage;
