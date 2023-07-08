import React, { useEffect, useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import {
  StarIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

export default function Allcard() {
  const [paintings, setPaintings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPaintings();
  }, []);

  const fetchPaintings = async () => {
    try {
      const response = await axios.get('http://localhost:3500/Paintings/getPaintings');
      setPaintings(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPaintings = paintings.filter((painting) => {
    if (selectedCategory !== 'all' && painting.category !== selectedCategory) {
      return false;
    }

    if (searchQuery.trim() !== '') {
      const paintingName = painting.painting_name.toLowerCase();
      const search = searchQuery.toLowerCase();

      return paintingName.includes(search);
    }

    return true;
  });

  return (
    <>
      <div className="main">
        <div className="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
          {/* hero */}
          <div className="hero">
            {/* hero headline */}
            <div className="header py-4 dark:bg-gray-700 mt-5">
  <p className="text-center text-lg font-bold text-purple-600">Painting Collections</p>
  <h1 className="text-4xl md:text-4xl text-center text-gray-700 dark:text-white font-extrabold">
   Explore the World of Paintings
  </h1>
  <p className="max-w-2xl text-gray-500 dark:text-white text-center md:mx-auto mx-4 mt-4 text-sm md:text-lg">
  Discover a vast collection of high-quality paintings created by talented artists from around the world.   </p>
</div>

            {/* image search box */}
            <div className="box pt-6">
              <div className="box-wrapper">
                <div className="bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-200">
                  <button className="outline-none focus:outline-none">
                    <svg
                      className="w-5 text-gray-600 h-5 cursor-pointer"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <input
                          type="search"
                    name=""
                    id=""
                    placeholder="search for paintings"
                    className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"
                    style={{ border: 'none' }}
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <div className="select">
                    <select
                      name=""
                      id=""
                      className="text-sm outline-none focus:outline-none bg-transparent"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                    >
                      <option value="all">All</option>
                      <option value="Realism">Realism</option>
                      <option value="Landscape">Landscape</option>
                      <option value="Still Life">Still Life</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br /> <br /> <br />

      <div className="container mx-auto px-16">
        <div className="flex flex-wrap -mx-4">
          {filteredPaintings.map((painting) => (
            <div key={painting.id} className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
              <Card className="w-full max-w-[19rem] shadow-lg h-[450px] ">
                <CardHeader floated={false} color="blue-gray">
                  <img
                    src={painting.imageurl}
                    alt="ui/ux review check"
                    style={{ height: '250px' }}
                  />
                  <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                  <IconButton
                    size="sm"
                    color="red"
                    variant="text"
                    className="!absolute top-4 right-4 rounded-full"
                  >
                    <HeartIcon className="h-6 w-6" />
                  </IconButton>
                </CardHeader>
                <CardBody>
                  <div className="mb-3 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray" className="font-medium">
                      {painting.painting_name}
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="flex items-center gap-1.5 font-normal"
                    >
                      <StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                      {painting.rate}
                    </Typography>
                  </div>
                  <Typography color="gray" style={{ overflowWrap: 'break-word', maxHeight: 'none', fontWeight: 'normal' }}>
                    {painting.description}
                  </Typography>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}







// <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
      
// {paintings.map((painting) => (
//     <a
//       key={painting.id}
//       href="#"
//       className="block w-60 border border-gray-300 rounded-md p-2"
//     >
//       <img
//         alt="Art"
//         src={painting.imageurl}
//         className="h-40 w-full sm:w-60 object-cover"
//       />
//       <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl" style={{ wordWrap: 'break-word' }}>
//         {painting.painting_name}
//       </h3>
//       <p className="mt-2 max-w-sm text-gray-700" style={{ wordWrap: 'break-word' }}>{painting.category}</p>
//       <p className="mt-2 max-w-sm text-gray-700">
//         <Rating
//           name="half-rating-read"
//           value={painting.rate}
//           precision={0.5}
//           readOnly
//         />
//       </p>
//     </a>
//   ))}
// </div>




