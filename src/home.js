import React from "react";
import Prenavbar from './Prenavbar';
import Nav from './nav.js';
import Slider from './Slider.js';
import data from './data'
import Line from './line.js';
import Offers from './offers.js';
import Lastbar from './lastbar.js';

function Home() {
  return (
    <div>
      <Prenavbar />
      <Nav />
      <Slider />
      <Line />
      <Offers offer={data.offer} />
      <Lastbar />
    </div>
  );
}

export default Home;
