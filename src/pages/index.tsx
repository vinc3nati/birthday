import Home from "@/components/Home";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  return (
    <main className={`h-screen overflow-hidden relative ${inter.className}`}>
      <Home />
    </main>
  );
}
