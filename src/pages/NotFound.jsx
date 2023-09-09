import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="w-11/12 py-20 ml-auto animate">
			<p className="-ml-2 mb-14">
				<Link
					to="/"
					className="opacity-50 ">
					Home /
				</Link>
				<span className="ml-1">404 Error</span>
			</p>
			<div className="flex-col gap-10 py-10 flex-center">
				<h1 className="font-medium font-inter text-8xl">404 Not Found</h1>
				<p>Your visited page is not found. You may go home page.</p>
				<Link
					type="button"
					to={"/"}
					className="button">
					Back to home page
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
