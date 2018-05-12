import React, { Component } from "react";
import { connect } from "react-redux";
import * as dogActions from "./actions/dogAction/getDogActions";

class SagaExample extends Component {
  render() {
    const { fetching, dog, onRequestDog, error } = this.props;
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={dog || `http://placehold.it/200x100`} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Dog Saga</h1>
        </header>

        {dog ? (
          <p className="App-intro">Keep clicking for new dogs</p>
        ) : (
          <p className="App-intro">Replace the React icon with a dog!</p>
        )}

        {fetching ? (
          <button disabled>Fetching...</button>
        ) : (
          <button onClick={onRequestDog}>Request a Dog</button>
        )}

        {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}

      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    fetching: state.fetching,
    dog: state.dog.dog,
    error: state.error
  };
};

const mapDispatchToProps = {
  onRequestDog: dogActions.fetchDog
};

export default connect(mapStateToProps, mapDispatchToProps)(SagaExample);