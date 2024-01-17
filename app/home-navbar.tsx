import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import { RainbowIcon, ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale } from './icons';
import Popup from "./components/ui/popup";

export default function HomeNavbar({ setShowAuthPopup }: { setShowAuthPopup: (value: boolean) => void }) {
    const [showLearnMorePopup, setShowLearnMorePopup] = useState<boolean>(false);
    const learnMoreContent = (
        <p className="text-lg md:text-xl text-gray-500 mb-6">
          S.E.S built Funding.Live as a side project to improve the efficiency of sourcing and tracking deals for investors. 
        <br /><br />
          Reach out to me on <a href="https://www.linkedin.com/in/samielsolh/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Linkedin</a> if you have any questions or feedback!
        </p>
      );
    
    return (
    <>
        <Navbar>
        <NavbarBrand>
            <RainbowIcon />
            <p className="font-bold text-inherit">Funding.Live</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <Dropdown>
            <NavbarItem>
                <DropdownTrigger>
                <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                    endContent={<ChevronDown />}
                    radius="sm"
                    variant="light"
                >
                    Features
                </Button>
                </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
                aria-label="Features"
                className="w-[340px]"
                itemClasses={{
                base: "gap-4",
                }}
            >
                <DropdownItem
                key="dashboard"
                description="Real-time startup funding news, data, & analytics"
                startContent={<Activity />}
                >
                Live Funding
                </DropdownItem>
                <DropdownItem
                key="ai"
                description="AI-powered chat to deliver and source startups by description, geography, and more"
                startContent={<Flash />}
                >
                Production Ready
                </DropdownItem>
                <DropdownItem
                key="todo"
                description="Personal tracker and dashboard with reminders"
                startContent={<Server />}
                >
                Personalized for You
                </DropdownItem>
                <DropdownItem
                key="Profile"
                description="Connect with other investors who share similar dealflow"
                startContent={<TagUser />}
                >
                Investor Network
                </DropdownItem>
            </DropdownMenu>
            </Dropdown>
            <NavbarItem>
                <button
                    className="text-sm font-medium text-gray-900 hover:text-gray-600"
                    onClick={() => setShowLearnMorePopup(true)}
                >
                Learn More
                </button>
            </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
            <button 
                className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                onClick={() => setShowAuthPopup(true)}>
                Login
            </button>
            </NavbarItem>
        
            <NavbarItem className="hidden lg:flex">
                <button 
                    className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 hover:bg-blue-700 text-white px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    onClick={() => setShowAuthPopup(true)}>
                    Request Access
                </button>
            </NavbarItem>
            
        </NavbarContent>
        </Navbar>
        {/* Popup Component for Learn More */}
        {showLearnMorePopup && (
        <div className="pt:60 fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-10">
            <Popup 
                isOpen={showLearnMorePopup} 
                closePopup={() => setShowLearnMorePopup(false)} 
                content={learnMoreContent}
            />
        </div>
    )}
    </>
  );
}
