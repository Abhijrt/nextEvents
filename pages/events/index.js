import { getAllEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';
import { useRouter } from 'next/router';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage (props) {
    const router = useRouter();

    const events = props.events;

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


export async function getStaticProps () {
    const allEvents = await getAllEvents();

    return {
        props: {
            events: allEvents    
        },
        revalidate: 60
    }
}