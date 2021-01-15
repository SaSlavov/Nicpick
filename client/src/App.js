import { connect } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Homepage from './components/Homepage/Homepage';
import List from './components/List/List';
import Search from './components/Search/Search';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Header />
        <SideBar />
        <Switch >
          <Route path='/' exact component={Homepage} />
          <Route path='/list' component={List} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    activeSearch: state.activeSearch
  }
}

export default connect(
  mapStateToProps
)(App);
