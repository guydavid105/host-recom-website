import moment from 'moment'
import { HashLink } from 'react-router-hash-link';
import "../timeline.css"
import { ReactComponent as MovieIcon } from "../asset/timeline/movieIcon.svg"
import { ReactComponent as BookIcon } from "../asset/timeline/bookIcon.svg"
import { ReactComponent as SongIcon } from "../asset/timeline/songIcon.svg"

import timelineElements from "./timelineElements"

import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component"

import "react-vertical-timeline-component/style.min.css"

function dateComparer (event1, event2) {
    let eventOneDate, eventTwoDate
    eventOneDate = event1.date
    eventTwoDate = event2.date
    return moment(eventOneDate).isAfter(eventTwoDate) ? -1 : 1
}

export function Timeline() {
    let movieIconStyles = { background: "#06D6A0" }
    let bookIconStyles = { background: "#f9c74f" }
    let songIconStyles = { background: "#ffb3cc" }

    return (
        <>
        <button
            style= {{ borderWidth:1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:'#06D6A0',
            borderRadius:10,
            padding:10,
            }}
        > <HashLink to={{pathname:"/"}}>Home</HashLink></button>
        <div>
            <h1 className="title">Timeline</h1>
            <VerticalTimeline>
                {timelineElements.sort((event1, event2) => (dateComparer(event1, event2))).map(element => {
                    let isMovieIcon = element.type === "movie"
                    let isBookIcon = element.type === "book"

                    return (
                        <VerticalTimelineElement
                            key={element.key}
                            date={element.date}
                            dataClassName="date"
                            iconStyle={isMovieIcon ? movieIconStyles : isBookIcon ?  bookIconStyles : songIconStyles}
                            icon={isMovieIcon ? <MovieIcon /> : isBookIcon ? <BookIcon /> : <SongIcon />}
                        >
                            <h3 className="vertical-timeline-element-title">
                                {element.title}
                            </h3>
                        </VerticalTimelineElement>
                    )
                })}
            </VerticalTimeline>
        </div>
        </>
    )
}
