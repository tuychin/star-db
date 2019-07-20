import React from 'react';

//Создание контекста
const {
  //Оборачивает приложение и принимает значение контекста
  Provider : SwapiServiceProvider,
  //Оборачивает компоненты, которым нужно передать значение контекста
  Consumer : SwapiServiceConsumer
} = React.createContext();

export {
  SwapiServiceProvider,
  SwapiServiceConsumer
};