import { ArrowRight, CalendarDays, ChefHat, Leaf, ShoppingBag, Star, Timer } from 'lucide-react'
import { Link } from 'react-router-dom'

const features = [
  { icon: Leaf, title: 'Fresh every day', text: 'Locally sourced vegetables and mindful ingredients.' },
  { icon: ChefHat, title: 'Made to order', text: 'Every bowl is prepared fresh by our chefs.' },
  { icon: Timer, title: 'Quick & reliable', text: 'Fast kitchen, careful packing and live order status.' },
]

const gallery = [
  ['/images/img2.jpg', 'Chilli Garlic Noodles'],
  ['/images/img6.jpg', 'Hot and Sour Soup'],
  ['/images/img3.jpg', 'Tofu Gochujang'],
  ['/images/img1.jpg', 'Shanghai Chicken Dim Sum'],
]

const reviews = [
  ['Prashant', "One of the best and most authentic Asian meals I've had around South Delhi."],
  ['Alice', 'Very good food quality. Super yummy taste and the portions were generous. Loved it!'],
  ['Nisha', 'Leakproof, neat packaging and on-time delivery. The Thai flat rice noodles were fresh, filling and great value for money.'],
  ['Kunal', 'The dim sums reached hot, the chilli oil was excellent and nothing felt overly greasy. Will order again.'],
  ['Lavkush', 'Comforting food, balanced flavours and genuinely helpful staff. Highly recommended for a relaxed dinner.'],
]

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export default function HomePage() {
  return <>
    <section className="hero-section">
      <div className="hero-copy">
        <span className="eyebrow">Fresh Asian kitchen · Delhi</span>
        <h1>Feel good food,<br /><em>full of flavour.</em></h1>
        <p>Wholesome Pan-Asian dishes crafted with fresh ingredients and delivered straight from our wok to your table.</p>
        <div className="hero-actions"><Link className="primary-button" to="/menu"><ShoppingBag size={18} /> Order food</Link><Link className="secondary-button" to="/book-table"><CalendarDays size={18} /> Book a table</Link></div>
        <div className="hero-proof"><span><strong>4.9</strong><span className="stars">★★★★★</span></span><p>Loved by 2,000+ foodies</p></div>
      </div>
      <div className="hero-visual"><img src={assetUrl('/images/img.jpg')} alt="Fresh Asian noodle bowl" /><div className="hero-card"><span>Chef's pick</span><strong>Build your own wok</strong><small>From ₹249</small></div></div>
    </section>

    <section className="feature-strip page-width">{features.map(({ icon: Icon, title, text }) => <article key={title}><Icon /><div><h3>{title}</h3><p>{text}</p></div></article>)}</section>

    <section className="story-section page-width" id="story">
      <div className="story-images"><img src={assetUrl('/images/img5.jpg')} alt="Restaurant dish" /><img src={assetUrl('/images/img4.jpg')} alt="Asian platter" /></div>
      <div className="story-copy"><span className="eyebrow">Our story</span><h2>Big heart.<br />Small-batch cooking.</h2><p>Started by two friends in 2019, Healthy Dishes brings the lively flavours of Asian streets to your neighbourhood. We believe healthy food should never feel boring.</p><p>Our menu balances comfort and nutrition—from handmade dim sum to vibrant noodle bowls.</p><Link className="text-link" to="/menu">Taste our story <ArrowRight size={18} /></Link></div>
    </section>

    <section className="original-section page-width" id="gallery">
      <div className="original-heading"><h2>Our <span>Gallery</span></h2><p>A few favourites from our kitchen</p></div>
      <div className="original-gallery">
        <article className="gallery-lead"><img src={assetUrl('/images/img.jpg')} alt="Make your own Asian food box" /><span>Make Your Own Box</span></article>
        <div className="gallery-grid">{gallery.map(([image, name]) => <article key={name}><img src={assetUrl(image)} alt={name} /><span>{name}</span></article>)}</div>
      </div>
    </section>

    <section className="original-section reviews-section page-width">
      <div className="original-heading"><h2>Review <span>Snippets</span></h2><p>As seen on Zomato</p></div>
      <div className="review-list">{reviews.map(([name, review]) => <article className="review-entry" key={name}><div><h3>{name}</h3><p>{review}</p></div><span className="review-stars">★★★★★</span></article>)}</div>
    </section>

    <section className="original-section media-section page-width">
      <div className="original-heading"><h2>Media <span>Mentions</span></h2><p>Stories and features from around the city</p></div>
      <div className="media-scroll">{['image 40.png','image 42.png','image 43.png','image 44.png'].map((image) => <article key={image}><img src={assetUrl(`/images/${image}`)} alt="Healthy Dishes media feature" /></article>)}</div>
    </section>

    <section className="popular-section"><div className="page-width"><div className="section-heading"><div><span className="eyebrow">Popular right now</span><h2>Your new favourites</h2></div><Link to="/menu">View full menu <ArrowRight size={17} /></Link></div><div className="dish-showcase">
      {[['/images/img2.jpg','Chilli Garlic Noodles','₹279'],['/images/img6.jpg','Hot & Sour Soup','₹189'],['/images/img3.jpg','Tofu Gochujang','₹329']].map(([image,name,price]) => <article key={name}><img src={assetUrl(image)} alt={name} /><div><span><Star size={14} fill="currentColor" /> 4.9</span><h3>{name}</h3><p>{price}</p></div></article>)}
    </div></div></section>

    <section className="booking-cta page-width"><div><span className="eyebrow light">Dine with us</span><h2>Your table is waiting.</h2><p>Plan a quiet dinner or celebrate with your favourite people. We'll take care of the rest.</p></div><Link className="light-button" to="/book-table">Reserve a table <ArrowRight size={18} /></Link></section>
  </>
}
