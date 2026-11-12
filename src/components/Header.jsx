import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiMenu, FiMoon, FiSearch, FiShoppingBag, FiSun, FiX } from "react-icons/fi";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { ProductContext } from "../context/ProductContext";
import { AuthContext } from "../context/AuthContext";
import { logoutUser } from "../services/api/users";

function Header({ theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useContext(AuthContext);
  const { cartItems, searchQuery, HandleSearch } = useContext(ProductContext);
  const cartCount = cartItems?.products?.length || 0;
  const isAuthenticated = state?.accessToken != null;
  const navigate = useNavigate();

  const logout = async (event) => {
    event.preventDefault();
    try {
      await logoutUser();
    } catch (error) {
      console.error("Could not end the Supabase session:", error);
    } finally {
      localStorage.removeItem("auth-token");
      dispatch({ type: "setToken", payload: null });
      setIsOpen(false);
      navigate("/login");
    }
  };

  const submitSearch = (event) => {
    event.preventDefault();
    setIsOpen(false);
    navigate("/products");
  };

  const renderSearchForm = (mobile = false) => (
    <form
      role="search"
      onSubmit={submitSearch}
      className={`site-search flex items-center gap-2 rounded-full border px-4 transition focus-within:ring-2 focus-within:ring-[#D8F1A0] ${mobile ? "w-full" : "w-64 lg:w-72"}`}
    >
      <label className="sr-only" htmlFor={mobile ? "mobile-site-search" : "desktop-site-search"}>Search products</label>
      <input
        id={mobile ? "mobile-site-search" : "desktop-site-search"}
        type="search"
        value={searchQuery}
        onChange={(event) => HandleSearch(event.target.value)}
        placeholder="Search products, scents, styles..."
        className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-white/50"
      />
      <button type="submit" aria-label="Show search results" className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#D8F1A0] transition hover:bg-white/10 hover:text-white">
        <FiSearch size={18} aria-hidden="true" />
      </button>
    </form>
  );

  const themeToggle = (
    <button
      type="button"
      onClick={onToggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#D8F1A0] hover:text-[#D8F1A0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F1A0]"
    >
      {theme === "light" ? <FiMoon size={18} aria-hidden="true" /> : <FiSun size={18} aria-hidden="true" />}
    </button>
  );

  const cartLink = (
    <Link to="/cart" aria-label={`Shopping bag, ${cartCount} items`} className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:border-[#D8F1A0] hover:text-[#D8F1A0]">
      <FiShoppingBag size={18} aria-hidden="true" />
      <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D8F1A0] px-1 text-[10px] font-bold text-[#0B0500]">{cartCount}</span>
    </Link>
  );

  const authLink = isAuthenticated ? (
    <button onClick={logout} className="text-sm font-medium text-white/80 transition hover:text-[#D8F1A0]">Log out</button>
  ) : (
    <Link to="/login" aria-label="Log in" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:border-[#D8F1A0] hover:text-[#D8F1A0]">
      <FaArrowRightToBracket size={17} aria-hidden="true" />
    </Link>
  );

  return (
    <header className="site-header sticky top-0 z-40 bg-[#0B0500] text-white shadow-lg shadow-black/10">
      <div className="mx-auto hidden max-w-7xl items-center justify-between gap-7 px-6 py-4 lg:flex">
        <Link to="/" className="group flex shrink-0 items-center gap-3" aria-label="SaRya home">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D8F1A0] font-serif text-xl font-bold text-[#0B0500] transition group-hover:rotate-6">S</span>
          <span>
            <span className="block font-serif text-2xl font-semibold leading-none tracking-wide">SaRya</span>
            <span className="mt-1 block text-[9px] uppercase tracking-[0.24em] text-white/50">Everyday, elevated</span>
          </span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-7 text-sm text-white/75">
            <li><Link className="site-nav-link" to="/">Home</Link></li>
            <li><Link className="site-nav-link" to="/products">Shop</Link></li>
            <li><Link className="site-nav-link" to="/about">Our story</Link></li>
            <li><Link className="site-nav-link" to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          {renderSearchForm()}
          {cartLink}
          {authLink}
          {themeToggle}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:hidden">
        <button type="button" aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
          {isOpen ? <FiX size={21} /> : <FiMenu size={21} />}
        </button>
        <Link to="/" className="flex items-center gap-2" aria-label="SaRya home">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D8F1A0] font-serif text-lg font-bold text-[#0B0500]">S</span>
          <span className="font-serif text-xl font-semibold tracking-wide">SaRya</span>
        </Link>
        <div className="flex items-center gap-2">{cartLink}{themeToggle}</div>
      </div>
      <div className="px-4 pb-3 lg:hidden">
        {renderSearchForm(true)}
      </div>

      {isOpen && <button type="button" aria-label="Close navigation menu" onClick={() => setIsOpen(false)} className="fixed inset-0 z-40 bg-black/60 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[min(84vw,340px)] flex-col bg-[#15110d] p-6 shadow-2xl transition-transform duration-300 lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`} aria-hidden={!isOpen} inert={!isOpen}>
        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
          <span className="font-serif text-2xl">SaRya</span>
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Close navigation menu" className="rounded-full p-2 hover:bg-white/10"><FiX size={22} /></button>
        </div>
        <nav aria-label="Mobile navigation">
          <ul className="space-y-1 text-base">
            {[["Home", "/"], ["Shop all", "/products"], ["Our story", "/about"], ["Contact", "/contact"]].map(([label, path]) => (
              <li key={path}><Link onClick={() => setIsOpen(false)} to={path} className="block rounded-xl px-3 py-3 text-white/80 transition hover:bg-white/5 hover:text-[#D8F1A0]">{label}<span className="float-right text-white/30">↗</span></Link></li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto space-y-4 border-t border-white/10 pt-5">
          <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-white/80"><FiShoppingBag /> Shopping bag <span className="ml-auto rounded-full bg-[#D8F1A0] px-2 py-0.5 text-xs font-bold text-[#0B0500]">{cartCount}</span></Link>
          {isAuthenticated ? <button onClick={logout} className="flex items-center gap-3 text-white/80"><FaArrowRightToBracket /> Log out</button> : <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-white/80"><FaArrowRightToBracket /> Log in or create account</Link>}
        </div>
      </aside>
    </header>
  );
}

export default Header;
