import useChatRoom from "@/hooks/useChatRoom";
import useTab from "@/hooks/useTabs";
import TABS from "@/utils/tabs";
import PropTypes from "prop-types";

function TabButton({ tabName, icon, url }) {
    const { activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen } =
        useTab();
    const { isNewMessage } = useChatRoom();

    const handleTabClick = () => {
        if (!url) {
            // Handle tab switching only if no URL is provided
            if (tabName === activeTab) {
                setIsSidebarOpen(!isSidebarOpen);
            } else {
                setIsSidebarOpen(true);
                setActiveTab(tabName);
            }
        }
    };

    return (
        <>
            {url ? (
                // If a URL is provided, render an anchor tag that opens the link in a new tab
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center"
                >
                    {icon}
                </a>
            ) : (
                // Otherwise, render a button that switches tabs
                <button
                    onClick={handleTabClick}
                    className="relative flex items-center justify-center"
                >
                    {icon}
                    {/* Show dot for new message in chat Tab Button */}
                    {tabName === TABS.CHATS && isNewMessage && (
                        <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-primary"></div>
                    )}
                </button>
            )}
        </>
    );
}

TabButton.propTypes = {
    tabName: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    url: PropTypes.string, // Add url prop
};

export default TabButton;
