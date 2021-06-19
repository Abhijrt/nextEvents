import { useRouter } from 'next/router';

import { Fragment } from 'react';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

import { getEventById } from '../../dummy-data';

function EventDetailPage () {
    const router = useRouter();

    const eventId = router.query.eventid;

    const event = getEventById(eventId);

    if(!event) {
        return <Fragment>
        <ErrorAlert>
        <p>No Event Fount !</p>
        </ErrorAlert>
        <div className="center">
            <Button link='/events'>Show All Event</Button>
        </div>
    </Fragment>
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
    </Fragment>
    )
}

export default EventDetailPage;