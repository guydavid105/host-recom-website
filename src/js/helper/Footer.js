import FooterCommon from "./footerCommom"
export default function Footer(){
    return(
    <>
    <br></br>
    <hr width="50%" color="#987cb9" size="1" />
        
        <table className="table_footer">
            <tbody>
            <tr>
                <td>
                    <i>Movies x Books x Music</i> Recommendation System  &nbsp;
                    &nbsp; <br/>
                    <FooterCommon />  
                </td>
            </tr>
            </tbody>
        </table>
    </>
)
}

function popup() {
    alert("Warm Welcome!\n\
    \n---Version 3.2---\n\
    Please press the below button to Exit. Thank you! ⬇️")    
}

 