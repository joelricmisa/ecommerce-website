import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { Home, NotFound, Contact, About, SignUp, SignIn } from "./pages";


const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home />} />
			<Route path="contact" element={<Contact />} />
			<Route path="about" element={<About />} />
			<Route path="signup" element={<SignUp />} />

			<Route path="/*" element={<NotFound />} />
		</Route>
	)
);
function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
