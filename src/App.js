import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Header from './components/layouts/Header';
import ImagesGrid from './pages/ImagesGrid';
import ImageDetails from './pages/ImageDetails';
import AddNewImage from './pages/AddNewImage';

function App() {
  return (
    <>
      <Router>
        <Header />

        <Switch>
          <Route exact path='/add-new' component={AddNewImage} />
          <Route exact path='/images' component={ImagesGrid} />
          <Route exact path='/details/:id' component={ImageDetails} />
          <Route path='*'>
            <Redirect to='/images' />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
