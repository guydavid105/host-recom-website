import moment from 'moment'
import { HashLink } from 'react-router-hash-link';
import "../timeline.css"
import { ReactComponent as MovieIcon } from "../asset/timeline/movieIcon.svg"
import { ReactComponent as BookIcon } from "../asset/timeline/bookIcon.svg"
import { ReactComponent as SongIcon } from "../asset/timeline/songIcon.svg"
import FooterCommon from "./helper/footerCommom"

import timelineElements from "./timelineElements"

import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component"

import "react-vertical-timeline-component/style.min.css"

function dateComparer (event1, event2) {
    let eventOneDate, eventTwoDate
    if (event1.date == "None") {
        eventOneDate = 0
    } else {
        eventOneDate = event1.date
    }

    if (event2.date == "None") {
        eventTwoDate = 0
    } else {
        eventTwoDate = event2.date
    }
    return moment(eventOneDate).isAfter(eventTwoDate) ? -1 : 1
}

export function Timeline() {
    let movieIconStyles = { background: "#06D6A0" }
    let bookIconStyles = { background: "#f9c74f" }
    let songIconStyles = { background: "#ffb3cc" }

    const clickHandlerToHome = ()=>{
        window.location = `/`;
    }

    return (
        <>
        <div className={"home"} onClick={clickHandlerToHome}> 
            Home
        </div>
        <div>
            <center>
            <h1 className="title">Timeline</h1>
            </center>
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
        <br></br>
    <hr width="50%" color="#987cb9" size="1" />
        
        <table className="table_footer">
            <tbody>
            <tr>
                <td>
                    <i>A timeline showing the order of releases of the recommendations you have been given </i> &nbsp;
                    &nbsp; <br/>
                    <FooterCommon />  
                </td>
            </tr>
            </tbody>
        </table>
        </>
    )
}
