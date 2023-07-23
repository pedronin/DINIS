import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="container">
      <h1>
        <span>💩</span>
        <br />
        Ничего не найдено
      </h1>
      {/* <h2>Кажется вы ошиблись адресом<br/>
       Пожалуйста вернитесь на главную страницу:</h2> */}
       <Link to="/" className="button button--outline button--add go-back-btn">
        <span>На главную</span>
      </Link>
    </div>
  );
};

export default NotFound;
