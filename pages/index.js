import { getFeaturedEvents } from '../helpers/api-utils';

import EventList from '../components/events/event-list';

import NewsletterRegistration from '../components/input/newsletter-registration';

export default function HomePage(props) {

  return (
    <div>
      <NewsletterRegistration />
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
