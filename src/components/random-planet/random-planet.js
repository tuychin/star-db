/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Импорт класс-клиента
import SwapiService from '../../services/swapi-service';
import './random-planet.css';
import Preloader from '../preloader/preloader';
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {

  //Значение по умолчанию для props
  static defaultProps = {
    updateInterval: 3000
  };

  //Проверяет значения свойств компонента
  static propTypes = {
    updateInterval: PropTypes.number
  };

  //Инициализация класс-клиента в поле класса
  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  };

  //После инициализации компонента, в componentDidMount отправляется запрос на сервер
  componentDidMount() {
    const { updateInterval } = this.props;

    this.updatePlanet();
    //Вызывает функцию каждые 3 секунды, тем самым обновляя данные компонента
    this.interval = setInterval(this.updatePlanet, updateInterval);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  };

  onPlanetLoaded = (planet) => {
    //Получает трансформированные данные из класса-клиента и обновляет state
    this.setState({
      planet,
      //После загрузки контента меняет значение "loading"
      loading: false
    });
  };

  //Обработчик ошибок
  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  //Получает данные планеты по id
  updatePlanet = () => {
    //Генерирует случайный id от 2 до 20
    const id = Math.floor(Math.random() * 18) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      /*Метод .catch вызовет обработчик ошибок
        если функция вернёт rejected (ошибку)*/
      .catch(this.onError);
  };

  render() {

    const { planet, loading, error } = this.state;

    //Условия при которых отображается либо предзагрузчик, либо контент
    const errorMessage = error ? <ErrorIndicator /> : null;

    const hasData = !(loading || error);

    const preloading = loading ? <Preloader /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {preloading}
        {content}
      </div>
    );
  };
};

//Контент который отобразится после предзагрузчика
const PlanetView = ({planet}) => {

  const { id, name, population,
    rotationPeriod, diameter } = planet;

  return (
    //Оборачивает в DOM фрагмент два корневых элемента
    <React.Fragment>
        <img className="planet-image"
             //Изображение загружается не с API
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population:</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period:</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter:</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
    </React.Fragment>
  );
};