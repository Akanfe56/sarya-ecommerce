import { useContext, useMemo } from "react";
import { Link } from "react-router";
import ProductItems from "./ProductItems";
import { ProductContext } from "../context/ProductContext";

const categories = [
  { key: "fragrances", title: "Top fragrances", href: "/tab1", note: "Scent, made personal" },
  { key: "watches", title: "Top wristwatches", href: "/tab2", note: "Time well chosen" },
  { key: "clothing", title: "Top clothing", href: "/tab3", note: "Everyday pieces for everyone" },
  { key: "footwear", title: "Top footwear", href: "/tab4", note: "Easy steps, any style" },
];

function TopCategoryPicks() {
  const { product } = useContext(ProductContext);
  const picksByCategory = useMemo(() => {
    const priority = (item) =>
      Number(Boolean(item.featured)) * 4 +
      Number(Boolean(item.trending)) * 2 +
      Number(Boolean(item.latest));

    return Object.fromEntries(
      categories.map(({ key }) => [
        key,
        product
          .filter((item) => item.category === key)
          .slice()
          .sort((a, b) => priority(b) - priority(a))
          .slice(0, 5),
      ])
    );
  }, [product]);

  return (
    <div className="space-y-14 md:space-y-16">
      {categories.map(({ key, title, href, note }) => {
        const picks = picksByCategory[key] || [];
        if (!picks.length) return null;

        return (
          <section key={key} aria-labelledby={`top-${key}-heading`}>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#75694f]">
                  Unisex edit · {note}
                </p>
                <h2 id={`top-${key}-heading`} className="text-2xl font-bold text-[#0B0500] md:text-3xl">
                  {title}
                </h2>
              </div>
              <Link to={href} className="text-sm font-semibold text-[#75694f] underline underline-offset-4 transition hover:text-[#0B0500]">
                Shop all
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {picks.map((item) => <ProductItems key={item.id} items={item} />)}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default TopCategoryPicks;
