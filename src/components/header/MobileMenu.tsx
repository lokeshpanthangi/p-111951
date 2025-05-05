
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface MobileMenuProps {
  isLoggedIn: boolean;
  onAuth: () => void;
  onClose: () => void;
}

const MobileMenu = ({ isLoggedIn, onAuth, onClose }: MobileMenuProps) => {
  return (
    <div className="md:hidden animate-fade-in">
      <div className="px-4 py-3 space-y-4 bg-white dark:bg-gray-900 shadow-lg border-t">
        <Link 
          to="/" 
          className="block py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-civic-blue"
          onClick={onClose}
        >
          Home
        </Link>
        <Link 
          to="/issues" 
          className="block py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-civic-blue"
          onClick={onClose}
        >
          Browse Issues
        </Link>
        <Link 
          to="/report" 
          className="block py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-civic-blue"
          onClick={onClose}
        >
          Report Issue
        </Link>
        <Link 
          to="/my-issues" 
          className="flex items-center py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-civic-blue"
          onClick={onClose}
        >
          <FileText size={16} className="mr-2" />
          My Issues
        </Link>
        
        <div className="pt-2 pb-3 border-t">
          {isLoggedIn ? (
            <div className="space-y-2">
              <Link 
                to="/my-issues" 
                className="block py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-civic-blue"
                onClick={onClose}
              >
                My Issues
              </Link>
              <Link 
                to="/profile" 
                className="block py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-civic-blue"
                onClick={onClose}
              >
                Profile
              </Link>
              <Button 
                variant="outline" 
                onClick={() => {
                  onAuth();
                  onClose();
                }}
                className="w-full"
              >
                Log out
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  onAuth();
                  onClose();
                }}
                className="w-full"
              >
                Log in
              </Button>
              <Button 
                onClick={() => {
                  onAuth();
                  onClose();
                }}
                className="w-full"
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
