import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-transparent text-gray-400 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2">
              <Link href="/" className="flex w-full items-center md:w-auto lg:mr-6">
                <div className="flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black h-[40px] w-[40px] rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Acme Store logo"
                    viewBox="0 0 32 28"
                    className="h-4 w-4 fill-black dark:fill-white h-16px w-16px"
                  >
                    <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z"></path>
                    <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z"></path>
                  </svg>
                </div>
                <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">Acme Store</div>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
            <Link href="/shipping" className="hover:text-white">Shipping & Return Policy</Link>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/FAQ" className="hover:text-white">FAQ</Link>
          </nav>

          {/* Deploy Button */}
          <div className="flex items-start">
            <button className="border border-gray-600 rounded-md px-3 py-1 text-sm hover:bg-gray-800">
              ▲ Deploy
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
          <p>© 2023-2025 ACME, Inc. All rights reserved.</p>
          <p>
            <Link href="https://github.com/DANISHIQBAL77" className="hover:text-white">
              View the source
            </Link>
          </p>
          <p className="mt-1">
            Created by{" "}
            <span className="inline-flex items-center gap-1">
              ▲ <span className="font-medium">Vercel</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
