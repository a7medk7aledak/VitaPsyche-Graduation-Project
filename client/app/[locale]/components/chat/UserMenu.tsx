import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { User } from "@myTypes/chat";

interface UserMenuProps {
  user: User | null;
  isOpen: boolean;
  onToggle: () => void;
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  user,
  isOpen,
  onToggle,
  onProfileClick,
  onSettingsClick,
  onLogout,
}) => {
  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onToggle}
        className="w-full p-3 text-white font-semibold border border-[#67e6c6] rounded-lg hover:bg-[#67e6c6] transition-colors flex items-center justify-center gap-2"
      >
        <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
          {user?.first_name?.[0] || "G"}
        </div>
        <span>
          {user ? `${user.first_name} ${user.last_name}` : "Guest User"}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100">
              <p className="text-sm text-gray-600">Signed in as</p>
              <p className="font-medium text-gray-900">{user?.email}</p>
            </div>
            <div className="p-2">
              <button
                onClick={onProfileClick}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md flex items-center gap-2 text-gray-700"
              >
                <FaUser /> Profile
              </button>
              <button
                onClick={onSettingsClick}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md flex items-center gap-2 text-gray-700"
              >
                <FaCog /> Settings
              </button>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 hover:bg-red-50 rounded-md flex items-center gap-2 text-red-600"
              >
                <FaSignOutAlt /> Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
