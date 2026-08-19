import { motion } from 'motion/react';

export default function BotanicalDivider() {
  return (
    <div className="flex justify-center items-center py-12 opacity-30 pointer-events-none">
      <svg width="320" height="40" viewBox="0 0 320 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M160 20C170 10 190 10 200 20C210 30 230 30 240 20M80 20C90 10 110 10 120 20C130 30 150 30 160 20" stroke="#4d7a3a" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="160" cy="20" r="2" fill="#A64166" />
        <circle cx="40" cy="20" r="1" fill="#4d7a3a" />
        <circle cx="280" cy="20" r="1" fill="#4d7a3a" />
      </svg>
    </div>
  );
}
