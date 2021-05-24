
import './App.css';
import LoginUser from './components/login_user.jsx'
import Header from './components/header.jsx'
import LoginEmail from './components/login_email.jsx'
import Register from './components/register.jsx'
import UserResult from './components/result.jsx'
import NotFound from './components/not_found.jsx'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
function App() {
  return (
    <Router>
    <div className="main">
       <Header></Header>
       

       <Switch>
      
         <Route path="/loginusername" exact component= {LoginUser}/>
         <Route path="/loginemail" exact component= {LoginEmail}/>
         <Route path="/register" exact component= {Register}/>
         <Route path="/userresult" exact component= {UserResult}/>
         <Route path="*"  component= {NotFound}/>

        
       </Switch>
      
         
      
     
    </div>
    </Router>
  

  );
}

export default App;
