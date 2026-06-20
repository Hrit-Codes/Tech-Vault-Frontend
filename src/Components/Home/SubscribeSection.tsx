import { useState } from 'react';

export default function SubscribeSection() {
  const [email, setEmail] = useState('');

  return (
    <section className="w-full bg-section py-30 px-6">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 items-center text-center">
        
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold ">
            Stay ahead of the curve.
          </h2>
          <h3 className="text-sm text-gray-700 dark:text-gray-400 max-w-md leading-relaxed ">
            Subscribe to get exclusive access to new product drops, technical insights, and premium offers.
          </h3>
        </div>

        <div className="flex flex-row items-center gap-3 w-full max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="flex-1 px-5 py-3 rounded-full border-2 border-primary-300 dark:border-primary-700 bg-transparent  placeholder:text-black dark:placeholder:text-white text-sm outline-none focus:ring-2 focus:ring-secondary-400 dark:focus:ring-primary-400 transition hover:cursor-pointer"
          />
          <button className="px-6 py-3 rounded-full bg-secondary-400 hover:bg-secondary-500 dark:bg-primary-700 text-white text-sm font-semibold dark:hover:bg-primary-800 transition-colors whitespace-nowrap hover:cursor-pointer">
            Subscribe
          </button>
        </div>

      </div>
    </section>
  );
}