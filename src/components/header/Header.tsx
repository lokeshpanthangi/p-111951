
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, BarChart3, FileText } from "lucide-react";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import { ThemeToggle } from "../theme/ThemeToggle";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Mock login/logout functionality
  const handleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-civic-blue">Issue<span className="text-civic-green">Radar</span></span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-civic-blue transition-colors">
              Home
            </Link>
            <Link to="/issues" className="text-gray-700 dark:text-gray-200 hover:text-civic-blue transition-colors">
              Browse Issues
            </Link>
            <Link to="/report" className="text-gray-700 dark:text-gray-200 hover:text-civic-blue transition-colors">
              Report Issue
            </Link>
            <Link to="/my-issues" className="text-gray-700 dark:text-gray-200 hover:text-civic-blue transition-colors flex items-center">
              <FileText size={16} className="mr-1" />
              My Issues
            </Link>
            <Link to="/analytics" className="text-gray-700 dark:text-gray-200 hover:text-civic-blue transition-colors flex items-center">
              <BarChart3 size={16} className="mr-1" />
              Analytics
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {isLoggedIn ? (
              <UserMenu onLogout={handleAuth} />
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="outline" onClick={handleAuth}>
                  Log in
                </Button>
                <Button onClick={handleAuth}>Sign up</Button>
              </div>
            )}
            
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <MobileMenu 
          isLoggedIn={isLoggedIn} 
          onAuth={handleAuth} 
          onClose={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
