import React from 'react';
import { withRouter } from 'react-router-dom';

import './go-back-button.css';

const GoBackButton = ({ history }) => {    

  return (
    <button
      className="btn btn-success go-back"
      onClick={history.goBack}>
      Go to back
    </button>
  );

}

export default withRouter(GoBackButton);