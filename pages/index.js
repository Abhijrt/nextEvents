import { getFeaturedEvents } from '../dummy-data';

import EventList from '../components/event-list';


export default function HomePage() {

  const feacheredEvent = getFeaturedEvents();

  return (
    <div>
      <EventList items={feacheredEvent} />
    </div>
  )
}
