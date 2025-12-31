// @ts-nocheck
import React from 'react';
import './styles.scss';


const HomeLayout = () => (
  <main className="home-layout">
    {/* 1. Single column: Slider */}
    <section className="slider-section">
      <div className="slider-placeholder">Slider Placeholder</div>
    </section>

    {/* 2. Single column: 3 offset boxes inside a full-width box */}
    <section className="offset-boxes-section">
      <div className="offset-boxes-wrapper">
        <div className="offset-boxes-bg">
          <div className="offset-boxes-row">
            <div className="offset-box">Box 1</div>
            <div className="offset-box">Box 2</div>
            <div className="offset-box">Box 3</div>
          </div>
        </div>
      </div>
    </section>

    {/* 3. Single column: Full width box */}
    <section className="full-width-section">
      <div className="full-width-box">Full Width Box 1</div>
    </section>

    {/* 4. Single column: Full width box */}
    <section className="full-width-section">
      <div className="full-width-box">Full Width Box 2</div>
    </section>

    {/* 5. Double column: 4 left, 4 right */}
    <section className="double-column-section">
      <div className="double-column-grid">
        <div className="column left">
          <div className="double-box">Left 1</div>
          <div className="double-box">Left 2</div>
          <div className="double-box">Left 3</div>
          <div className="double-box">Left 4</div>
        </div>
        <div className="column right">
          <div className="double-box">Right 1</div>
          <div className="double-box">Right 2</div>
          <div className="double-box">Right 3</div>
          <div className="double-box">Right 4</div>
        </div>
      </div>
    </section>

    {/* 6. Triple column: 1 per column */}
    <section className="triple-column-section">
      <div className="triple-column-grid">
        <div className="triple-box">Triple 1</div>
        <div className="triple-box">Triple 2</div>
        <div className="triple-box">Triple 3</div>
      </div>
    </section>

    {/* 7. Double column: 2 per column */}
    <section className="double-column-section">
      <div className="double-column-grid">
        <div className="column left">
          <div className="double-box">Left A</div>
          <div className="double-box">Left B</div>
        </div>
        <div className="column right">
          <div className="double-box">Right A</div>
          <div className="double-box">Right B</div>
        </div>
      </div>
    </section>
  </main>
);

export default HomeLayout;
