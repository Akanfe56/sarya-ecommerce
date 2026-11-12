import { Link } from "react-router";

const collections = [
  { title: "Fragrances", image: "/img/p6.jpg", href: "/tab1" },
  { title: "Wristwatches", image: "/img/W3.jpg", href: "/tab2" },
  { title: "Clothing", image: "/img/c1.jpg", href: "/tab3" },
  { title: "Footwear", image: "/img/S1.jpg", href: "/tab4" },
];

function Tab() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {collections.map((collection) => (
        <Link
          key={collection.title}
          to={collection.href}
          className="group relative isolate min-h-48 overflow-hidden rounded-2xl bg-[#0B0500] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#75694f] focus:ring-offset-2"
        >
          <img
            src={collection.image}
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0B0500]/90 via-[#0B0500]/30 to-transparent" />
          <div className="flex min-h-48 items-end justify-between gap-3 p-5 text-white">
            <span className="text-xl font-semibold">{collection.title}</span>
            <span className="rounded-lg bg-[#D8F1A0] px-3 py-2 text-sm font-semibold text-[#0B0500] transition group-hover:bg-white">
              Browse
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Tab;
