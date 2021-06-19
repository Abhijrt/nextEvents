import { useRouter } from 'next/router';
import { Fragment } from 'react';
import EventList from '../../components/events/event-list';
import { getFilteredEvents } from '../../dummy-data';
import  ResultsTitle from '../../components/events/results-title';

function FilteredEventPage (props) {

    const router = useRouter();

    const filteredData = router.query.slug;

    if(!filteredData) {
        return <p>Loading ....</p>
    }

    const filteredYear = filteredData[0];
    const filteredMonth = filteredData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if(isNaN(numMonth) || isNaN(numYear) || numMonth < 1 || numMonth > 30 || numYear > 2030 || numYear < 2020) {
        return <p>Please Adjust Your value !</p>
    }

    const filterEvents = getFilteredEvents({
        year: numYear,
        month: numMonth
    });

    if(!filterEvents || filterEvents.length === 0) {
        return <p>No events Found for the choosen Filter !</p>
    }

    const date = new Date(numYear, numMonth - 1);

    return <Fragment>
        <ResultsTitle data={date} />
        <EventList items={filterEvents} />
    </Fragment>
}

export default FilteredEventPage;