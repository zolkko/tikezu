import { JSX } from "preact";
import { FunctionComponent } from "preact";

/*
            <button
              role="tab"
              aria-selected=${activeTab === 'tickets'}
              aria-controls=
              class="flex-1 flex flex-col items-center justify-center text-xs leading-none transition-colors duration-150 ease-in-out ${activeTab === 'tickets' ? 'text-blue-600' : 'text-gray-500'} focus:outline-none"
              onClick=${() => this.setTab('tickets')}
              tabindex=${activeTab === 'tickets' ? 0 : -1}
              aria-label=
            >
              ${TICKET_ICON}
              Tickets
            </button>
*/


export interface TabButtonProps {
  // Tickets
  // Settings
  text: string;
  // "Settings tab"
  // "Tickets tab"
  label: string;
  // "settings-panel" 
  // "tickets-panel"
  ariaControls: string;
  icon: JSX.Element;
  selected: boolean;
  onClick?: () => void;
}

const TabButton: FunctionComponent<TabButtonProps> = (props: TabButtonProps) => {
  return <button
    type="button"
    role="tab"
    class="tab-btn {props.selected ? 'selected' : ''}"
    aria-selected={props.selected}
    aria-controls={props.ariaControls}
    onClick={props.onClick}
    tabindex={props.selected ? 0 : -1}
    aria-label={props.label}
  >
    {props.icon}
    {props.text}
  </button>
};

export default TabButton;