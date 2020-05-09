import React from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom';

import Join from './components/Join/Join';
import Timer from './components/Timer/Timer';

const App = () => (
    <Router>
        <Route path="/" exact component={Join}/>
        <Route path="/timer" component={Timer} />
    </Router>
);

export default App;