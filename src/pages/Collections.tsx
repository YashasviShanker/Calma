import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../styles/Collections.css';

const Collections: React.FC = () => {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);
  }, []);

  const collections = [
    {
      id: 1,
      name: 'Spring/Summer 2025',
      image: '/images/spring-collection.jpg',
      description: 'Embrace the warmth with our latest collection featuring lightweight fabrics and vibrant patterns.',
      items: 24
    },
    {
      id: 2,
      name: 'Essentials',
      image: '/images/essentials.jpg',
      description: 'Timeless pieces that form the foundation of every wardrobe.',
      items: 18
    },
    {
      id: 3,
      name: 'Winter Elegance',
      image: '/images/winter-collection.jpg',
      description: 'Sophisticated winter wear combining comfort with style.',
      items: 20
    },
    {
      id: 4,
      name: 'Urban Comfort',
      image: '/images/urban-collection.jpg',
      description: 'Modern streetwear with a focus on comfort and versatility.',
      items: 16
    }
  ];

  return (
    <div className="collections-page">
      <CSSTransition
        in={inProp}
        timeout={1000}
        classNames="fade"
      >
        <header className="collections-header">
          <h1>Our Collections</h1>
          <p>Discover our carefully curated collections</p>
        </header>
      </CSSTransition>

      <TransitionGroup className="collections-container">
        {collections.map((collection, index) => (
          <CSSTransition
            key={collection.id}
            in={inProp}
            timeout={1000 + index * 200}
            classNames="fade-up"
          >
            <div className="collection-item">
              <div className="collection-image">
                <img src={collection.image} alt={collection.name} />
                <div className="collection-overlay">
                  <Link to={`/collections/${collection.id}`} className="view-button">
                    View Collection
                  </Link>
                </div>
              </div>
              <div className="collection-info">
                <h2>{collection.name}</h2>
                <p>{collection.description}</p>
                <span className="items-count">{collection.items} Items</span>
              </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Collections; 