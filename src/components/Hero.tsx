// import rocket from "../assets/images/rocket.png";
import isro from "../assets/ISRO-Color.svg";
import { useNavigate } from "react-router-dom";
import "../css/Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  // return (
  //   <div className="container my-5">
  //     <div className="row">
  //       <div className="col d-flex justify-content-center align-items-center">
  //         <div className="content">
  //           <h1 className="text-dark">Waste Management</h1>
  //           <div className="tagline d-flex justify-content-center my-3">
  //             <p className="text-secondary">Towards a greener planet</p>
  //           </div>
  //           <div className="buttons d-flex justify-content-center">
  //             <button className="btn btn-primary p-2 mx-2 w-50" onClick={handleSignIn}>Login</button>
  //             <button className="btn btn-secondary p-2 mx-2 w-50">
  //               Sign-up
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="col">
  //         <img src={isro} width={400} height={400}></img>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <>
      <div className="main d-flex flex-column justify-content-center align-items-center">
        <div className="logo">
          <img src={isro} alt="logo" width={150} height={150} />
        </div>
        <div className="display-4">
          <h1 className="display-4">Solid Motor Propellant Complex</h1>
        </div>
        <div className="subheading">
          <h2 className="display-4 lead">
            Residual Propellant Management System
          </h2>
        </div>
        <div className="buttons d-flex justify-content-center">
          {/* <button
            className="btn btn-primary p-2 mx-2"
            onClick={handleSignIn}
            style={{width:"200px", margin: "30px"}}
          >
            Login
          </button> */}

          <button className="learn-more my-4" onClick={handleSignIn}>
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">Get Started</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
