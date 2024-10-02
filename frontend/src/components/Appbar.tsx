import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import blogwrite from "@/assets/blog.png";
import ribbon from "@/assets/ribbon.png";
import blogs from "@/assets/blogging.png"
import { ModeToggle } from "./mode-toggle";


import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  // MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";

interface AppbarProps {
  onSearch: (query: string) => void;
}
// main appbar code is  here
export const Appbar: React.FC<AppbarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showNavigationBox, setShowNavigationBox] = useState<boolean>(false);
  const navigationBoxRef = useRef<HTMLDivElement>(null);

  const handleAvatarClick = () => {
    console.log("avatarr clicked", showNavigationBox)
    setShowNavigationBox(!showNavigationBox);
  };


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        navigationBoxRef.current &&
        !navigationBoxRef.current.contains(e.target as Node) &&
        showNavigationBox
      ) {
        setShowNavigationBox(false);
      }
    };
    console.log("handleclick outside added")
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      console.log("handle click outside removed")
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigationBoxRef, showNavigationBox]);

  const handleMyblogs = () => {
    navigate("/myblogs")
  }
  const handlePublish = () => {
    navigate("/publish");
  };

  const handleBookmarkClick = () => {
    navigate("/bookmark");
  };

  const handleHomepage = () => {
    navigate("/blogs");
  };

  const authorname = localStorage.getItem("name") ?? "";

  return (

    <div className="w-full flex justify-center py-9">
      <Menubar className="w-full max-w-3xl p-5">
        <MenubarMenu>
          <div className="flex justify-between items-center w-full">
            <h1 className="font-bold text-lg cursor-pointer" onClick={handleHomepage}>PenCraft</h1>
            <div className="flex gap-5 items-center ">
              <div className="max-w-md mx-auto">
                <Input type="text" id="search" placeholder="Search something.." value={searchQuery} onChange={handleSearch} />
              </div>
              <div>
                <ModeToggle />
              </div>
              <div>
                <MenubarTrigger className="p-0">
                  <Avatar className="w-8 h-9 rounded-md">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{authorname ? authorname[0] + authorname[1] : "CN"}</AvatarFallback>
                  </Avatar>

                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <div onClick={handlePublish} className="flex gap-2 items-center">
                      <img src={blogwrite} className="w-9" alt="blog write" />
                      <span>write</span>
                    </div>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <div onClick={handleBookmarkClick} className="flex gap-2 items-center">
                      <img src={ribbon} className="w-9" alt="blog write" />
                      <span>Bookmarks</span>
                    </div>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <div onClick={handleMyblogs} className="flex gap-2 items-center">
                      <img src={blogs} className="w-9" alt="blog write" />
                      <span>MyBlogs</span>
                    </div>
                  </MenubarItem>

                </MenubarContent>
              </div>
            </div>
          </div>
        </MenubarMenu>
      </Menubar>

    </div>
  );
};


