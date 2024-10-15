import Link from "next/link";

type NavItem = {
  text: string;
  link: string;
};

type HeaderProps = {
  navItems: NavItem[];
};

export function Header({ navItems }: HeaderProps) {
  console.log("Header navItems:", navItems); // Keep this log for debugging

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link className="text-2xl font-bold text-gray-800" href="/">
          Your Logo
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {navItems && navItems.length > 0 ? (
              navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                    href={item.link}
                  >
                    {item.text}
                  </Link>
                </li>
              ))
            ) : (
              <li>No navigation items</li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
