import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import { useRouter } from 'next/router';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage () {
    const router = useRouter();

    const events = getAllEvents();

    function findSearchHandler ( year, month) {
        const fullPath = `/events/${year}/${month}`;

        router.push(fullPath);
    }

    return <div>
        <EventsSearch onSearch={findSearchHandler} />
        <EventList items={events} />
    </div>
}

export default AllEventsPage;