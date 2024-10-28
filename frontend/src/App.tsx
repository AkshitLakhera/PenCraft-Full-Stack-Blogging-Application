import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignUpPage } from "./pages/SignUpPage.tsx"
import { SignInPage } from "./pages/SignInPage.tsx"
import { Blog } from "./pages/Blog"
import { Blogs } from "./pages/Blogs"
import { Publish } from "./pages/Publish"
import { Landing } from "./pages/Landing"
import { Bookmark } from "./pages/Bookmark"
import { Myblogs } from "./pages/Myblogs"
import ContributorPage from "./pages/ContributorPage"
import { ThemeProvider } from "@/components/theme-provider"
import GTranslateLoader from "./components/GTranslateLoader.tsx"

// Lenis - for smooth scrolling
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

function App() {

  // Initialize Lenis
  const lenis = new Lenis();
  lenis.on('scroll', (e) => {
    console.log(e);
  }); // Listen for the scroll event and log the event data
  function raf(time:number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  } // Use requestAnimationFrame to continuously update the scroll
  requestAnimationFrame(raf);


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/myblogs" element={<Myblogs />} />
          <Route path="/contributor" element={<ContributorPage />} />
        </Routes>
      </BrowserRouter>
      <GTranslateLoader />
    </ThemeProvider>

  )
}

export default App
