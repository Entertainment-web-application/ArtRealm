import video from "../video/video (1080p).mp4";
import { HashLink } from 'react-router-hash-link';
import Ratedsection from "../Components/Ratedsection";
import Allcard from "../Components/Allcard";
import Stats from "../Components/stats";
export default function Home() {
  return (
    <>
    <section className="relative flex flex-col items-center justify-end text-center text-white" style={{ height: "700px" }}>
    <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
      <video
        className="min-w-full min-h-full absolute object-cover"
        src={video}
        type="video/mp4"
        autoPlay={true}
        muted={true}
        loop={true}
      />
    </div>
    <div className="video-content space-y-2 z-10 pb-5" style={{ height: "55vh" }}>
      <h1 className="font-bold text-5xl uppercase text-red-500">Welcome to Masterpiece</h1>
      <h3 className="font-bold text-2xl capitalize">Unleash your creativity with our cutting-edge art supplies</h3>
      <div className="rounded-md shadow mt-10">
        <HashLink smooth={true} to="#food">
          <button className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mt-5">
            Shop Now
          </button>
        </HashLink>
      </div>
    </div>
  </section>
  <Ratedsection/>
  <Allcard/>
  <Stats />
    </>
  );
}
