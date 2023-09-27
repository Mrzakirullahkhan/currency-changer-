import React from 'react';
import { useEffect,useState } from 'react';
import './App.css';




function App() {
  const controller = new AbortController()
 
  const [convertCureency, setConvertCureency]=useState(0);
  const [amount, setamount]=useState(0);
  const [toConvert, setToConvert]=useState("");
  const [fromConvert, setFromConvert]=useState("");

  
  useEffect(()=>{
     async function converCurrency(){
      try {
        const responce =await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromConvert}&to=${toConvert}`,{signal:controller.signal})
        const data = await responce.json()
        console.log(data)
    
       setConvertCureency(Object.entries(data.rates)[0][1])
      } catch (error) {
        console.log(error)
      }
     }
     converCurrency()
     
     return function (){
      controller.abort()
     }
  },[amount,toConvert,fromConvert])
  
  
  return (
    <div className="App">
    <div className="mainContainer">
    <p className='head'>Currency Converter</p>
    <div>
      <input type="number" onChange={(e)=> setamount(e.target.value)} className='inputValue'/>
      <select name="" id="" onChange={(e)=> setToConvert(e.target.value)} className='dropdown'>
      <option value="GBP">Select</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="GBP">GBP</option>
       
        
      </select>
    </div>

      <div className='equalto'>=</div>
      <div>
      <input type="number" value={convertCureency} className='inputValue'/>
      <select name="" id=""  onChange={(e)=> setFromConvert(e.target.value)} className='dropdown'>
      <option value="GBP">Select</option>
        <option value="GBP">GBP</option>
        <option value="INR">INR</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        
      </select>
    </div>
    </div>
    </div>
  );
}

export default App;
