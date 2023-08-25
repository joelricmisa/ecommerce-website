import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="w-11/12  ml-auto py-20">
			<p className="font-poppins -ml-2 mb-14">
				<Link to="/" className="opacity-50 ">
					Home /
				</Link>
				<span className="ml-1">404 Error</span>
			</p>
			<div className="flex flex-col gap-10 justify-center items-center font-poppins py-10">
				<h1 className="font-inter text-8xl font-medium">404 Not Found</h1>
				<p>Your visited page is not found. You may go home page.</p>
				<Link to={"/"} className="bg-secondary px-10 py-3 text-white font-medium">
					Back to home page
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
