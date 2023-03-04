import { CgFilters, CgSize } from "react-icons/cg";
import "./about.css";
import img1 from "./papa.jpeg";
import Prenavbar from "./Prenavbar";
import Nav from "./nav.js";
import { ImWhatsapp } from "react-icons/im";
import { SiGmail } from "react-icons/si";
function About() {
  return (
    <>
      <div>
        <Prenavbar />

        <div
          className="k"
          style={{
            height: "750px",
            width: "100%",
            backgroundImage: `url("https://i.pinimg.com/564x/a9/36/d4/a936d41bdf5346bc2176e91782234487.jpg")`,
            backgroundSize: "100% 100%",
            zIndex: "-1",
            position: "relative",
            backgroundCovered: "cover",
            filter: "blur(8px)",
          }}
        ></div>
      </div>
      <div className="y ">
        <div className="bg">
          <div>
            <h1 className="head">About Us</h1>
            <h1 className="head-1">
              Shivam enterprise provides service in 3 branches located in Surat,
              Rajkot and Dhoraji
            </h1>
          </div>
          <div className="head-2">
            <h2>The branch in dhoraji was established in 2010</h2>
          </div>
          <div className="head-3">
            we offer customer best quality product with minimal price range
          </div>
          <div className="head-51">
            <div className="head-5">
              <img src={img1} alt="" />
            </div>
            <div className="head-52">
            owner of the dhorji branch<br/>
              Name:sinojiya Alpeshbhai.<br/>
              <SiGmail /> gmail : shivamenterise@gmail.com<br/>
              <ImWhatsapp />phone:7041309004
            </div>
          </div>
          <div className="head-6">
          <h5>Our service is provided in the following cities dhoraji<br/> junagad,supedi,upleta,keshod,vadal,bhayavadar,motivavdi.
                
              </h5>
               <h5>thank you for visiting website</h5>
            </div>
            </div>
        </div>
   
    </>
  );
}
export default About;
