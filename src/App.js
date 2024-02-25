import React, { useState } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const [data,setData] = useState({})
  const [location,setLocation]= useState('')

  //const url = 'https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=a0ffa170770279cc4b54a41e1039e618'
  //const url = 'https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=a0ffa170770279cc4b54a41e1039e618';
  // console.log(url);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=a0ffa170770279cc4b54a41e1039e618`;

  const searchLocation = (event) => {
    if (event.key === 'Enter'){
      axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      setLocation('')
    }
  }
  
  return (
    <div  id="App" className='h-full w-full relative'>
      <div id='search' className='flex justify-center text-center p-10'>
        <input className='p-2 text-sm font-semibold rounded-xl border-2 border-black'
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type='text'/>
      </div>
     <div id='container'className='max-w-96 h-96 m-0 pt-2 pb-20 px-10 relative'>
      <div id='top'>
        <div id='location'>
          <p className='text-xl text-white'>{data.name}</p>
        </div>
        <div id='temperature'>
          {data.main ? <h1 className='text-8xl text-white'>{data.main.temp.toFixed()}°F</h1> : null }
          {/* <h1 className='text-8xl text-white'>{data.main.temp}</h1> */}
        </div>
        <div id='description'>
          {data.weather ? <p className='text-xl text-white'>{data.weather[0].description}</p> : null}
          {/* <p className='text-xl text-white'>Clouds</p> */}
        </div>
      </div>
      {data.name !== undefined && 

<div className='pt-96 flex justify-center lg:pt-60 pl-12'>
<div id='bottom' className='flex text-center justify-center gap-10 justify-evenly rounded-xl bg-gray-500'>
  <div id='feels'>
    {data.main ? <p className='text-xl text-white font-bold pl-2 pt-2'>{data.main.feels_like.toFixed()}°F</p> : null }
    {/* <p className='text-xl text-white font-bold pl-2 pt-2' id='bold'>65°F</p> */}
    <p className='text-xl text-white pl-4 pb-2'>Feels Like</p>
  </div>
  <div id='humidity'>
    {data.main ? <p className='text-xl text-white font-bold pt-2'>{data.main.humidity}%</p> : null } 
    {/*  <p className='text-xl text-white font-bold pt-2' id='bold'>20%</p> */}
    <p className='text-xl text-white pb-2'>Humidity</p>
  </div>
  <div id='wind'> 
  {data.wind ? <p className='text-xl text-white font-bold pr-2  pt-2'>{data.wind.speed.toFixed()}MPH</p> : null }
    {/* <p className='text-xl text-white font-bold pr-2  pt-2'  id='bold'>12 MPH</p> */}
    <p className='text-xl text-white pr-4 pb-2'>Wind Speed</p>
  </div>
</div>
</div>
      }
      
     </div>
    </div>
  );
}

export default App;
