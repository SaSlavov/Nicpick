import './App.css';
import Header from './components/Header/Header';
import Homepage from './components/Homepage/Homepage';
import Search from './components/Search/Search';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Search /> */}
      <SideBar />
      <Homepage />
    </div>
  );
}

export default App;
