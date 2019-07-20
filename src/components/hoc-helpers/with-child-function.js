import React from 'react';

//Функция обёртка (HOC)
const withChildFunction = (fn) => (Wrapped) => { 
  return (props) => {
    return (
      <Wrapped {...props}>
        {fn}
      </Wrapped>
    );
  };
};

export default withChildFunction;