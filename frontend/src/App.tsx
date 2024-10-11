import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignUpPage } from "./pages/SignUpPage.tsx"
import { SignInPage } from "./pages/SignInPage.tsx"
import { Blog } from "./pages/Blog"
import { Blogs } from "./pages/Blogs"
import { Publish } from "./pages/Publish"
import { Landing } from "./pages/Landing"
import { Bookmark } from "./pages/Bookmark"
import { Myblogs } from "./pages/Myblogs"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster position="top-center"
  toastOptions={{
    style: {
      
      background: '#333',
      color: '#fff',},
      duration: 4000, // duration in milliseconds
    }}
  />
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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  )
}

export default App
