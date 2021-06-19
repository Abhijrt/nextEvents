import { useRouter } from 'next/router';
import { Fragment } from 'react';
import EventList from '../../components/events/event-list';
import { getFilteredEvents } from '../../dummy-data';
import  ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventPage (props) {

    const router = useRouter();

    const filteredData = router.query.slug;

    if(!filteredData) {
        return <Fragment>
        <ErrorAlert>
            <p>Loading ....</p>
        </ErrorAlert>
        <div className="center">
            <Button link='/events'>Show All Event</Button>
        </div>
    </Fragment>
    }

    const filteredYear = filteredData[0];
    const filteredMonth = filteredData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if(isNaN(numMonth) || isNaN(numYear) || numMonth < 1 || numMonth > 30 || numYear > 2030 || numYear < 2020) {
        return <Fragment>
            <ErrorAlert>
                <p>Please Adjust Your value !</p>
            </ErrorAlert>
            <div className="center">
            <Button link='/events'>Show All Event</Button>
        </div>
        </Fragment>
        
    }

    const filterEvents = getFilteredEvents({
        year: numYear,
        month: numMonth
    });

    if(!filterEvents || filterEvents.length === 0) {
        return <Fragment>
        <ErrorAlert>
            <p>No events Found for the choosen Filter !</p>
        </ErrorAlert>
        <div className="center">
            <Button link='/events'>Show All Event</Button>
        </div>
    </Fragment>
    }

    const date = new Date(numYear, numMonth - 1);

    return <Fragment>
        <ResultsTitle data={date} />
        <EventList items={filterEvents} />
    </Fragment>
}

export default FilteredEventPage;