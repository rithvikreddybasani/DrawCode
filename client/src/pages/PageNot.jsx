import "../resources/PageNotFound.css";
import { Link } from 'react-router-dom'

const PageNot = () => {
  return (
     
    <>
    <div className="setmargin">
    <div className="container">
			<div className="content">
				<h1 className="font-extrabold text-red-600 text-5xl" >⚠️ 404 : Page Not Found ⚠️</h1> 
                <p> <Link to="/" className="font-extrabold   text-3xl">Click Here : To go Home </Link>
                </p>
			</div>
		</div>
    </div>
     
  </>
  )
}

export default PageNot