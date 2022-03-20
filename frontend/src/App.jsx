import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import About from './component/pages/About';
import Home from './component/pages/Home';

const App = () => {
  return (
    <Router>
      <>
        <Navbar title='Contacts' icon='fas fa-id-card-alt' />
        <div className='container'>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/about' component={About} exact />
          </Switch>
        </div>
      </>
    </Router>
  );
};

export default App;
