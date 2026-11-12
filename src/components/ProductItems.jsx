import { useContext } from "react";
import { Link } from "react-router";
import { FaShoppingCart } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";
import productData from "../Data/ProductData";

function ProductItems({ items }) {
  const { addToCart } = useContext(ProductContext);
  const localProduct = productData.find(
    (product) => String(product.id) === String(items?.id)
  );
  const fallbackImage = localProduct?.img || "/img/p3.jpg";
  const productImage = localProduct?.img || items?.img || items?.image || fallbackImage;
  const imageSrc = /^(https?:|data:|blob:)/i.test(productImage) || productImage.startsWith("/")
    ? productImage
    : `/${productImage}`;

  return (
    <article className="product-card-motion group relative mx-auto w-full overflow-hidden rounded-2xl border border-[#e9e5dc] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <img
        src={imageSrc}
        className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-56"
        alt={items?.name}
        loading="lazy"
        onError={(event) => {
          const image = event.currentTarget;
          if (image.dataset.fallbackApplied) {
            image.style.visibility = "hidden";
            return;
          }
          image.dataset.fallbackApplied = "true";
          image.src = fallbackImage;
        }}
      />
      <span className="absolute left-3 top-3 rounded-full bg-[#D8F1A0] px-3.5 py-2 text-sm font-bold text-[#0B0500] shadow-md">
        ${Number(items?.price || 0).toLocaleString("en-US")}
      </span>
      <div className="space-y-3 p-4 sm:p-5">
        <h3 className="line-clamp-1 text-base font-semibold text-[#0B0500] sm:text-lg">
          {items?.name}
        </h3>
        <p className="line-clamp-2 min-h-10 text-sm leading-5 text-gray-600">
          {items?.description}
        </p>
        <div className="flex items-center gap-2 pt-1">
          <Link
            to={`/details/${items?.id}`}
            className="flex-1 rounded-lg bg-[#0B0500] px-3 py-2.5 text-center text-sm font-semibold text-[#D8F1A0] transition hover:bg-[#292016] focus:outline-none focus:ring-2 focus:ring-[#75694f] focus:ring-offset-2"
          >
            View product
          </Link>
          <button
            type="button"
            aria-label={`Add ${items?.name} to cart`}
            onClick={() => addToCart(items?.id, 1, items)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d8d1c5] text-[#0B0500] transition hover:bg-[#D8F1A0] focus:outline-none focus:ring-2 focus:ring-[#75694f] focus:ring-offset-2"
          >
            <FaShoppingCart aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductItems;
