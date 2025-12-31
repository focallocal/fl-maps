// @ts-nocheck
import React from 'react';
import './styles.scss';

const HomeLayout = () => (
  <main className="home-layout">
    {/* Placeholder Slider */}
    <section className="slider-section">
      <div className="slider-placeholder">Slider Placeholder</div>
    </section>

    {/* Columns Section */}
    <section className="columns-section">
      <div className="columns-grid">
        <div className="column-box">Column 1</div>
        <div className="column-box">Column 2</div>
        <div className="column-box">Column 3</div>
      </div>
    </section>
  </main>
);

export default HomeLayout;
