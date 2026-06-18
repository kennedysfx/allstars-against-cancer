import GlobalFooter from "@/components/GlobalFooter";
import GlobalHeader from "@/components/GlobalHeader";
import "./globals.css"; // or whatever your global stylesheet is called

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalHeader />
        
        {/* This main tag ensures your content areas push the footer down naturally */}
        <main style={{ flex: 1 }}>
          {children}
        </main>
        
        <GlobalFooter />
      </body>
    </html>
  );
}