import React, { Component } from 'react';
import Preloader from '../preloader/preloader';
import ErrorIndicator from '../error-indicator';

//Получает данные и отображает состояние (HOC)
const withData = (View) => {
  return class extends Component {

    state = {
      data: null,
      loading: true,
      error: false
    };
  
    componentDidMount() {
      this.setState( {
          loading: true,
          error: false
        });

      this.props.getData()
      .then((data) => {
        this.setState({
          data,
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          error: true,
          loading: false
        });
      });
    };

    render() {

      const { data, loading, error } = this.state;

      if (loading) {
        return (
          <div className="card">
            <Preloader />
          </div>
        )
      }
      
      if (error) {
        return <ErrorIndicator />;
      }

      return <View {...this.props} data={data} />;
    };
  };
};

export default withData;