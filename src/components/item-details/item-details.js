/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';

import './item-details.css';

//Генерирует элемент списка
const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{ item[field] }</span>
    </li>
  );
};

export {
  Record
};


export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null
  };

  //Обновление компонента после инициализации
  componentDidMount() {
    this.updateItem();
  };

  componentDidUpdate(prevProps) {
    //Обязательная проверка. Иначе цикл может стать бесконечным 
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  };

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item)
        });
      });
  };

  render() {

    const { item, image } = this.state;

    if (!item) {
      return (
        <div className="item-details card" >
          <span>Select a item from a list</span>
        </div>
      );
    };

    const { name } = item;

    return (
      <div className="item-details card">
        <img className="item-image"
          src={image}
          alt="item" />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              /*Возвращает элементы списка
              сгенерированные на основе "Record" в теле компонента*/
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}