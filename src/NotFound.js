
/** Renders Not Found page
 *
 * Props:
 * - None
 *
 * State:
 * - None
 *
 * RouteList -> NotFound
 */

function NotFound(){
  console.log("NotFound reached");
  return(
    <div className='NotFound'>
      <h1>The page you're looking for doesn't exist.</h1>
    </div>
  )
}

export default NotFound;