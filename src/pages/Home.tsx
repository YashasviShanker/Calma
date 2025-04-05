import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import '../styles/Home.css';

const Home: React.FC = () => {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <CSSTransition
        in={inProp}
        timeout={1000}
        classNames="fade"
      >
        <section className="hero-section">
          <div className="hero-content">
            <h1>CALMA</h1>
            <p>Timeless Elegance, Modern Comfort</p>
            <Link to="/collections" className="cta-button">
              Explore Collections
            </Link>
          </div>
        </section>
      </CSSTransition>

      {/* Featured Collections */}
      <section className="featured-collections">
        <CSSTransition
          in={inProp}
          timeout={1000}
          classNames="fade-up"
        >
          <h2>Featured Collections</h2>
        </CSSTransition>
        <div className="collections-grid">
          <CSSTransition
            in={inProp}
            timeout={1000}
            classNames="fade-scale"
          >
            <div className="collection-card">
              <img src="/images/spring-collection.jpg" alt="Spring Collection" />
              <h3>Spring/Summer 2025</h3>
              <Link to="/collections/spring-summer-2025">View Collection</Link>
            </div>
          </CSSTransition>
          <CSSTransition
            in={inProp}
            timeout={1000}
            classNames="fade-scale"
          >
            <div className="collection-card">
              <img src="/images/essentials.jpg" alt="Essentials Collection" />
              <h3>Essentials</h3>
              <Link to="/collections/essentials">View Collection</Link>
            </div>
          </CSSTransition>
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview">
        <CSSTransition
          in={inProp}
          timeout={1000}
          classNames="slide-right"
        >
          <div className="about-content">
            <h2>Our Story</h2>
            <p>CALMA represents the perfect harmony between contemporary design and timeless elegance. Each piece is crafted with attention to detail and commitment to sustainability.</p>
            <Link to="/about" className="learn-more-button">Learn More</Link>
          </div>
        </CSSTransition>
        <CSSTransition
          in={inProp}
          timeout={1000}
          classNames="slide-left"
        >
          <div className="about-image">
            <img src="/images/about-preview.jpg" alt="About CALMA" />
          </div>
        </CSSTransition>
      </section>

      {/* Latest Products */}
      <section className="latest-products">
        <CSSTransition
          in={inProp}
          timeout={1000}
          classNames="fade-up"
        >
          <h2>Latest Arrivals</h2>
        </CSSTransition>
        <div className="products-grid">
          {[1, 2, 3].map((item, index) => (
            <CSSTransition
              key={item}
              in={inProp}
              timeout={1000 + index * 200}
              classNames="fade-up"
            >
              <div className="product-card">
                <img src={`/images/product-${item}.jpg`} alt={`Product ${item}`} />
                <h3>Product Name</h3>
                <p>$199.99</p>
                <Link to={`/products/${item}`} className="view-product">View Details</Link>
              </div>
            </CSSTransition>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home; 