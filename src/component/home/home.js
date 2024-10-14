import React from 'react'
import './home.css'
import { useNavigate } from "react-router-dom";
import chatImage from "../../images/BlogImage_Chat.jpg"

function Home() {
  const navigate = useNavigate();
  const homePage = () => {
    navigate("/");
  }

  const chatPage = () => {
    navigate("/chat");
  }

  return (
    <>
      <div className='main_home'>
        <div className='home_main_div' onClick={homePage()}>Home</div>
        <div className='chat_main_div' onClick={chatPage}>Chat</div>
      </div>
      <div>
      <img src={chatImage} className='img_home'/>
      </div>
    </>

  )
}

export default Home