// app/layout.tsx
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>CRUD App</title>
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          {/* Navbar */}
          <nav className="bg-blue shadow-md p-4 flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              {/* Icon */}
              <div className="bg-pink-600 text-white p-2 rounded-full">
                <span className="material-icons">O</span>
              </div>
              {/* App Title */}
              <span className="text-2xl font-extrabold text-gray-800">CRUD</span>
            </div>

            {/* Navigation Links */}
            <div className="flex gap-6 text-gray-600 text-lg">
              <a
                href="/"
                className="hover:text-blue-500 transition duration-200"
              >
                Product List
              </a>
              <a
                href="/add"
                className="hover:text-blue-500 transition duration-200"
              >
                Create Product
              </a>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 container mx-auto p-6">{children}</main>
        </div>
        <div className="text-red-500 text-xl font-bold">Hello Tailwind!</div>

      </body>
    </html>
  );
}
