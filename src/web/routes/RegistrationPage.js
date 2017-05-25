import React from 'react';
import Frame from '../components/Frame';
import RegistrationForm from '../components/RegistrationForm';

class RegistrationPage extends React.Component {
  render() {
    return (
      <Frame showMenu={false}>
        <RegistrationForm />
      </Frame>
    );
  }
}

export default RegistrationPage;
