import type { Metadata } from "next"
import Cart from "../components/Cart"
import Navbar from "../components/Navbar"
import { CartProvider } from "../lib/CartContext"
import "./globals.css"

export const metadata: Metadata = {
  title: "Jellit - Turn Any Liquid Into Jelly Magic",
  description: "The powder that makes your drinks hit different. Jello shots just leveled up.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <Cart />
        </CartProvider>
      </body>
    </html>
  )
}
