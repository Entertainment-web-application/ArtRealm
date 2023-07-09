import React from 'react';
import { HashLink } from 'react-router-hash-link';
import Ratedsection from '../Components/Ratedsection';
import Allcard from '../Components/Allcard';
import Stats from '../Components/stats';
import Footer from '../Components/Footer';
import Navbar from "../Components/Navbar";

import Seactionmore from '../Components/Seactionmore';

import video from '../video/pexels-taryn-elliott-6214489 (2160p).mp4';

export default function Home() {
  return (
    <>
    <Navbar />
      <section className="relative flex flex-col items-center justify-end text-center text-white" style={{ height: '700px' }}>
        <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
          <video
            className="min-w-full min-h-full absolute object-cover"
            src={video}
            type="video/mp4"
            autoPlay
            muted
            loop
            style={{ filter: 'brightness(60%)' }} // Apply the brightness filter to darken the video
          />
        </div>
        <div className="video-content space-y-2 z-10 pb-5" style={{ height: '55vh' }}>
          <h1 style={{ color: 'white', fontSize: '60px', fontWeight: '600' }}>Welcome to ArtRealm</h1>
          <h3 style={{ color: 'white', fontSize: '30px', fontWeight: '500' }}>Explore the Art Realm with our cutting-edge art supplies</h3>          <HashLink smooth to="#food">
          <div className="mt-6">
          <a href="#_" className="relative px-8 py-4 font-medium text-white group">
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12" />
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12" />
            <span className="absolute bottom-0 left-0 hidden w-16 h-32 transition-all duration-100 ease-out transform -translate-x-12 translate-y-16 bg-purple-600 -rotate-12" />
            <span className="absolute bottom-0 right-0 hidden w-16 h-32 transition-all duration-100 ease-out transform translate-x-16 translate-y-12 bg-purple-400 -rotate-12" />
            <span className="relative">Post Now</span>
          </a>
        </div>
        
        
        
          </HashLink>
        </div>
      </section>
      <Ratedsection />
      <Seactionmore/>
      <Allcard />
      <Stats />
      <Footer />

    </>
  );
}
