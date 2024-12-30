import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaHistory } from "react-icons/fa";
import { UserMenu } from "./UserMenu";
import { LanguageSelector } from "./LanguageSelector";
import { User } from "@app/types/chat";
import { sessionService } from "@app/services/messages";
import {
  setSessions,
  setCurrentSession,
  setLoading,
  setError,
} from "@/app/store/chatSlice";
import { RootState } from "@/app/store/store";

interface ChatSidebarProps {
  isHistoryVisible: boolean;
  setIsHistoryVisible: (visible: boolean) => void;
  language: string;
  handleLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  user: User | null;
  onLogout: () => void;
  onProfileClick: () => void;
  onSettingsClick: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isHistoryVisible,
  setIsHistoryVisible,
  language,
  handleLanguageChange,
  user,
  onLogout,
  onProfileClick,
  onSettingsClick,
}) => {
  const dispatch = useDispatch();
  const { sessions, currentSession, loading, error } = useSelector(
    (state: RootState) => state.chat
  );
  const { token } = useSelector((state: RootState) => state.auth);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const fetchSessions = async () => {
    if (!token) return;

    dispatch(setLoading(true));
    try {
      const fetchedSessions = await sessionService.getChatSessions(token);
      // Sort sessions by creation date to maintain consistent ordering
      const sortedSessions = fetchedSessions.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      // Normalize session IDs to be sequential starting from 1
      const normalizedSessions = sortedSessions.map((session, index) => ({
        ...session,
        displayId: index + 1,
      }));

      dispatch(setSessions(normalizedSessions));
      if (normalizedSessions.length > 0 && !currentSession) {
        dispatch(setCurrentSession(normalizedSessions[0]));
      }
    } catch (error) {
      dispatch(setError("Failed to fetch chat sessions"));
      console.error("Error fetching sessions:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [dispatch, token]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isHistoryVisible &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsHistoryVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isHistoryVisible, setIsHistoryVisible]);

  const handleNewChat = async () => {
    if (!token) return;

    dispatch(setLoading(true));
    try {
      await sessionService.createChatSession(token);
      await fetchSessions(); // Refresh sessions to get normalized IDs
      setIsHistoryVisible(false);
    } catch (error) {
      console.error("Error creating new chat:", error);
      dispatch(setError("Failed to create new chat"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed md:relative z-40 top-0 left-0 h-screen w-[280px] bg-slate-800 
        border-r border-gray-700/50 transition-transform duration-300
        ${
          isHistoryVisible || window.innerWidth >= 768
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700/50">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaHistory className="text-[#46e4dc] text-lg" />
              <h2 className="text-xl font-semibold text-white">Chat History</h2>
            </div>
            <button
              onClick={() => setIsHistoryVisible(false)}
              className="md:hidden hover:bg-gray-700/50 p-2 rounded-full transition-colors"
            >
              <FaHistory className="text-[#46e4dc]" />
            </button>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="px-4 py-3 border-b border-gray-700/50">
          <button
            onClick={handleNewChat}
            disabled={loading}
            className="w-full flex items-center justify-center p-3 rounded-lg
              bg-[#46e4dc] text-gray-900 font-medium transition-all
              hover:bg-[#3bc8c1] disabled:opacity-50 disabled:cursor-not-allowed
              shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-900 border-t-transparent" />
                <span>Creating...</span>
              </div>
            ) : (
              <>
                <FaPlus className="mr-2" /> New Chat
              </>
            )}
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto custom-scrollbar px-4 py-3">
            {loading && (
              <div className="flex items-center justify-center py-4 space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#46e4dc] border-t-transparent" />
                <span className="text-gray-400">Loading...</span>
              </div>
            )}

            {error && (
              <div className="text-red-400 text-sm text-center py-2 px-3 bg-red-900/20 rounded-lg border border-red-800/50 mb-3">
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-2">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => {
                    dispatch(setCurrentSession(session));
                    setIsHistoryVisible(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200
                    ${
                      currentSession?.id === session.id
                        ? "bg-[#46e4dc]/10 border-[#46e4dc]/50 border"
                        : "hover:bg-gray-700/30 border border-transparent"
                    }`}
                >
                  <div className="flex flex-col">
                    <span
                      className={`font-medium ${
                        currentSession?.id === session.id
                          ? "text-[#46e4dc]"
                          : "text-white"
                      }`}
                    >
                      Chat {session.displayId}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      {new Date(session.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-700/50">
          <div className="space-y-3">
            <LanguageSelector
              language={language}
              onChange={handleLanguageChange}
            />
            <UserMenu
              user={user}
              isOpen={isUserMenuOpen}
              onToggle={() => setIsUserMenuOpen(!isUserMenuOpen)}
              onProfileClick={onProfileClick}
              onSettingsClick={onSettingsClick}
              onLogout={onLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
