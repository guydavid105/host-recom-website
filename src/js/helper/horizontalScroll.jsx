import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// import "./output.css";

// using tailwind css 
const HorizontalScroll = () => {

  return (
    <div className="bg-neutral-800">
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-white">
        Gallery View   &nbsp;
        </span>
        <span className="font-semibold uppercase text-neutral-500">
         [Scroll down]
        </span>
      </div>
      <HorizontalScrollCarousel />
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </div>
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/people/recomm/test/476376617723');
        const data = await response.json();
        setJsonData(data);
        // console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
             <div>
    {/* {jsonData ? (
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    ) : (
      <p>Loading...</p>
    )} */}
    </div>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
        
        {jsonDataFixed.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
          {/* {jsonData.map((card) => {
            return <Card card={card} key={card.id} />;
          })} */}
          {/* {jsonData ? (
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    ) : (
       
    )} */}
        </motion.div>
      </div>
    </section>
  );
};



const Card = ({ card }) => {

  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          // backgroundImage: `url(${"./asset/movie.jpg"})`,
          backgroundColor: "black",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      >
        <img src={card.img} 
        alt={card.title} 
        className="hidden"/>
      </div>
      <div className="absolute inset-0 z-10 grid place-content-center"
           onClick={() => popup(card)}
      >
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

const popup = (card) => {
  alert("Cool! " + card.title + " is a great choice!\n\
  Please press the below button to Exit. Thank you! ⬇️")    
}

export default HorizontalScroll;

const jsonDataFixed = [{"id":706083,"type":"movie","title":"Wonka","img":"https://a.ltrbxd.com/resized/film-poster/7/0/6/0/8/3/706083-wonka-0-500-0-750-crop.jpg"},{"id":764890,"type":"movie","title":"The Iron Claw","img":"https://a.ltrbxd.com/resized/film-poster/7/6/4/8/9/0/764890-the-iron-claw-2023-0-500-0-750-crop.jpg"},{"id":724394,"type":"movie","title":"The Exorcist: Believer","img":"https://a.ltrbxd.com/resized/film-poster/7/2/4/3/9/4/724394-the-exorcist-believer-0-500-0-750-crop.jpg"},{"id":835774,"type":"movie","title":"Saltburn","img":"https://a.ltrbxd.com/resized/film-poster/8/3/5/7/7/4/835774-saltburn-0-500-0-750-crop.jpg"},{"id":301552,"type":"movie","title":"Ferrari","img":"https://a.ltrbxd.com/resized/film-poster/3/0/1/5/5/2/301552-ferrari-2023-0-500-0-750-crop.jpg"},{"id":503402,"type":"movie","title":"Mission: Impossible – Dead Reckoning Part One","img":"https://a.ltrbxd.com/resized/film-poster/5/0/3/4/0/2/503402-mission-impossible-dead-reckoning-part-one-0-500-0-750-crop.jpg"},{"id":715856,"type":"movie","title":"Beau Is Afraid","img":"https://a.ltrbxd.com/resized/film-poster/7/1/5/8/5/6/715856-beau-is-afraid-0-500-0-750-crop.jpg"},{"id":868491,"type":"movie","title":"Air","img":"https://a.ltrbxd.com/resized/film-poster/8/6/8/4/9/1/868491-air-2023-0-500-0-750-crop.jpg"},{"id":721333,"type":"movie","title":"Cocaine Bear","img":"https://a.ltrbxd.com/resized/film-poster/7/2/1/3/3/3/721333-cocaine-bear-0-500-0-750-crop.jpg"},{"id":558056,"type":"movie","title":"Knock at the Cabin","img":"https://a.ltrbxd.com/resized/film-poster/5/5/8/0/5/6/558056-knock-at-the-cabin-0-500-0-750-crop.jpg"},{"id":465649,"type":"movie","title":"M3GAN","img":"https://a.ltrbxd.com/resized/film-poster/4/6/5/6/4/9/465649-m3gan-0-500-0-750-crop.jpg"},{"id":63058,"type":"movie","title":"Avatar: The Way of Water","img":"https://a.ltrbxd.com/resized/film-poster/6/3/0/5/8/63058-avatar-the-way-of-water-0-500-0-750-crop.jpg"},{"id":782545,"type":"movie","title":"Sanctuary","img":"https://a.ltrbxd.com/resized/film-poster/7/8/2/5/4/5/782545-sanctuary-2022-0-500-0-750-crop.jpg"},{"id":908010,"type":"movie","title":"How to Blow Up a Pipeline","img":"https://a.ltrbxd.com/resized/film-poster/9/0/8/0/1/0/908010-how-to-blow-up-a-pipeline-0-500-0-750-crop.jpg"},{"id":542001,"type":"movie","title":"Bros","img":"https://a.ltrbxd.com/resized/film-poster/5/4/2/0/0/1/542001-bros-0-500-0-750-crop.jpg"}];

const cards = [
  {
    img: "asset/book.jpg",
    title: "Book",
    id: 1,
  },
  {
    img: "asset/movie.jpg",
    title: "Movie",
    id: 2,
  },
  {
    img: "asset/music.jpg",
    title: "Music",
    id: 3,
  },
  {
    img: "asset/book.jpg",
    title: "Book",
    id: 4,
  },
  {
    img: "asset/movie.jpg",
    title: "Movie",
    id: 5,
  },
  {
    img: "asset/music.jpg",
    title: "Music",
    id: 6,
  },  
  {
    img: "asset/book.jpg",
    title: "Book",
    id: 7,
  },
  {
    img: "asset/movie.jpg",
    title: "Movie",
    id: 8,
  }
  // ,
  // {
  //   url: "asset/music.jpg",
  //   title: "Music",
  //   id: 9,
  // }
];


