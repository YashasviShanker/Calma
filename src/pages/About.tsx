import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../styles/About.css';

const About: React.FC = () => {
  const [inProp, setInProp] = React.useState(false);

  useEffect(() => {
    setInProp(true);
  }, []);

  return (
    <div className="about-container">
      <CSSTransition in={inProp} timeout={1000} classNames="fade">
        <section className="hero-section">
          <h1>About Calma</h1>
          <p>Discover the art of luxury through our timeless collections</p>
        </section>
      </CSSTransition>

      <CSSTransition in={inProp} timeout={1000} classNames="slide-up" mountOnEnter>
        <section className="vision-section">
          <h2>Our Vision</h2>
          <p>Creating timeless pieces that blend luxury with sustainability</p>
        </section>
      </CSSTransition>

      <CSSTransition in={inProp} timeout={1000} classNames="slide-up" mountOnEnter>
        <section className="features-section">
          <div className="feature-card">
            <h3>Quality</h3>
            <p>Premium materials and expert craftsmanship</p>
          </div>
          <div className="feature-card">
            <h3>Craftsmanship</h3>
            <p>Handcrafted by skilled artisans</p>
          </div>
          <div className="feature-card">
            <h3>Sustainability</h3>
            <p>Eco-friendly practices and materials</p>
          </div>
        </section>
      </CSSTransition>

      <CSSTransition in={inProp} timeout={1000} classNames="fade" mountOnEnter>
        <section className="cta-section">
          <h2>Join Our Journey</h2>
          <p>Experience luxury that makes a difference</p>
          <button className="cta-button">Shop Now</button>
        </section>
      </CSSTransition>
    </div>
  );
};

export default About; 