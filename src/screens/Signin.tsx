import tiltedLogo from '../assets/tilted_logo.svg';
// import backgroundImage from '../assets/back.svg';
import message from '../assets/icons/message.svg';
import lock from '../assets/icons/lock.svg';
import eyes from '../assets/icons/eyes.svg';
import creator from '../assets/creator.svg';
import crystalUp from '../assets/cristal_up.svg';
import crystalDown from '../assets/cristal_down.svg';
import back from '../assets/back.svg';
import { colorCodes } from '../helper/contant';
import { useNavigate } from "react-router-dom";

function Signin() {

  const navigate = useNavigate();

  return (
    <div className="login" >
      <img src={back} alt="backgroundimage" style={{position:"absolute"}} />
      <div className="overlap-wrapper">

        <div className="overlap">

          <div className="form">

            <img className="image" src={tiltedLogo} />
            <div className="input">

              <div className="input-field"  >
                <div className="input-label">
                  <div className="input-master"  style={{backgroundColor:colorCodes.darkgrey}}>
                    <img className="img" src={message} />
                    <input className="placeholder-text" style={{border:'none'}} placeholder="Email" type="email" />
                  </div>
                </div>
              </div>

              <div className="input-field">
                <div className="input-label">
                  <div className="input-master" style={{backgroundColor:"#2f334c"}}>
                    <img className="img" src={lock} />
                    <div className="text-wrapper" style={{color:'white'}}>*********</div>
                    <img className="img" src={eyes} />
                  </div>
                </div>
              </div>

              <div className="button-text" style={{color:'white'}}>
                <div className="label-text-button">Forgot Password</div>
              </div>

            </div>

            <div className="signin-button" style={{backgroundColor:colorCodes.secondary}} onClick={()=>navigate('/dashboard')}>
              <div className="label-text-button" style={{color:'white'}}>Sign In</div>
            </div>

          </div>

          <div className="frame">
            <img className="image-2" src={creator} />
            <div className="overlap-group">
              <div className="text-wrapper-2" style={{fontSize:30,maxWidth:'250px'}}>Welcome to Gaming Universe</div>
              
              <img className="vector" src={crystalUp} />
              <img className="vector-2" src={crystalDown} />
            </div>
            <p className="from-ideas-to" style={{color:"#9b87ff"}}>From Ideas to Realities.<br />Where Assets Make the Magic Happen</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Signin;