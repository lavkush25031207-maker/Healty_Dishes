import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, WalletCards } from 'lucide-react'
import { assetUrl } from '../utils/assetUrl'

export default function Footer() {
  return <footer className="legacy-footer" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.27),rgba(0,0,0,.48)), url("${assetUrl('/images/footer1.jpg')}")` }}>
    <div className="legacy-footer-grid">
      <div className="legacy-brand"><img src={assetUrl('/images/footer_logo.png')} alt="Healthy Dishes" /><p>Embark on an Authentic Pan-Asian Journey</p></div>
      <div className="legacy-links"><Link to="/">Home</Link><Link to="/#story">Our Story</Link><Link to="/menu">Menu</Link><Link to="/book-table">Catering</Link><a href="#contact">Franchise</a></div>
      <div className="legacy-contact" id="contact"><a href="tel:+919311456456"><Phone /> +91 9311 456 456</a><a href="mailto:hello@houseofwok.in"><Mail /> hello@houseofwok.in</a><Link to="/checkout"><WalletCards /> Pay for your order</Link><p><MapPin /> Culinary Stories Private Limited</p><p className="address">D-1 Second Floor, Defence Colony, New Delhi-110024</p></div>
      <div className="legacy-action"><Link to="/menu">Order Now</Link><div className="social-row"><span>ig</span><span>f</span><span>in</span></div></div>
    </div>
    <div className="legacy-copyright"><div><a href="#terms">Terms of Service</a><a href="#privacy">Privacy Policy</a><a href="#refund">Refund Policy</a></div><p>All rights reserved. Copyright © 2019–{new Date().getFullYear()}, Healthy Dishes by Culinary Stories Private Limited</p></div>
  </footer>
}
