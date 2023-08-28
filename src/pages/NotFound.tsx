import React from 'react';
import ButtonToHome from '../components/Buttons/ButtonToHome';

const NotFound: React.FC = () => {
  return (
    <div className="container">
      <h1>
        <span>💩</span>
        <br />
        Ничего не найдено
      </h1>
      <ButtonToHome />
    </div>
  );
};

export default NotFound;
