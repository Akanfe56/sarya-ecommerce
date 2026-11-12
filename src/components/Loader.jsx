function Loader() {
  return (
    <main className="brand-loader" role="status" aria-live="polite" aria-label="Loading SaRya Store">
      <div className="brand-loader-emblem" aria-hidden="true">
        <span className="brand-loader-mark">S</span>
        <span className="brand-loader-sparkle">✦</span>
      </div>
      <p className="brand-loader-name">SaRya</p>
      <p className="brand-loader-tagline">Everyday, elevated.</p>
      <div className="brand-loader-caption">
        <span>Opening your store</span>
        <span className="brand-loader-dots" aria-hidden="true"><i /><i /><i /></span>
      </div>
    </main>
  );
}

export default Loader;
