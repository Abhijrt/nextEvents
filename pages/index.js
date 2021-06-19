import { getFeaturedEvents } from '../dummy-data';

import EventList from '../components/events/event-list';


export default function HomePage() {

  const feacheredEvent = getFeaturedEvents();

  return (
    <div>
      <EventList items={feacheredEvent} />
    </div>
  )
}
