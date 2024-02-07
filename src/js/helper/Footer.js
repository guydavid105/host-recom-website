import FooterCommon from "./footerCommom"
export default function Footer(){
    return(
    <>
    <br></br>
    <hr width="50%" color="#987cb9" SIZE="1" />
        
        <table class="table_footer">
            <tbody>
                <td>

                    <i>Movies x Books x Music</i> Recommendation System!  &nbsp;
                    <button class="button button_blogs" onClick={() => {popup()}}> Details </button>
                    &nbsp; <br/>
                    <FooterCommon />
                    
                </td>
            </tbody>
        </table>


    </>
)
}

function popup() {
    alert("Warm Welcome!\n\
    \n---Version: 0.5.8---\n\
    Please press the below button to Exit. Thank you! ⬇️")    
}

 