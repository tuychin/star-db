import React from 'react';
import ItemList from '../item-list';
import {
  withData,
  withSwapiService,
  withChildFunction,
  compose } from '../hoc-helpers';

const renderName = ({ name }) => <span>{name}</span>;

const renderModelAndName = ({ model, name}) => <span>{name} ({model})</span>;

//Трансформация данных сервиса для props
const mapPersonMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPeople
  };
};

//Трансформация данных сервиса для props
const mapPlanetMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets
  };
};

//Трансформация данных сервиса для props
const mapStarshipMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllStarships
  };
};

//Композиция HOC
const PersonList = compose(
                    withSwapiService(mapPersonMethodsToProps),
                    withData,
                    withChildFunction(renderName)
                  )(ItemList);

//Композиция HOC
const PlanetList = compose(
                    withSwapiService(mapPlanetMethodsToProps),
                    withData,
                    withChildFunction(renderName)
                  )(ItemList);

//Композиция HOC
const StarshipList = compose(
                      withSwapiService(mapStarshipMethodsToProps),
                      withData,
                      withChildFunction(renderModelAndName)
                    )(ItemList);

export {
  PersonList,
  PlanetList,
  StarshipList
};