import { FunctionComponent } from "preact";
import SearchIcon from "@preact-icons/tb/TbSearch";

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: () => void;
}

const SearchBar: FunctionComponent<SearchBarProps> = (props: SearchBarProps) => {
  return <section class="sticky top-12 bg-gray-50 border-b border-gray-300 px-4 py-2 z-10">
    <SearchIcon size={12} className="text-gray-400" />
    <input
      type="search"
      placeholder="Search Tickets"
      aria-label="Search tickets"
      spellcheck={false}
      autocomplete="off"
      value={props.searchTerm}
      onInput={props.onSearchChange}
      class="w-full py-2 px-3 rounded-full border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
    />
  </section>;
}

export default SearchBar;