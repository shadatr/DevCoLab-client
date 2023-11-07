import React, { Component } from 'react';
import Header from "./components/header";
import { connect } from 'react-redux';
import * as actions from '../src/actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
  return (
    <div className="bg-primary h-full text-secondary">
      <Header/>
    </div>
  );
}}

export default connect(null, actions)(App);
