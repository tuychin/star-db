//Класс-клиент
export default class SwapiService {

  _apiBase = 'https://swapi.dev/api';
  _imageBase = 'https://starwars-visualguide.com/assets/img';

  getResource = async (url) => {
    //Статус ответа сервера
    const res = await fetch(`${this._apiBase}${url}`);

    //Проверка статуса ответа сервера
    if (!res.ok) {
      //Ответ в случае ошибки
      throw new Error (`Could not fetch ${url}` + 
        `, received ${res.status}`)
    }

    //Вернёт тело ответа в формате json
    return await res.json();
  };

  getAllPeople = async () => {
    const res = await this.getResource(`/people/`);
    //Вернёт массив трансформированных объектов
    return res.results.map(this._transformPerson)
    .slice(0, 5);
  };

  getPerson = async (id) => {
    //Вернёт элемент по id
    const person = await this.getResource(`/people/${id}`);
    //Вернёт трансформированный объект
    return this._transformPerson(person);
  };

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    //Вернёт массив трансформированных объектов
    return res.results.map(this._transformPlanet)
    .slice(0, 5);
  };
  
  getPlanet = async (id) => {
    //Вернёт элемент по id
    const planet = await this.getResource(`/planets/${id}/`);
    //Вернёт трансформированный объект
    return this._transformPlanet(planet);
  };
  
  getAllStarships = async () => {
    const res = await this.getResource(`/starships/`);
    //Вернёт массив трансформированных объектов
    return res.results.map(this._transformStarship)
    .slice(0, 5);
  };
  
  getStarship= async (id) => {
    //Вернёт элемент по id
    const starship = await this.getResource(`/starships/${id}/`);
    //Вернёт трансформированный объект
    return this._transformStarship(starship);
  };

  getPersonImage = ({id}) => {
    return `${this._imageBase}/characters/${id}.jpg`
  };

  getStarshipImage = ({id}) => {
    return `${this._imageBase}/starships/${id}.jpg`
  };

  getPlanetImage = ({id}) => {
    return `${this._imageBase}/planets/${id}.jpg`
  };

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)\/$/;
    //Получение значения для id из URL
    //С помощью сопоставления строки и регулярного выражения
    return item.url.match(idRegExp)[1];
  };

  //Метод трансформирует объект полученный по API
  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    };
  };

  //Метод трансформирует объект полученный по API
  _transformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    };
  };

  //Метод трансформирует объект полученный по API
  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    };
  };
};
