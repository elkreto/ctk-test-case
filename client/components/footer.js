import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="w-full h-20 bg-slate-800">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link target="_blank" href="https://github.com/elkreto">
                  <h4>Created by Stanisław Pachnik</h4>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
