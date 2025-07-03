import React from 'react';
import { Bot } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="nav flex items-center justify-center h-[90px] bg-zinc-900 px-[100px]">
      <div className="logo flex items-center gap-[10px]">
        <Bot size={50} color="#2563eb" />
        <span className="text-2xl bold text-white ml-2">coditor</span>
      </div>
    </div>
  );
};

export default Navbar;
