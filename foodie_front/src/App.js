
import './App.css';
import LoginUser from './components/login_user.jsx'
import Header from './components/header.jsx'
import LoginEmail from './components/login_email.jsx'
import Register from './components/register.jsx'
import UserResult from './components/result.jsx'
import NotFound from './components/not_found.jsx'
import Activation  from './components/activation.jsx'
import Main from './components/main.jsx'
import ResendActivation from './components/resendactivation';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

import './i18n.js'
function App() {
  return (
    <Router>
    <div className="main">
       <Header></Header>
       

       <Switch>
         <Route path="/users/loginusername" exact component= {LoginUser}/>
         <Route path="/users/loginemail" exact component= {LoginEmail}/>
         <Route path="/users/register" exact component= {Register}/>
         <Route path="/users/userresult" exact component= {UserResult}/>
         <Route path="/users/activation/:id"  component= {Activation}/>
         <Route path="/users/resendactivation" exact component={ResendActivation}/>
         <Route path="/" exact component={Main}/>
         <Route path="*"  component= {NotFound}/>

        
       </Switch>
      
         
      
     
    </div>
    </Router>
  

  );
}

export default App;
