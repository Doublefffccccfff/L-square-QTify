import logo from './logo.svg';
import './App.css';
import Search from './Search/Search';
import Navbar from './Navbar/Navbar';
import HeroSection from './Hero/Hero';
import Section from './Section/Section';

function App() {
  return (
    <div className="App">
     <Navbar/>
     <HeroSection/>
     <Section title={'Top albums'}/>
    </div>
  );
}

export default App;
