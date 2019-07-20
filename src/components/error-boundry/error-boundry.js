import React, { Component } from 'react';

import ErrorIndicator from '../error-indicator/error-indicator';

//Компонент границы ошибок
export default class ErrorBoundry extends Component {

    state = {
      hasError: false
    };
  
    componentDidCatch() {
      this.setState({
        hasError: true
      });
    };
  
    render() {
      if (this.state.hasError) {
        //Обработчик ошибок
        return <ErrorIndicator />
      };
  
      //Возвращает "тело" компонента
      return this.props.children;
    };
  
  };