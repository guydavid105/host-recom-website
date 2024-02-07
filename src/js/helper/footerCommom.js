 
export default function FooterCommon(){
    var myDate = new Date(document.lastModified);
    var myNewDate = new Intl.DateTimeFormat(
        "en-GB",
        {dateStyle: 'full',timeStyle: 'long',timeZone: 'Europe/London'}
    ).format(myDate).replace(/\./g, '-');
    return (
        <>
        © Copyright 2024 Movies x Books x Music Team. Hosted by <a href="https://reactjs.org">React App</a>.<br/>
            Last updated: 
            {myNewDate.toString()}
        </>
    )
}
 