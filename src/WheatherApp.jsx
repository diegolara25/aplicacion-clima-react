import { useState } from "react"


export const WheatherApp = () => {

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = '2d191fe89064951dd4eb66469225b31b'
  const difKelvin = 273.15
  

  const [ciudad, setCiudad] = useState('')
  const [dataClima, setdataClima] = useState(null); //se inicializa en null porque no hay data
  
  const handleCambioCiudad = (e) => {
   setCiudad(e.target.value)
  }

  const handleSubmit =  (e) => {
    e.preventDefault()
    console.log(ciudad)
    if( ciudad.length > 0)
    fetchClima();

  }

  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`) 
      const data = await response.json()
      console.log(data) 
      setdataClima(data)

    } catch (error) {
      console.error('ocurrio un problema ', error)
    }
  }


  return (
    <div className="container">
      <h1>Aplicacion del Clima</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="ciudad" value={ciudad} onChange={handleCambioCiudad} />
        <button type="submit">Buscar</button>
      </form>
      {
        dataClima && (
          <div>
            <h2>{dataClima.name}</h2>
            <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
            <p>Condicion Metereologica: {dataClima?.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}.png`} alt="clima" />
          </div>
        )
      }

    </div>
  )
}


