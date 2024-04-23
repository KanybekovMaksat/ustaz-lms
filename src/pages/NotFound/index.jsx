import React from 'react';
import { Link } from 'react-router-dom';

import "./index.css";


const NotFound = () => {
  return (
    <div className='not-found'>
      <h1>404 <br /> Страница не найдена</h1>
      <p>Извините, но запрашиваемая вами страница не существует.</p>
      <Link to='/'>На главную</Link>
    </div>
  );
};

export default NotFound;
