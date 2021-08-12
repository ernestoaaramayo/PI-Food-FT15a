import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home/Home'
import Create from './components/Create/Create'
import LandingPage from './components/LandingPage/LandingPage'
import RecipeDetail from './components/RecipeDetail/RecipeDetail'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path='/detail/:id' component={RecipeDetail}/>
        <Route path='/create' component={Create}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
