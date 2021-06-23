import { getFeaturedEvents } from '../helpers/api-utils';

import EventList from '../components/events/event-list';

export default function HomePage(props) {

  return (
    <div>
      <EventList items={props.events} />
    </div>
  )
}


export async function getStaticProps() {

  const featureEvents = await getFeaturedEvents();
  return {
    props: {
     events: featureEvents
    },
    revalidate: 1800
  }
}
