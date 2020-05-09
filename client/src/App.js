import React from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom';

import Join from './components/Join/Join';
import MainTime from './components/MainTime/MainTime';

const App = () => (
    <Router>
        <Route path="/" exact component={Join}/>
        <Route path="/timer" component={MainTime} />
    </Router>
);

export default App;