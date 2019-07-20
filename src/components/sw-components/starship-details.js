import React from 'react';
import ItemDetails, { Record } from '../item-details/item-details';
import { withSwapiService } from '../hoc-helpers';
import GoBackButton from '../go-back-button';

const StarshipDetails = (props) => {
  return (
    <React.Fragment>
      <ItemDetails {...props}>
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
        <GoBackButton />
      </ItemDetails>
    </React.Fragment>
  );
};

//Трансформация данных сервиса для props
const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getStarship,
    getImageUrl: swapiService.getStarshipImage
  }
};

export default withSwapiService(mapMethodsToProps)(StarshipDetails);
