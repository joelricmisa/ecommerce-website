import { useLocation, Link } from "react-router-dom";
const Breadcrumb = () => {
	const location = useLocation();
	let currentLink = "";
	const crumbs = location.pathname.split("/").filter((link) => link !== "");
	return (
		<p className="font-poppins -ml-2 mb-14">
			<Link to="/" className="opacity-50 ">
				Home /
			</Link>
			{crumbs.map((link, index) => {
				currentLink += `/${link}`;
				return (
					<Link to={currentLink} className="capitalize ml-2 after:content-['/'] after:ml-2 after:last:content-[''] opacity-50 last:opacity-100" key={index}>
						{link}
					</Link>
				);
			})}
		</p>
	);
};

export default Breadcrumb;
