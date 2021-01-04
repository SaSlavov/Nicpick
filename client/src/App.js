import { connect } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';
import Homepage from './components/Homepage/Homepage';
import Search from './components/Search/Search';
import SideBar from './components/SideBar/SideBar';

function App({activeSearch}) {
  return (
    <div className="App">
      <Header />
      {/* <Search active={activeSearch.active}/> */}
      <SideBar />
      <Homepage />
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
