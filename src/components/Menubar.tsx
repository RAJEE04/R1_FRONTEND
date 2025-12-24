import React from 'react';
import men from "../assets/boy.png";
import women from "../assets/woman.png";
import electronics from "../assets/electronics.png";
import jewellery from "../assets/jewelry.png";

interface menuProp {
    setMenu :(menu: string) => void;
}

const Menubar: React.FC<menuProp> = (prop) => {
  return (
    <div className='bg-gray-200 p-2 m-4'>
    <div className=' bg-white flex justify-between p-3'>

    <div onClick={() =>prop.setMenu("electronics")} className='cursor-pointer'>
         <img src={electronics} alt="electronics" className="w-20 h-18 ml-5"/>
         <h1 className='ml-5 font-semibold'>Electronics</h1>
    </div>
    
    <div onClick={() => prop.setMenu("jewellery")} className='cursor-pointer'>
        <img src={jewellery} alt="jewellery" className="w-20 h-18 ml-5"/>
        <h1 className='ml-7 font-semibold'>Jewellery</h1>
    </div>
   
   <div onClick={() => prop.setMenu("men")} className='cursor-pointer'>
        <img src={men} alt="men" className="w-20 h-18 ml-5"/>
         <h1 className='ml-11 font-semibold'>Men</h1>
   </div>
    
    <div onClick={() => prop.setMenu("women")} className='cursor-pointer'>
        <img src={women} alt="women" className="w-20 h-20"/>
         <h1 className='ml-3 font-semibold'>Women</h1>
    </div>
     </div>
     </div>
  );
}

export default Menubar;