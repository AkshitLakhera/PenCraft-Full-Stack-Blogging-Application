import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  // MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppbarProps {
  onSearch: (query: string) => void;
}
// main appbar code is  here
export const Appbar: React.FC<AppbarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showNavigationBox, setShowNavigationBox] = useState<boolean>(false);
  const navigationBoxRef = useRef<HTMLDivElement>(null);

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
    console.log("handleclick outside added");
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      console.log("handle click outside removed");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigationBoxRef, showNavigationBox]);

  const handleMyblogs = () => {
    navigate("/myblogs");
  };
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
    <div className="w-full flex justify-center py-9 px-5">
      <Menubar className="w-full max-w-3xl px-2.5 py-5 md:px-5">
        <MenubarMenu>
          <div className="flex justify-between items-center w-full">
            <h1
              className="font-bold text-sm cursor-pointer"
              onClick={handleHomepage}
            >
              PenCraft
            </h1>
            {/* text-lg */}
            <div className="flex gap-2.5 md:gap-5 items-center">
              {/* Input field */}
              <div className="mx-auto">
                <Input
                  type="text"
                  id="search"
                  placeholder="Search something.."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>

              {/* Mode Toggle */}
              <div className="hidden md:block">
                <ModeToggle />
              </div>

              {/* Avatar and a Dropdown Menu */}
              <div>
                <MenubarTrigger className="p-0">
                  <Avatar className="w-9 h-9 rounded-sm">
                    <AvatarImage />
                    <AvatarFallback className="w-9 h-9 rounded-sm capitalize">
                      {authorname ? authorname[0] : "CN"}
                    </AvatarFallback>
                  </Avatar>
                </MenubarTrigger>
                <MenubarContent>
                  {/* Mode Toggle */}
                  <div className="block md:hidden">
                    <ModeToggle />
                  </div>
                  <MenubarItem>
                    <div
                      onClick={handlePublish}
                      className="flex gap-2 items-center"
                    >
                      <span>write</span>
                    </div>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <div
                      onClick={handleBookmarkClick}
                      className="flex gap-2 items-center"
                    >
                      <span>Bookmarks</span>
                    </div>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <div
                      onClick={handleMyblogs}
                      className="flex gap-2 items-center"
                    >
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
