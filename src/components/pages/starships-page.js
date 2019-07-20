import React from 'react';
import { StarshipList } from '../sw-components';
import { withRouter } from 'react-router-dom';

const StarshipsPage = ({ history }) => {
  return (
      <StarshipList
        onItemSelected={(id) => { history.push(id) }} />
  );
};

//Передаст объекты match, location и history в StarshipsPage
export default withRouter(StarshipsPage);