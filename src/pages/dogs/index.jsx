import React, { Component } from "react";
import { connect } from "react-redux";
import * as dogActions from "../../actions/dogAction/getDogActions";

import styles from "./styles.scss";

class Dogs extends Component {
  render() {
    const { fetching, dog, onRequestDog, error } = this.props;
    
    return (
      <div className={styles.dogs}>
        <header className="dogs__header">
          <h1 className="dogs__title">Welcome to Dog Saga</h1>
        </header>

        {dog ? (
          <p className="dogs__intro">Keep clicking for new dogs</p>
        ) : (
          <p className="dogs__intro">Replace the React icon with a dog!</p>
        )}

        {fetching ? (
          <button className="btn btn--style-a" disabled>Fetching...</button>
        ) : (
          <button className="btn btn--style-a" onClick={onRequestDog}>Request a Dog</button>
        )}

        <div className="clearfix">
          <img src={dog || `http://placehold.it/200x100`} className="App-logo" alt="logo" />
        </div>

        {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    dog: state.dog.dog,
    error: state.error
  };
};

const mapDispatchToProps = {
  onRequestDog: dogActions.fetchDog
};

export default connect(mapStateToProps, mapDispatchToProps)(Dogs);