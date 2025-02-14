import React from 'react';

const links = [ 
  { href: "https://www.youtube.com/watch?v=tybOi4hjZFQ", title: "Wim HOF Breathing" },
  { href: "https://www.youtube.com/watch?v=hEypv90GzDE", title: "NSDR 20 min" },
  { href: "https://chatgpt.com", title: "ChatGPT" },
  { href: "https://livebench.ai", title: "Leaderboard IA" },
  { href: "https://mail.google.com/mail/u/0/#inbox", title: "Gmail" },
  { href: "https://0593102b.index-education.net/pronote/", title: "Pronote" },
];

export default function LinkContainer() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block border rounded-lg p-6 shadow-md hover:shadow-xl hover:bg-black hover:scale-105 transition-all duration-300  transition duration-300"
        >
          <h2 className="text-white text-s font-bold text-center">{link.title}</h2>
        </a>
      ))}
    </div>
  );
}
