import { FunctionComponent } from "preact";

export interface TicketItemProps {
  id: string;
  title: string;
  subtitle: string;
}

const TicketItem: FunctionComponent<TicketItemProps> = (props: TicketItemProps) => {
  const ariaLabel = props.title + ', ' + props.subtitle;
  return <li role="listitem" tabindex={0} key={props.id} aria-label={ariaLabel} class="ticket-item">
    <span>{props.title}</span>
    <span>{props.subtitle}</span>
  </li>
}

export default TicketItem;