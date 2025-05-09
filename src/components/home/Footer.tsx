
const Footer = () => {
  return (
    <footer className="bg-red-900 text-amber-200 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-xl mb-4 text-amber-400">KickGhana</h3>
          <p className="mb-4 text-sm text-amber-100">Premium footwear with authentic Ghanaian style and quality craftsmanship.</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Shopping</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="nav-link text-amber-200 hover:text-amber-400">All Products</a></li>
            <li><a href="#" className="nav-link text-amber-200 hover:text-amber-400">New Arrivals</a></li>
            <li><a href="#" className="nav-link text-amber-200 hover:text-amber-400">Sales</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Help</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="nav-link text-amber-200 hover:text-amber-400">FAQ</a></li>
            <li><a href="#" className="nav-link text-amber-200 hover:text-amber-400">Shipping</a></li>
            <li><a href="#" className="nav-link text-amber-200 hover:text-amber-400">Returns</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>Phone: +233 20 123 4567</li>
            <li>Email: info@kickghana.com</li>
            <li>Accra Mall, Ghana</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-amber-900/50 text-center text-sm">
        <p>© 2025 KickGhana. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
