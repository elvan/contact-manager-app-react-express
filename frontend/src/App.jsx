import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Home from './components/pages/Home';
import AuthState from './context/AuthState';
import ContactState from './context/ContactState';

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <Router>
          <>
            <Navbar title='Contacts' icon='fas fa-id-card-alt' />
            <div className='container'>
              <Switch>
                <Route path='/' component={Home} exact />
                <Route path='/about' component={About} exact />
                <Route path='/register' component={Register} exact />
                <Route path='/login' component={Login} exact />
              </Switch>
            </div>
          </>
        </Router>
      </ContactState>
    </AuthState>
  );
};

export default App;
