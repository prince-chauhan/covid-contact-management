import { LatLngExpression } from 'leaflet';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area,Brush, AreaChart } from 'recharts';
import "leaflet/dist/leaflet.css"
import L from "leaflet";

//sets the icon property of the L.Marker prototype to a custom icon object
L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [15, 25]
});

//variable with latitude and longitude coordinates
const center = { lat: 59.433421, lng: 24.75224 };

//converts number into a shortened format (e.g., 1.5B, 2.3M, 1.8K)
  function convert(num:number) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';  
    }
    
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';  
    }
    
    if (num >= 1000) { 
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    
    return num;
  }
const Map = () =>{
  //initial state data using the useState hook
  const [data, setData] = useState<{ countryName: string, position:{lat: number, long:number}, active:number, deaths: number, recovered:number, flag:string  }[]>([]);
  
  //this effect fetches data from a remote API
  useEffect(() => {
    const fetchData = async () => {
      let result: {
        countryName: string; position:{lat: number, long:number}; active:number; deaths: number; recovered:number; flag:string; 
    }[]
      //performs an asynchronous fetch request to the specified URL    
      fetch('https://disease.sh/v3/covid-19/countries')
      .then(res => res.json())//parses the response data as JSON
      .then(data => {
        //maps the fetched data into a modified format and assigns it to the result variable
        result = data.map((arr: { country: any; countryInfo: { lat: any; long: any; flag:string; }; active: any; recovered: any; deaths: any;  }) => {
          return {
            countryName:arr.country,
            position:{lat:arr.countryInfo.lat, long:arr.countryInfo.long},
            active:arr.active,
            recovered:arr.recovered,  
            deaths: arr.deaths,  
            flag: arr.countryInfo.flag,  
          }
        })
      setData(result);
      })
      .catch(err => {
        console.log(err)
      })
    };

    fetchData();
  }, []);
  //renders MapContainer component with specified props and children
  return(    
    data.length?
    <MapContainer
    center={center}
    style={{width:'100%', height:'100%', zIndex:1}}
    zoom={4} scrollWheelZoom={false}
>
    <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {data.map((country)=>(
    //maps over the data array and renders a Marker component for each country with corresponding props and children
    <Marker position={[ country.position.lat, country.position.long]} key={country.countryName}>
        <Popup>
            <div className='flex'><strong>{country.countryName}</strong> <img src={country.flag} alt='flag' className='ml-2 w-6'/></div> <br /> Active: {convert(country.active)} <br /> Deaths: {convert(country.deaths)} <br /> Recovered: {convert(country.recovered)}
        </Popup>
    </Marker>

    ))}
    <Marker position={[50.43046, 24.728563]}>
        <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
    </Marker>
</MapContainer>:
//renders a loading indicator when the data array is empty
<div role="status" className='flex items-center justify-center h-full'>
    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>

  )
}
const Charts: React.FC = () => {
  //initialize the data state variable using the useState hook to store an array of objects with properties date, cases, and deaths
  const [data, setData] = useState<{ date: string, cases: number, deaths:number }[]>([]);

  //define the useEffect hook to fetch historical COVID-19 data from the specified API endpoint and update the data state variable
  useEffect(() => {
    const fetchData = async () => {
      let result: {
        date: string;
        cases: any;
        deaths: any;
    }[]
      fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
      .then(res => res.json())
      .then(data => {
        result = Object.keys(data.cases).map(date => {
          return {
            date,
            cases: data.cases[date],  
            deaths: data.deaths[date],  
          }
        })
      setData(result);
      })
      .catch(err => {
        console.log(err)
      })

    };

    fetchData();
  }, []);

  // initialize the worldData state variable using the useState hook to store the global COVID-19 data.
  const [worldData, setWorldData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      fetch('https://disease.sh/v3/covid-19/all')
      .then(res => res.json())
      .then(data => {
      setWorldData(data);
      console.log(data)
      })
      .catch(err => {
        console.log(err)
      })

    };

    fetchData();
  }, []);

  return (
    
    <div className='w-full'>
      
      {/* render the four statistic cards for "Today's Cases," "Active Cases," "Recovery," and "Deaths" with their respective data retrieved from the worldData state variable */}
      <div className="grid lg:grid-cols-4 max-[1024px]:grid-cols-2 gap-4 mb-4">          
        <div className="max-w-sm p-6 bg-purple-200 border border-gray-200 rounded-lg shadow">
          <h1 className='text-lg font-bold'>Today's Cases</h1>
          <h2 className='text-md font-medium'>{worldData?.todayCases?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
          <h2 className='text-sm font-medium'>from {worldData?.affectedCountries} countries</h2>
          <span className=' text-xs font-thin'>as of {new Date(worldData?.updated).toUTCString()}</span>
        </div>
        <div className="max-w-sm p-6 bg-blue-200 border border-gray-200 rounded-lg shadow">
          <h1 className='text-lg font-bold'>Active Cases</h1>
          <h2 className='text-md font-medium'>{worldData?.active?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} active cases</h2>
          <h2 className='text-sm font-medium'>{worldData?.activePerOneMillion?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} per 1M</h2>
          <span className=' text-xs font-thin'>{worldData?.population?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} total population</span>
        </div>
        <div className="max-w-sm p-6 bg-green-200 border border-gray-200 rounded-lg shadow">
          <h1 className='text-lg font-bold'>Recovery</h1>
          <h2 className='text-md font-medium'>{worldData?.todayRecovered?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} today</h2>
          <h2 className='text-sm font-medium'>{worldData?.recoveredPerOneMillion?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} per 1M</h2>
          <span className=' text-xs font-thin'>{worldData?.recovered?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} total recovered</span>
        </div>
        <div className="max-w-sm p-6 bg-red-200 border border-gray-200 rounded-lg shadow">
          <h1 className='text-lg font-bold'>Deaths</h1>
          <h2 className='text-md font-medium'>{worldData?.todayDeaths?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} today</h2>
          <h2 className='text-sm font-medium'>{worldData?.deathsPerOneMillion?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} per 1M</h2>
          <span className=' text-xs font-thin'>{worldData?.deaths?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} total deaths</span>
        </div>
      </div>

      {/* render the "Country Wise Data" section with a map component */}
      <div className='items-center justify-evenly grid-cols-1 grid mb-10'>      
        <div className='p-6 bg-white border border-gray-200 rounded-lg shadow h-114 overflow-x-hidden'>
          <h4 className='text-center font-medium text-2xl mb-6'>Country Wise Data</h4>
          <div className=' h-116 '>
            <Map/>
          </div>
        </div>
      </div>

      {/* render the "Historic chart data" section with two line charts displaying the total cases and total deaths over time */}
      <h2 className='text-center font-medium text-xl mb-6'>Historic chart data</h2>
      <div className='items-center justify-evenly lg:grid-cols-2 grid-cols-1 gap-2 grid'>      
        <div className='p-6 bg-white border border-gray-200 rounded-lg shadow h-80 max-h-96 pb-20'>
        <h4 className='text-center font-medium mb-6'>Total cases till now</h4>
        
        {/* render the line chart for "Total cases till now" using the data state variablen, if the data array is empty, display a loading spinner */}
        {data.length?
          <ResponsiveContainer>
            <LineChart
              data={data}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cases" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        :
        
<div role="status" className='flex items-center justify-center h-full'>
    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
        }
        </div>

        <div className='p-6 bg-white border border-gray-200 rounded-lg shadow h-80 max-h-96'>
        <h4 className='text-center font-medium mb-6'>Total deaths till now</h4>

        {/* render the area chart for "Total deaths till now" using the data state variable, if the data array is empty, display a loading spinner */}
        {data.length?<ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={data}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="deaths" stroke="#82ca9d" fill="#82ca9d" />
                <Brush />
              </AreaChart>
            </ResponsiveContainer>:
<div role="status" className='flex items-center justify-center h-full'>
    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>}
        </div>
      </div> 
    </div> 
  );
};

export default Charts;
