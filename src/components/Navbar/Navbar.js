import React from "react";

const Navbar = () => {
  return (
    <nav className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-lg font-semibold text-gray-800">
              <img src="/logo.png" alt="Logo" className=" h-12 w-auto" />
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <button className="border-2 border-gray-600 px-6 py-2 rounded-full text-white">
              Entrar
            </button>
            <button className="flex gap-2 bg-main-400 hover:bg-main-500 text-white font-semibold rounded-full px-6 py-2 justify-center items-center">
              Criar conta
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
