import { FunctionComponent } from "preact";


export interface HeaderProps {
  title: string;
  showUpload: boolean;
  onUploadTicket: () => void;
}

function renderUploadButton(props: HeaderProps) {
  return <button
    class="text-blue-600 font-semibold text-base px-3 py-1 rounded-lg active:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    type="button"
    onClick={props.onUploadTicket}
  >Upload Ticket</button>;
}

function renderNoButton() {
  return <span class="w-[104px]" aria-hidden="true"></span>;
}

const Header: FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  return <header role="banner" aria-label="App navigation" class="flex items-center justify-between px-4 py-3 border-b border-gray-300 bg-gray-50 sticky top-0 z-20 select-none">
    {props.showUpload ? renderUploadButton(props) : renderNoButton()}
  </header>
}

export default Header;