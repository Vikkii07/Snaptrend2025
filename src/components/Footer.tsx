const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* SnapTrend Logo / Heading */}
        <div>
          <h2 className="text-xl font-semibold">SnapTrend</h2>
          <p className="text-sm text-gray-400 mt-2">
            Helping creators repurpose content effortlessly.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-sm font-semibold mb-2 text-gray-300">Services</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>AI Video Repurposing</li>
            <li>Auto-Caption</li>
            <li>Split Screen Tool</li>
            <li>AI Video Generator</li>
            <li>AI Image Generator</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm font-semibold mb-2 text-gray-300">Support</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>FAQs</li>
            <li>Contact Support</li>
            <li>Email: <span className="underline">snaptrend2005@gmail.com</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} SnapTrend. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
