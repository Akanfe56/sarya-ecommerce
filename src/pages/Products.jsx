import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import Container from "../components/shared/Container";
import ProductItems from "../components/ProductItems";
import Tab from "./Tab";

function Products() {
  const { product } = useContext(ProductContext);
  return (
    <Container>
      <div className={"text-center my-8 font-sans space-y-5"}>
        <h2 className="text-3xl uppercase font-bold">
          Our Products  <span className="text-[#D8F1A0]">at Sarya’s Store</span>
        </h2>
        <p className="text-[18px] text-center font-semibold">
          Discover a unique collection of fragrances, wristwatches, and fashion
          pieces designed to inspire confidence and style. Each product is
          carefully selected for its quality, elegance, and
          affordability—crafted to complement your lifestyle. 💫
        </p>
      </div>
      <div className="]">
        <Tab />
      </div>
      <div className="parent grid sm:grid md:grid-cols-2 lg:grid-cols-4 gap-3 mt-7">
        {product.map((items) => (
          <ProductItems key={items.id} items={items} />
        ))}
      </div>
    </Container>
  );
}

export default Products;
