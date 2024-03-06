export default function FooterCommon(){
    var myDate = new Date(document.lastModified);
    var myNewDate = new Intl.DateTimeFormat(
        "en-GB",
        {dateStyle: 'full',timeStyle: 'long',timeZone: 'Europe/London'}
    ).format(myDate).replace(/\./g, '-');
    return (
        <>
        </>
    )
}
 