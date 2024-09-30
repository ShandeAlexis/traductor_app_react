
import { useState } from 'react'
import './App.css'

function App() {
  const [inputText ,setInputText]= useState('');
  const [translatedText, setTranslateText] = useState('');

  const translateText = async () => {
    const apiURL= "https://libretranslate.com/translate";
    //@ts-ignore
    const apikey= process.env.API_KEY;
    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: inputText,
          source: 'auto',
          target: 'es',
          alternatives: 3,
          api_key: apikey,
        }),
      });

      if(response.ok){
        const data = await response.json();
        setTranslateText(data.translatedText)
      }else{
        alert('Hubo un error al traducir el texto.')
      }
    } catch (error) {
      alert('Ocurrio uno error al conectar la API')
    }
  }
  return (
    <>
       <div className="app-container">
      <h1 className="title">Traductor de Inglés a Español</h1>
      <div className="translator-section">
        <div className="text-area-section">
          <div className="input-section">
            <h2>Inglés</h2>
            <textarea
              className="input-text"
              placeholder="Escribe aquí..."
              value={inputText}
              onChange={(e)=>setInputText(e.target.value)}
            ></textarea>
          </div>
          <div className="output-section">
            <h2>Español</h2>
            <textarea
              className="output-text"
              disabled
              value={translatedText}
              placeholder="Traducción aquí..."
            ></textarea>
          </div>
        </div>
        <button className="translate-button" onClick={translateText}>Traducir</button>
      </div>
    </div>
    </>
  )
}

export default App
