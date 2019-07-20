import React from 'react';
import { withRouter } from 'react-router-dom';
import { PersonDetails, PersonList } from '../sw-components';
import Row from '../row';

const PeoplePage = ({ history, match }) => {

  const { id } = match.params;

    return (
      <Row
        left={<PersonList onItemSelected={ (id) => history.push(id) } />}
        right={<PersonDetails itemId={id} />} />
    );

}

//Передаст объекты match, location и history в PeoplePage
export default withRouter(PeoplePage);