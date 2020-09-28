import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import All from './Pages/All/All';
import Country from './Pages/Country/Country';
import Nav from './Components/Nav/Nav';

class App extends Component {
  state = {
    response: {
      covid19Stats: []
    },
    chartData: {},
    post: '',
    responseToPost: '',
  }; 
  
  render() {
    return (
      <Router>
      <div className="App">
        <Nav/>
          <Switch>
            <Route path="/" exact component={All} />
            <Route path="/country" component={Country} />
          </Switch>
      </div>
    </Router>
    );
  }
}

export default App;