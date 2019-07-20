import React from 'react';
import { SwapiServiceConsumer } from '../swapi-service-context';

//HOC для передачи контекста трансформированных данных сервиса
const withSwapiService = (mapMethodsToProps) => (Wrapped) => {

  return (props) => {
    return (
      <SwapiServiceConsumer>
        {
          (swapiService) => {
            const serviceProps = mapMethodsToProps(swapiService);

            return (
              <Wrapped {...props} {...serviceProps} />
            );
          }
        }
      </SwapiServiceConsumer>
    );
  }
};

export default withSwapiService;