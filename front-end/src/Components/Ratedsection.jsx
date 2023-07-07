import  { useEffect, useState } from 'react';
import axios from 'axios';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import Rating from '@material-ui/lab/Rating';
import "pure-react-carousel/dist/react-carousel.es.css";
export default function Ratedsection() {
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    fetchPaintings();
  }, []);

  const fetchPaintings = async () => {
    try {
      const response = await axios.get('http://localhost:3500/Paintings/getPaintings'); // Assuming your API endpoint is '/api/paintings'
      setPaintings(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
<>
<div className="header py-4 dark:bg-gray-700">
  <p className="text-center text-sm font-bold text-blue-500">PRICING</p>
  <h1 className="text-4xl md:text-4xl text-center text-gray-700 dark:text-white font-extrabold">
    Get Lifetime Access
  </h1>
  <p className="max-w-2xl text-gray-500 dark:text-white text-center md:mx-auto mx-4 mt-4 text-sm md:text-lg">
    Get Early access to premium components and all the additional benefits. Get
    1-year updates for all the components and additional updates we release.
  </p>
</div>

<div className="container mx-auto px-8">
<div className="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4">
    {/* Carousel for desktop and large size devices */}
    <CarouselProvider
    className="lg:block hidden"
    naturalSlideWidth={90}
    isIntrinsicHeight={true}
    totalSlides={paintings.length}
    visibleSlides={5}
    step={2}
    infinite={true}
  >        <div className="w-full relative flex items-center justify-center">
            <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
            <svg width={16} height={28} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          
            </ButtonBack>
            <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
            <Slider>
            <div id="slider" className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
              {paintings.map((painting, index) => (

                <Slide index={index} key={index}>
                  <div className="flex flex-shrink-0 relative w-full sm:w-auto">
<img
  src={painting.imageurl}
  alt={painting.painting_name}
  className="object-cover object-center"
  style={{ width: '300px', height: '350px' }}
/>
                    <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                      <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white">
                      {painting.painting_name}

                      </h2>
                      <div className="flex h-full items-end pb-6">
                        <h3 className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white"><Rating name="half-rating-read" defaultValue={painting.rate
                      } precision={0.5} readOnly /></h3>
                      </div>
                    </div>
                  </div>
                </Slide>
              ))}
            </div>
          </Slider>
          

            </div>
            <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
            <svg width={16} height={28} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          
          
            </ButtonNext>
        </div>
    </CarouselProvider>

    {/* Carousel for tablet and medium size devices */}
    <CarouselProvider className="lg:hidden md:block hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={12} visibleSlides={2} step={1} infinite={true}>
        <div className="w-full relative flex items-center justify-center">
            <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
                <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </ButtonBack>
            <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
          



            <Slider>
            <div id="slider" className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
              {paintings.map((painting, index) => (
                <Slide index={index} key={index}>
                  <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                    <img src={painting.imageurl} alt={painting.painting_name} className="object-cover object-center w-full" />
                    <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                      <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white">{painting.painting_name}</h2>
                      <div className="flex h-full items-end pb-6">
                        <h3 className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white">{painting.painting_name}</h3>
                      </div>
                    </div>
                  </div>
                </Slide>
              ))}
            </div>
          </Slider>



            </div>
            <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </ButtonNext>
        </div>
    </CarouselProvider>

    {/* Carousel for mobile and Small size Devices */}
    <CarouselProvider className="block md:hidden " naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={12} visibleSlides={1} step={1} infinite={true}>
        <div className="w-full relative flex items-center justify-center">
            <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
                <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </ButtonBack>
            <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
             
            <Slider>
            <div id="slider" className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
              {paintings.map((painting, index) => (
                <Slide index={index} key={index}>
                  <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                    <img src={painting.imageurl} alt={painting.painting_name} className="object-cover object-center w-full" />
                    <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                      <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white">{painting.painting_name}</h2>
                      <div className="flex h-full items-end pb-6">
                        <h3 className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white">{painting.painting_name}</h3>
                      </div>
                    </div>
                  </div>
                </Slide>
              ))}
            </div>
          </Slider>


            </div>
            <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </ButtonNext>
        </div>
    </CarouselProvider>
</div>
</div>
</>
  );
}
