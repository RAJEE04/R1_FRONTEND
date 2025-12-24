import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Menubar from '../components/Menubar';
import Welcome from '../components/Welcome';
import Footer from '../components/Footer';
import React, { useState } from 'react';

const Main: React.FC = () => {
     const [menu, setMenu] = useState("");
     const [search, setSearch] = useState("");
   
  return (
    <div>
    
        <Navbar setSearch={setSearch} setMenu={setMenu}/>
        <Menubar setMenu={setMenu}/>
        <Welcome />
        <Home search={search} menu={menu}/>
        <Footer />
    </div>
  );
}

export default Main;