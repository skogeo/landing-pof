import Link from 'next/link';
import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <header className="p-4 flex justify-between items-center">
        <Link href="/" className="hover:opacity-75 transition-opacity">
          <div className="w-6 h-6 border-2 border-black bg-black"></div>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/about"
                className="text-3xl font-medium hover:underline"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/en/blog"
                className="text-3xl font-medium hover:underline"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contacts"
                className="text-3xl font-medium hover:underline"
              >
                Contacts
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">
          Nextjs landing with Strapi CMS
          <br />
          proof of concept
        </h1>

        <div className="w-full max-w-4xl flex justify-center mb-12">
          <div className="w-1/2 border-t border-black"></div>
        </div>

        <section className="w-full max-w-4xl">
          <p className="text-center text-xl mb-12">
            This is a proof of concept for a landing page using Next.js and
            Strapi CMS. The goal is to show how to build a simple landing page
            with a blog using Strapi as the backend. The blog posts are fetched
            from the Strapi API and displayed on the page.
          </p>
        </section>

        <div className="w-full max-w-4xl flex justify-center mb-12">
          <div className="w-1/2 border-t border-black"></div>
        </div>

        <section className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-black rounded-lg p-4 flex flex-col justify-between"
              >
                <h3 className="text-xl font-semibold mb-4">Title</h3>
                <Link href="#" className="text-right hover:underline">
                  link
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-12 p-4">
        <div className="w-full flex justify-center mb-4">
          <div className="w-1/2 border-t border-black"></div>
        </div>
        <p className="text-center">
          &copy; 2024 Your Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
