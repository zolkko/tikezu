import { FunctionComponent } from "preact";
import TicketItem from "$components/TicketItem.tsx"

interface Ticket {
  id: string;
  title: string;
  subtitle: string;
}

export interface TicketListProps {
  tickets: Ticket[];
}

const TicketList: FunctionComponent<TicketListProps> = (props: TicketListProps) => {
  return <ul class="tickets">
    {props.tickets.length > 0
      ? props.tickets.map(TicketItem)
      : <li class="no-tickets">No tickets found.</li>
    }
  </ul>
}

export default TicketList;