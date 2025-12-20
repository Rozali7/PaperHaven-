import React, { useState } from "react";
import "../styles/About.css";

export default function About(){
  const [open, setOpen] = useState("history"); // default open
// track 
  const Item = ({id, title, children}) => (
    //if its open add class open 
    <div className={`acc ${open===id ? "open":""}`}>
      <button className="acc-head" onClick={()=>setOpen(open===id ? "" : id)}>
        <span>{title}</span>
        {/* when the user clicks the button if open ->close and vise versa  */}
        <span className="chev">{open===id ? "–" : "+"}</span>
      </button>
      <div className="acc-body">
        <div className="acc-inner">{children}</div>
      </div>
    </div>
  );

  return (
    <section className="section about">
      <div className="container">
        <h1>About PaperHaven</h1>
        <p className="lead">
          PaperHaven was founded by <strong>John Miller</strong> — a reader who dreamed of a digital
          haven where books feel calm, personal, and beautifully curated. What began as a small shelf
          of recommendations grew into a platform designed for comfort and discovery.
        </p>

        <div className="pill-grid">
          <div className="pill card">
            <h3>Curation</h3>
            <p>Every title is hand-picked for depth, clarity, and the kind of pages that linger.</p>
          </div>
          <div className="pill card">
            <h3>Creativity</h3>
            <p>We treat books as living art — crafted, presented, and read with care.</p>
          </div>
          <div className="pill card">
            <h3>Comfort</h3>
            <p>Soft layouts, warm design, and a flow that lets the story do the talking.</p>
          </div>
        </div>

        <h2 className="mt">Want to know more?</h2>
        <div className="accordion">
          <Item id="history" title="Our History">
            Started in 2022, PaperHaven began as a small online collection for friends. Word spread,
            shelves grew, and we built a calm interface that readers could trust.
          </Item>
          <Item id="vision" title="Our Vision">
            To make reading a serene daily ritual — where discovery is simple and design gets out of
            the way of the page.
          </Item>
          <Item id="promise" title="Our Promise">
            We stand by thoughtful curation, reliable quality, and stories you’ll remember.
          </Item>
        </div>
      </div>
    </section>
  );
}




