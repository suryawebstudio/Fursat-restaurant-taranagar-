import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, Clock3, Instagram, MapPin, Menu as MenuIcon, Phone, Play, Sparkles, Star, X } from "lucide-react";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const images = {
  interior: asset("gallery/interior-dining-room.jpg"),
  room: asset("gallery/interior-counter.jpg"),
  tandoori: asset("gallery/menu-tandoori-rice.jpg"),
  curries: asset("gallery/menu-curries.jpg"),
  shakes: asset("gallery/menu-shakes-waffle.jpg"),
};

type MenuItem = { name: string; description: string; price: string };
// Transcribed directly from Fursat's physical menu cards — real dishes, real prices.
// description is only used for a genuine bracketed note printed on the menu (e.g. "8pcs", "White Gravy");
// nothing here is an invented tasting note.
const menuData: Record<string, MenuItem[]> = {
  Tandoori: [
    { name: "Paneer Tikka", description: "", price: "200" },
    { name: "Paneer Malai Tikka", description: "", price: "230" },
    { name: "Hara Bhara Kabab", description: "", price: "170" },
    { name: "Tandoori Chaap", description: "", price: "200" },
    { name: "Achari Chap", description: "", price: "210" },
    { name: "Malai Chaap", description: "", price: "230" },
    { name: "Afghani Chaap", description: "", price: "230" },
    { name: "Masala Chaap", description: "", price: "210" },
    { name: "Tandoori Momos", description: "", price: "150" },
    { name: "Afghani Momos", description: "", price: "150" },
    { name: "Chatpati Momos", description: "", price: "150" },
    { name: "Mushroom Tikka", description: "", price: "250" },
    { name: "Mushroom Malai Tikka", description: "", price: "270" },
    { name: "Tandoori Platter", description: "", price: "300" },
    { name: "Tandoori Aloo", description: "", price: "200" },
    { name: "Achari Paneer", description: "", price: "220" },
    { name: "Paneer Hariyali Tikka", description: "", price: "250" },
    { name: "Afghani Paneer", description: "", price: "250" },
    { name: "Plan Rice", description: "", price: "70" },
    { name: "Jeera Rice", description: "", price: "100" },
    { name: "Veg Pulav", description: "", price: "120" },
    { name: "Matar Pulav", description: "", price: "120" },
    { name: "Veg Biryani", description: "", price: "110" },
  ],
  Chinese: [
    { name: "Momoj", description: "8pcs", price: "120" },
    { name: "Honey Chilli Potato", description: "", price: "180" },
    { name: "Chilli Potato", description: "", price: "160" },
    { name: "Manchurian Dry", description: "", price: "160" },
    { name: "Manchurian Gravy", description: "", price: "140" },
    { name: "Chilli Paneer Dry", description: "", price: "230" },
    { name: "Chilli Paneer Gravy", description: "", price: "200" },
    { name: "Spring Roll", description: "", price: "150" },
    { name: "Veg Fried Rice", description: "", price: "120" },
    { name: "Chilli Manchurian Dry", description: "", price: "170" },
    { name: "Chilli Manchurian Gravy", description: "", price: "150" },
    { name: "Schezwan Rice", description: "", price: "140" },
    { name: "Singapuri Noodles", description: "", price: "130" },
    { name: "Veg Noodle", description: "", price: "120" },
    { name: "Chilli Garlic Noodles", description: "", price: "140" },
    { name: "Hakka Noodles", description: "", price: "150" },
    { name: "Crispy Corn", description: "", price: "150" },
    { name: "Dahi Kabab", description: "", price: "150" },
    { name: "Veg Bucket", description: "", price: "160" },
    { name: "Mushroom Chilly", description: "", price: "200" },
    { name: "Green Salad", description: "", price: "80" },
    { name: "Onion Salad", description: "", price: "60" },
    { name: "Green Kuchumber Salad", description: "", price: "100" },
  ],
  Curries: [
    { name: "Lashun Chatni", description: "", price: "100" },
    { name: "Aloo Pyaj Sabji", description: "", price: "120" },
    { name: "Aloo Jeera", description: "", price: "120" },
    { name: "Dal Tadka", description: "", price: "140" },
    { name: "Dal Makhani", description: "", price: "180" },
    { name: "Dal Fry", description: "", price: "150" },
    { name: "Seasonal Sabji", description: "", price: "150" },
    { name: "Sev Bhaji", description: "", price: "180" },
    { name: "Aloo Matar", description: "", price: "150" },
    { name: "Chana Masala", description: "", price: "180" },
    { name: "Mix Veg", description: "", price: "180" },
    { name: "Mater Paneer", description: "", price: "200" },
    { name: "Palak Paneer", description: "", price: "200" },
    { name: "Paneer Do Pyaja", description: "", price: "220" },
    { name: "Kadhai Paneer", description: "", price: "240" },
    { name: "Handi Paneer", description: "", price: "240" },
    { name: "Paneer Butter Masala", description: "", price: "240" },
    { name: "Paneer Lababdar", description: "", price: "220" },
    { name: "Shahi Paneer", description: "", price: "200" },
    { name: "Paneer Bhurji", description: "", price: "250" },
    { name: "Malai Kofta", description: "", price: "220" },
    { name: "Kaju Kari", description: "", price: "280" },
    { name: "Chaap Masala", description: "", price: "220" },
    { name: "Kadai Chaap", description: "", price: "250" },
    { name: "Tawa Paneer", description: "", price: "240" },
    { name: "Tawa Chaap", description: "", price: "240" },
    { name: "Paneer Angara Spicy", description: "", price: "250" },
    { name: "Paneer Pasanda", description: "White Gravy", price: "250" },
    { name: "Veg Jalfrezi", description: "", price: "220" },
    { name: "Veg Khazana", description: "", price: "250" },
    { name: "Sev Tamater", description: "", price: "200" },
    { name: "Kadhai Mushroom Spicy", description: "", price: "280" },
    { name: "Mushroom Do Pyaza", description: "", price: "300" },
  ],
  Breads: [
    { name: "Tawa Roti", description: "", price: "10" },
    { name: "Tawa Roti Butter", description: "", price: "15" },
    { name: "Tandoori Roti", description: "", price: "10" },
    { name: "Tandoori Butter Roti", description: "", price: "15" },
    { name: "Plain Naan", description: "", price: "25" },
    { name: "Butter Naan", description: "", price: "40" },
    { name: "Garlic Naan", description: "", price: "60" },
    { name: "Lachha Paratha", description: "", price: "50" },
    { name: "Missi Roti", description: "", price: "20" },
    { name: "Stuff Naan", description: "", price: "60" },
    { name: "Pyaj/Gobhi/Aloo Paratha", description: "", price: "50" },
    { name: "Mix Paratha", description: "", price: "50" },
    { name: "Paneer Paratha", description: "", price: "60" },
    { name: "Pyaj Roti", description: "", price: "30" },
    { name: "Mix Raita", description: "", price: "80" },
    { name: "Boondi Raita", description: "", price: "60" },
    { name: "Plan Curd", description: "", price: "50" },
    { name: "Plan Half Curd", description: "", price: "30" },
  ],
  Snacks: [
    { name: "Vegetable Sandwich", description: "", price: "60" },
    { name: "Vegetable Grill Sandwich", description: "", price: "80" },
    { name: "Paneer Sandwich", description: "", price: "100" },
    { name: "Corn + Cheese Sandwich", description: "", price: "80" },
    { name: "Butter Toast", description: "", price: "50" },
    { name: "Mix Vegetable Pakora", description: "", price: "80" },
    { name: "Paneer Pakora", description: "", price: "150" },
    { name: "Plan Papad", description: "", price: "30" },
    { name: "Masala Papad", description: "", price: "60" },
    { name: "Peanut Masala", description: "", price: "80" },
    { name: "French Fries", description: "Salted", price: "80" },
    { name: "Cheese French Fries", description: "", price: "100" },
    { name: "Peri-peri French Fries", description: "", price: "100" },
    { name: "Plan Maggi", description: "", price: "50" },
    { name: "Masala Maggi", description: "", price: "70" },
    { name: "Corn Chat", description: "", price: "80" },
    { name: "Chana Chat", description: "", price: "80" },
    { name: "Veg Cocktail Kabab", description: "", price: "140" },
    { name: "Veg Cutlate", description: "", price: "150" },
    { name: "Pavbhaji", description: "", price: "80" },
    { name: "Red Sauce Pasta", description: "", price: "120" },
    { name: "White Sauce Pasta", description: "", price: "150" },
  ],
  Pizza: [
    { name: "Aloo Tikki", description: "", price: "50" },
    { name: "Masala Veg Tikki", description: "", price: "70" },
    { name: "Paneer Burger", description: "", price: "80" },
    { name: "Cheese Burger", description: "", price: "80" },
    { name: "Extra Cheese", description: "", price: "20" },
    { name: "Peri-Peri Burger", description: "", price: "80" },
    { name: "O.T.C. Pizza", description: "", price: "140" },
    { name: "Margherita Pizza", description: "", price: "150" },
    { name: "Sweet Corn Pizza", description: "", price: "180" },
    { name: "Paneer Tikka Pizza", description: "", price: "200" },
    { name: "Peri-Peri Pizza", description: "", price: "200" },
  ],
  Beverages: [
    { name: "Tea", description: "", price: "30" },
    { name: "Hot Coffee", description: "", price: "50" },
    { name: "Hot Milk", description: "", price: "30" },
    { name: "Cold Coffee", description: "", price: "80" },
    { name: "Namkin Chhach", description: "", price: "40" },
    { name: "Lassi Sweet", description: "", price: "80" },
    { name: "Regular Cold Coffee", description: "", price: "80" },
    { name: "Choco Chips Frappe", description: "", price: "100" },
    { name: "Cold Coffee With Icecream", description: "", price: "100" },
    { name: "Hazelnut Frappe", description: "", price: "140" },
    { name: "Caramel Frappe", description: "", price: "160" },
    { name: "Iced Latte", description: "", price: "120" },
    { name: "Hazelnut Iced Latte", description: "", price: "140" },
    { name: "Affogato", description: "", price: "120" },
    { name: "Lemon Soda", description: "", price: "60" },
    { name: "Mint Mojito", description: "", price: "80" },
    { name: "Orange Mojito", description: "", price: "100" },
    { name: "Blue Lagoon", description: "", price: "100" },
    { name: "Pineapple Mojito", description: "", price: "120" },
    { name: "Black Currant Mojito", description: "", price: "140" },
    { name: "Spicy Mango", description: "", price: "120" },
    { name: "Spicy Guava", description: "", price: "120" },
    { name: "Water Melon Mojito", description: "", price: "120" },
  ],
  Shakes: [
    { name: "Chocolate Shake", description: "", price: "120" },
    { name: "Strawberry Shake", description: "", price: "140" },
    { name: "Pineapple Shake", description: "", price: "120" },
    { name: "Vanilla Shake", description: "", price: "100" },
    { name: "Oreo Shake", description: "", price: "140" },
    { name: "Kitkat Shake", description: "", price: "140" },
    { name: "White Chocolate Waffle", description: "", price: "140" },
    { name: "Strawberry Waffle", description: "", price: "160" },
    { name: "Biscova Waffle", description: "", price: "150" },
    { name: "Milk Chocolate Waffle", description: "", price: "120" },
    { name: "Extra Ice Cream Scoop", description: "", price: "30" },
  ],
};
const tabs = Object.keys(menuData);
const gallery = [
  { src: images.interior, title: "The Fursat room", className: "gallery-tall" },
  { src: images.room, title: "Settle in, stay awhile", className: "gallery-wide" },
  { src: images.tandoori, title: "Fresh from the tandoor", className: "gallery-square" },
  { src: images.curries, title: "Indian comfort, thoughtfully made", className: "gallery-wide" },
  { src: images.shakes, title: "Something sweet", className: "gallery-square" },
];
// Note: 7 more real photos (columns/dining shots + the appetizers, chinese, coffee/mojito
// and breads/raita menu cards) live in /client/public/gallery but aren't wired in — the
// bento grid above is hard-coded in CSS for exactly 5 tiles (index.css line 149-153).
// Forcing 12 in would break that layout, which you said not to touch.
const testimonials = [
  { quote: "I ordered twice — the momos were good. The food and service both felt looked after.", name: "Pradeep Kumar Swami", meta: "Local Guide" },
  { quote: "It is a best family restaurant in Taranagar. The interior and sitting atmosphere are excellent.", name: "Vansh", meta: "Guest, Taranagar" },
  { quote: "A beautiful new place in town with great vegetarian food and a relaxed atmosphere.", name: "Fursat guests", meta: "Taranagar, Rajasthan" },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Tandoori");
  const [testimonial, setTestimonial] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [people, setPeople] = useState("2 people");
  const [time, setTime] = useState("8:00 PM");
  const activeItems = useMemo(() => menuData[activeTab], [activeTab]);
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };
  const submitReservation = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); setFormSent(true); };

  return <div className="site-shell">
    <header className="site-header">
      <button className="brand-mark" onClick={() => scrollTo("top")} aria-label="Back to top"><span className="brand-sanskrit">फुर्सत</span><span className="brand-name">FURSAT</span></button>
      <nav className="desktop-nav" aria-label="Main navigation"><button onClick={() => scrollTo("about")}>About us</button><button onClick={() => scrollTo("menu")}>Menu</button><button onClick={() => scrollTo("gallery")}>Gallery</button><button onClick={() => scrollTo("stories")}>Reviews</button><button onClick={() => scrollTo("contact")}>Contact</button></nav>
      <div className="header-actions"><a className="header-phone" href="tel:08005981292"><Phone size={14} /> 08005 981292</a><button className="reserve-link" onClick={() => scrollTo("reserve")}>Reserve <ArrowUpRight size={16} /></button><button className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu">{mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}</button></div>
    </header>
    {mobileOpen && <div className="mobile-nav">{[["about", "About us"], ["menu", "Menu"], ["gallery", "Gallery"], ["stories", "Reviews"], ["contact", "Contact"]].map(([id, label]) => <button key={id} onClick={() => scrollTo(id)}>{label}<ArrowUpRight size={16} /></button>)}</div>}

    <main id="top">
      <section className="hero-section"><div className="hero-copy"><p className="eyebrow light-eyebrow"><span /> An upscale vegetarian dining destination</p><h1>Take a little<br /><em>Fursat.</em></h1><p className="hero-intro">Transforming the concept of relaxation with thoughtful vegetarian food, warm interiors and a table where you can savour every moment.</p><div className="hero-cta-row"><button className="primary-button" onClick={() => scrollTo("reserve")}>Book your table <ArrowUpRight size={17} /></button><button className="play-button" onClick={() => scrollTo("about")}><span className="play-circle"><Play size={12} fill="currentColor" /></span> Discover Fursat</button></div><div className="hero-footnote"><span>01</span><span className="footnote-line" /><span>Main Market · Taranagar</span></div></div><div className="hero-image-wrap"><img src={images.interior} alt="Fursat Restaurant interior in Taranagar" className="hero-image" /><div className="hero-overlay" /><div className="hero-image-caption"><span>Vegetarian / Family / Fursat</span><ArrowDownRight size={20} /></div></div><div className="hero-scroll">Scroll to explore <ArrowDownRight size={17} /></div></section>

      <section className="intro-section section-pad" id="about"><div className="section-kicker"><span>01</span><span className="kicker-rule" /><span>Our philosophy</span></div><div className="intro-grid"><div><h2>Good food.<br /><em>Good fursat.</em></h2><div className="accent-stamp"><Sparkles size={20} /><span>Relax<br />and eat</span></div></div><div className="intro-body"><p className="large-copy">Fursat is an upscale vegetarian restaurant in Taranagar, created for the moments that deserve a little more time.</p><p>Come for the tandoor, stay for the coffee, and make an evening of it. From family dinners to a quick plate of momos, our kitchen brings familiar flavours to the table with care.</p><a className="text-link" href="https://www.google.com/maps/search/Fursat+Restaurant+Taranagar+Rajasthan" target="_blank" rel="noreferrer">Find us on Maps <ArrowUpRight size={16} /></a></div></div><div className="intro-image-row"><div className="image-card image-card-main"><img src={images.room} alt="Fursat service counter and dessert display" /><span className="image-note">The counter / 01</span></div><div className="image-card image-card-side"><img src={images.tandoori} alt="Fursat tandoori menu and food" /><span className="image-note">From the kitchen / 02</span></div><div className="vertical-note">Main market, Taranagar <ArrowDownRight size={17} /></div></div></section>

      <section className="menu-section section-pad" id="menu"><div className="section-kicker"><span>02</span><span className="kicker-rule" /><span>From our kitchen</span></div><div className="menu-heading-row"><div><h2>Come hungry.<br /><em>Leave happy.</em></h2></div><div className="menu-heading-note"><p>From smoky tandoori plates to chilled mojitos, there is something for every kind of appetite.</p><span>Fursat favourites</span></div></div><div className="menu-tabs" role="tablist" aria-label="Menu categories">{tabs.map((tab, index) => <button key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)} role="tab" aria-selected={activeTab === tab}><span>0{index + 1}</span>{tab}</button>)}</div><div className="menu-list">{activeItems.map((item, index) => <article className="menu-item" key={item.name}><span className="menu-item-number">0{index + 1}</span><div className="menu-item-copy"><h3>{item.name}</h3><p>{item.description}</p></div><span className="menu-price">₹{item.price}</span><ArrowUpRight className="menu-arrow" size={19} /></article>)}</div><div className="menu-footer"><span>Prices shown from the latest public menu photos · preparation may take 15–20 minutes</span><a className="outline-button" href="https://www.instagram.com/fursat_restaurant_trn/" target="_blank" rel="noreferrer">See latest menu <ArrowUpRight size={17} /></a></div></section>

      <section className="feature-section"><div className="feature-image"><img src={images.curries} alt="Fursat Indian curries" /><div className="feature-image-overlay" /></div><div className="feature-copy"><div className="section-kicker light-kicker"><span>03</span><span className="kicker-rule" /><span>A place to unwind</span></div><h2>Make time<br /><em>for Fursat.</em></h2><p>Family lunch, late coffee, a plate of paneer tikka or an evening that has nowhere else to be — our dining room is made for all of it.</p><a className="primary-button light-button" href="https://wa.me/message/LCIYXFEQOILXM1" target="_blank" rel="noreferrer">Message on WhatsApp <ArrowUpRight size={17} /></a><div className="feature-counter"><span>Vegetarian dining</span><span>●</span><span>Taranagar, Rajasthan</span></div></div></section>

      <section className="gallery-section section-pad" id="gallery"><div className="section-kicker"><span>04</span><span className="kicker-rule" /><span>Inside Fursat</span></div><div className="gallery-heading-row"><h2>Relaxed by<br /><em>design.</em></h2><p>Warm lights, easy chairs, a little music and plates made to be shared.</p></div><div className="gallery-grid">{gallery.map((item, index) => <button key={item.title} className={`gallery-item ${item.className}`} onClick={() => scrollTo("reserve")}><img src={item.src} alt={item.title} /><span className="gallery-item-overlay" /><span className="gallery-item-title">{item.title}<ArrowUpRight size={17} /></span><span className="gallery-item-index">0{index + 1}</span></button>)}</div></section>

      <section className="stories-section" id="stories"><div className="stories-inner section-pad"><div className="section-kicker light-kicker"><span>05</span><span className="kicker-rule" /><span>People say about us</span></div><div className="stories-grid"><div><h2>Good vibes<br /><em>included.</em></h2><div className="rating"><span className="rating-stars">★★★★☆</span><span>4.1 / 5 on Google (9 reviews)</span></div></div><div className="testimonial-card"><span className="quote-mark">“</span><p>{testimonials[testimonial].quote}</p><div className="testimonial-author"><div><strong>{testimonials[testimonial].name}</strong><span>{testimonials[testimonial].meta}</span></div><div className="testimonial-controls"><button onClick={() => setTestimonial((testimonial - 1 + testimonials.length) % testimonials.length)} aria-label="Previous review"><ChevronLeft size={18} /></button><button onClick={() => setTestimonial((testimonial + 1) % testimonials.length)} aria-label="Next review"><ChevronRight size={18} /></button></div></div></div></div></div></section>

      <section className="awards-section section-pad"><div className="section-kicker"><span>06</span><span className="kicker-rule" /><span>Why Fursat</span></div><div className="awards-heading"><h2>Time well<br /><em>spent here.</em></h2><p>A new restaurant for Taranagar — built around comfort, vegetarian food and the simple pleasure of staying a little longer.</p></div><div className="awards-list">{["Authentic vegetarian recipes", "Family-friendly dining room", "Fresh tandoori and Indian plates", "Coffee, shakes and handcrafted mojitos"].map((award, index) => <div className="award-row" key={award}><span>0{index + 1}</span><h3>{award}</h3><Star size={17} fill="currentColor" /></div>)}</div></section>

      <section className="reserve-section" id="reserve"><div className="reserve-visual"><img src={images.shakes} alt="Fursat shakes and desserts" /><div className="reserve-visual-overlay" /><div className="reserve-visual-copy"><span>Reserve your evening</span><h2>A good table<br /><em>is waiting.</em></h2></div></div><div className="reserve-form-wrap"><div className="section-kicker"><span>07</span><span className="kicker-rule" /><span>Plan your visit</span></div><h2>Book your<br /><em>table.</em></h2>{formSent ? <div className="form-success"><Sparkles size={24} /><h3>Your table request is on its way.</h3><p>We’ll call you shortly to confirm your visit to Fursat.</p><button className="text-link" onClick={() => setFormSent(false)}>Make another request <ArrowUpRight size={16} /></button></div> : <form className="reservation-form" onSubmit={submitReservation}><label>I'd like a table for<select value={people} onChange={event => setPeople(event.target.value)}><option>2 people</option><option>3 people</option><option>4 people</option><option>5+ people</option></select><ChevronDown size={16} /></label><div className="form-row"><label>Date<input type="date" required defaultValue="2026-09-20" /></label><label>Time<select value={time} onChange={event => setTime(event.target.value)}><option>7:00 PM</option><option>8:00 PM</option><option>9:00 PM</option><option>9:30 PM</option></select></label></div><label>Your name<input type="text" placeholder="Your full name" required /></label><label>Phone number<input type="tel" placeholder="+91" required /></label><button className="primary-button dark-button" type="submit">Request a table <ArrowUpRight size={17} /></button></form>}<div className="hours-note"><Clock3 size={17} /><span>Open daily<br /><strong>Until 10:00 PM</strong></span></div></div></section>
    </main>

    <footer className="site-footer" id="contact"><div className="footer-top"><div className="footer-brand"><span className="brand-sanskrit">फुर्सत</span><span className="brand-name">FURSAT</span><p>Transforming the concept<br />of relaxation.</p></div><div className="footer-column"><span className="footer-label">Visit us</span><a href="https://www.google.com/maps/search/Fursat+Restaurant+Taranagar+Rajasthan" target="_blank" rel="noreferrer">Main Market <ArrowUpRight size={14} /></a><p>Taranagar, Rajasthan<br />331304, India</p><a href="https://www.google.com/maps/search/Fursat+Restaurant+Taranagar+Rajasthan" target="_blank" rel="noreferrer"><MapPin size={14} /> Get directions</a></div><div className="footer-column"><span className="footer-label">Get in touch</span><a href="tel:08005981292">08005 981292</a><a href="mailto:fursatrestraunt@gmail.com">fursatrestraunt@gmail.com</a><span className="social-row"><a href="https://www.instagram.com/fursat_restaurant_trn/" aria-label="Instagram"><Instagram size={18} /></a><a href="https://www.facebook.com/p/Fursat-Restaurant-Taranagar-61593031641819/" aria-label="Facebook"><span className="facebook-f">f</span></a></span></div><div className="footer-column footer-cta"><span className="footer-label">Keep exploring</span><button onClick={() => scrollTo("menu")}>Explore the menu <ArrowUpRight size={15} /></button><a href="https://wa.me/message/LCIYXFEQOILXM1" target="_blank" rel="noreferrer">WhatsApp us <ArrowUpRight size={15} /></a></div></div><div className="footer-bottom"><span>© 2026 Fursat Restaurant</span><span>Family restaurant · Taranagar</span><button onClick={() => scrollTo("top")}>Back to top <ArrowUpRight size={14} /></button></div></footer>
  </div>;
}
