// src/components/Main/Main.jsx
import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)

  // const handleCardClick = (promptText) => {
  //   onSent(promptText);
  // }

  const handleSend = () => {
    if (input.trim()) {
      onSent();
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      onSent();
    }
  }

  return (
    <div className='main'>
      <div className="nav">
        <p>gemini</p>
        <img src={assets.user_icon} alt="user" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Shraddha</span></p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              {/* <div className="card" onClick={() => handleCardClick("Suggest beautiful places to see on an upcoming road trip")}>
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="compass" />
              </div> */}

              {/* <div className="card" onClick={() => handleCardClick("Briefly summarize this concept: urban planning")}>
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="bulb" />
              </div> */}

              {/* <div className="card" onClick={() => handleCardClick("Brainstorm team bonding activities for our work retreat")}>
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="message" />
              </div> */}

              {/* <div className="card" onClick={() => handleCardClick("Improve the readability of the following code")}>
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="code" />
              </div> */}
            </div>
          </>
        ) : (
          <div className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt="user" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="gemini" />
              {loading ? (
                <div className='loader'>
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search">
            <input 
              onChange={(e) => setInput(e.target.value)} 
              value={input} 
              type="text" 
              placeholder='Enter a prompt here' 
              onKeyPress={handleKeyPress}
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery" />
              <img src={assets.mic_icon} alt="mic" />
              {input ? (
                <img onClick={handleSend} src={assets.send_icon} alt="send" style={{cursor: 'pointer'}} />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main