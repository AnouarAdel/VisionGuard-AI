import { Link } from 'react-scroll';

function Header() {
  const linkProps = {
    spy: true,
    smooth: true,
    duration: 500,
    offset: -100,
    className: "hover:text-blue-600 transition-colors cursor-pointer"
  };

  return (
    // We remove the 'my-6' class from here.
    <nav className="w-full max-w-7xl mx-auto bg-white border border-slate-200 rounded-xl shadow-md flex items-center justify-between p-4 z-50 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-3">
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
        <h1 className="text-xl font-bold text-blue-600">
          VisionGuard AI
        </h1>
      </div>
      <div className="hidden md:flex items-center space-x-6 text-slate-600 font-medium">
        <Link to="how-it-works" {...linkProps}>
          How It Works
        </Link>
        <Link to="about-stages" {...linkProps}>
          About The Stages
        </Link>
        <Link to="disclaimer" {...linkProps}>
          Disclaimer
        </Link>
      </div>
    </nav>
  );
}

export default Header;