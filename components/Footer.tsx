import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          {[
            { name: "Twitter", icon: Twitter, href: "#" },
            { name: "GitHub", icon: Github, href: "#" },
            { name: "LinkedIn", icon: Linkedin, href: "#" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-zinc-400 hover:text-primary-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </Link>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-zinc-500">
            &copy; 2026 អិនអេសអិម តិចណូឡូជី។ រក្សាសិទ្ធិគ្រប់យ៉ាង
          </p>
        </div>
      </div>
    </footer>
  );
}
