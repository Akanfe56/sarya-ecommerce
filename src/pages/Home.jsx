import React from "react";
import Container from "../components/shared/Container";
import Trending from "../components/Trending";
import Featured from "../components/Featured";
import Latest from "../components/Latest";

function Home() {
  return (
    <Container>
      <div className={"text-center my-8 font-sans space-y-5 "}>
        <h2 className="text-3xl uppercase font-bold"> Welcome to <span className="text-[#D8F1A0]">Sarya’s Store!</span></h2>
        <p className="text-[18px] text-center font-semibold">
          Step into a world of elegance where fragrances, wristwatches, and
          fashion come together in perfect harmony. At Sarya’s Store, we believe
          in offering quality, style, and affordability—crafted to help you look
          and feel your best. Thank you for choosing us; your journey in style
          begins here. 💫
        </p>
      </div>

      <Trending />
      <Featured />
      <Latest />
    </Container>
  );
}

export default Home;
