
import { Fragment } from 'react';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
// import Button from '../../components/ui/button';
// import ErrorAlert from '../../components/ui/error-alert';
import Comments from '../../components/input/comments';

import { getAllEvents, getEventById } from '../../helpers/api-utils';


function EventDetailPage (props) {
    const event = props.event;

    if(!event) {
        return <div className="center">
          <p>Loading....</p>
        </div>
    }

    return (
        <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>

      <Comments  eventId={event.id} /> 
    </Fragment>
    )
}



export async function getStaticProps(context) {

  const params = context.params;
  const eventId = params.eventid;

  const event = await getEventById(eventId);

  return {
    props: {
      event: event
    },
    revalidate: 30
  }
}

export async function getStaticPaths() {

  const allEvents = await getAllEvents();

  const paths = allEvents.map((event) => ({ params : { eventid : event.id }}));

  return {
    paths: paths,
    fallback: 'blocking'
  }
}



export default EventDetailPage;