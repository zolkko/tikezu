import { FunctionComponent, ComponentChildren } from "preact";

export interface TabsPanelProps {
  children?: ComponentChildren;
}

const TabsPanel: FunctionComponent<TabsPanelProps> = ({ children }: TabsPanelProps) => {
  return <nav role="tablist" aria-label="Main tabs" class="tab-panel">
    {children}
  </nav>
}

export default TabsPanel;