"use client";

import Link from "next/link";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";

export default function NavLink({ children, href }) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={clsx(classes.link, path.startsWith(href) && classes.active)}
    >
      {children}
    </Link>
  );
}
