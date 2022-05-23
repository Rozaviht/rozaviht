export default function functionName ({show}: {show: boolean}) {
  return (
    <svg id="loadingDots" width="132px" height="58px" viewBox="0 0 132 58" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={show === true ? "show" : "hidden"}>
    <title>dots</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="dots"  fill="#9b532b">
            <circle id="loadingDot1" cx="25" cy="30" r="13"></circle>
            <circle id="loadingDot2" cx="65" cy="30" r="13"></circle>
            <circle id="loadingDot3" cx="105" cy="30" r="13"></circle>
        </g>
    </g>
</svg>
  )
}