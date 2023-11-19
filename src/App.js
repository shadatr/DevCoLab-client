import React, { Component } from 'react';
import Header from "./components/header";
import { connect } from 'react-redux';
import * as actions from '../src/actions';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import Home from './components/home';
import Footer from './components/footer';
import Explore from './components/explore';
import Posting from './components/posting';
import Post from './components/post';

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
              <Route  path="/explore" element={<Explore/>} />
              <Route  path="/posting" element={<Posting/>} />
              <Route  path="/post/:id" element={<Post/>} />

            </Routes>
          </div>
        </BrowserRouter>
        <Footer/>
    </div>
  );
}}

export default connect(null, actions)(App);
