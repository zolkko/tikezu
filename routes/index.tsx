import TabButton from "$components/TabButton.tsx";
import FileUploadIcon from "@preact-icons/tb/TbFileUpload";
import SettingsIcon from "@preact-icons/tb/TbSettings";
import ListIcon from "@preact-icons/tb/TbListDetails";
import SearchIcon from "@preact-icons/tb/TbSearch";
import Docs from "$islands/Docs.tsx";

const enum Tab {
  Documents,
  Settings,
}

export default function Index() {
  // const [activeTab, setActiveTab] = useState<Tab>('Home');

  /*
  const handleUploadClick = () => {
    // Programmatically click the hidden file input
    document.getElementById('fileInput')?.click();
  };
  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;

  const files = Array.from(input.files);

      // Validate file types
      const validFiles = files.filter(file => {
        const isImage = file.type.startsWith('image/');
        const isPDF = file.type === 'application/pdf';
        return isImage || isPDF;
      });

      if (validFiles.length > 0) {
        console.log('Selected valid files:', validFiles);
        // Add your upload logic here
      } else {
        alert('Please select image files or PDF documents only');
      }

    if (input.files && input.files.length > 0) {
      // Handle the selected file(s) here
      console.log('Selected files:', input.files);
      // Add your upload logic here
    }
  };
  */

  const activeTab: Tab = Tab.Documents;

  // Content for each tab
  const ticketsContent = () => (
    <div className="p-5 text-center">
      <SearchIcon size={20} className="absolute left-3 top-3 transform -translate-y-1/2 text-gray-400" />
      <input
        type="search"
        className="p-2 pl-10 rounded-md border border-gray-300 shadow-inner w-full mx-auto"
        placeholder="Search"
        style={{
          paddingLeft: "40px",
        }}
      />
      <input
        type="file"
        id="fileInput"
        accept="image/*,.pdf,application/pdf"
        capture="environment"
        multiple
        className="collapse"
      />
      <Docs />
    </div>
  );

  const settingsContent = () => (
    <div className="p-5 text-center">
      <h1 className="text-2xl font-bold">Settings Screen</h1>
      <p>Welcome</p>
    </div>
  );

  return (
    <div className="mdiv">
      <div className="flex-grow overflow-y-auto pb-12">
        {ticketsContent()}
      </div>

      <div
        style={{
          height: "50px", // Standard iOS tab bar height (can vary slightly with device/context)
          backgroundColor: "rgba(249, 249, 249, 0.9)", // Light, slightly translucent background
          borderTop: "0.5px solid #BCBCC0", // Thinner, more subtle border
          display: "flex",
          justifyContent: "space-around",
          alignItems: "stretch", // Stretch items to fill height
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backdropFilter: "saturate(180%) blur(20px)", // iOS-like blur effect
          WebkitBackdropFilter: "saturate(180%) blur(20px)", // For Safari
        }}
      >
        <TabButton
          icon={<ListIcon />}
          text="Tickets"
          selected={activeTab === Tab.Documents}
        />
        <TabButton
          icon={<FileUploadIcon />}
          text="Add"
          selected={false}
        />
        <TabButton
          icon={<SettingsIcon />}
          text="Settings"
          selected={false}
        />
      </div>
    </div>
  );
}
