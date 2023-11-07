import React, { Component } from 'react';
import Header from "./components/header";
import { connect } from 'react-redux';
import * as actions from '../src/actions';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import Home from './components/home';
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
  return (
    <div className="bg-primary h-full text-secondary">
      <Header/>
      <BrowserRouter>
          <div>
            <Routes> 
              <Route path="/" element={<Home />} /> 
              {/* <Route exact path="/surveys" element={} /> */}
              {/* <Route path="/surveys/new" element={<SurveyNew />} />  */}
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}}

export default connect(null, actions)(App);
