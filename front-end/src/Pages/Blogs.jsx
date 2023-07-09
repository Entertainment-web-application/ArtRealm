import Posts from "../Components/Posts";
import AddPost from "../Components/AddPost";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
export default function Blog() {
  return (
    <>
      <div>
      <Navbar />
        <AddPost />
        <Posts />
        <Footer />
      </div>
    </>
  );
}
