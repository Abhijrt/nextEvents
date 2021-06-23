import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import EventList from '../../components/events/event-list';
import { getFilteredEvents } from '../../dummy-data';
import  ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventPage (props) {

    const [loadingEvents, setLoadingEvents] = useState();

    const router = useRouter();

    const filteredData = router.query.slug;
    const { data, error } = useSWR(
        'https://nextjs-course-c81cc-default-rtdb.firebaseio.com/events.json'
    );

    useEffect(() => {
        if(data) {
            const events = [];

            for (const key in data) {
              events.push({
                id: key,
                ...data[key],
              });
            }
      
            setLoadedEvents(events);
        }
    }, [data]);

    if(!loadedEvents) {
        return <p className="center">Loading.... </p>
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

    const filterEvents = loadingEvents.filter((event) => {
        const eventDate = new Date(event.data);
        return (
            eventData.getFullYear() === numYear && 
            eventDate.getMonth() === numMonth - 1
        )
    })

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


// export async function getServerSideProps(context) {

//     const params = context.params;

//     const filteredData = params.slug;

//     const filteredYear = filteredData[0];
//     const filteredMonth = filteredData[1];

//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth;

//     if(isNaN(numMonth) || isNaN(numYear) || numMonth < 1 || numMonth > 30 || numYear > 2030 || numYear < 2020)  {
//         return {
//             hasError: true
//             // notFound : true,
//             // redirect: {
//             //     destination : '/error'
//             // }
//         }
//     }

//     const filterEvents = getFilteredEvents({
//         year: numYear,
//         month: numMonth
//     });

//     return {
//         props: {
//             events: filterEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth
//             }
//         }
//     }
// }

export default FilteredEventPage;