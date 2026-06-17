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
          <p className="text-sm max-w-md leading-relaxed ">
            Subscribe to get exclusive access to new product drops, technical insights, and premium offers.
          </p>
        </div>

        <div className="flex flex-row items-center gap-3 w-full max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="flex-1 px-5 py-3 rounded-full bg-primary-800/70 dark:bg-primary-100 text-white dark:text-primary-900 placeholder:text-primary-500 dark:placeholder:text-primary-500 text-sm outline-none focus:ring-2 focus:ring-white/20 dark:focus:ring-primary-300 transition hover:cursor-pointer"
          />
          <button className="px-6 py-3 rounded-full bg-white dark:bg-primary-700 text-primary-900 dark:text-white text-sm font-semibold hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors whitespace-nowrap">
            Subscribe
          </button>
        </div>

      </div>
    </section>
  );
}