import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { Home, NotFound, Contact, About, SignUp, SignIn, Wishlist, Cart } from "./pages";
import ShopContextProvider from "./contexts/ShopContext";
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home />} />
			<Route path="cart" element={<Cart />} />
			<Route path="wishlist" element={<Wishlist />} />

			<Route path="contact" element={<Contact />} />
			<Route path="about" element={<About />} />
			<Route path="signup" element={<SignUp />} />
			<Route path="signin" element={<SignIn />} />

			<Route path="/*" element={<NotFound />} />
		</Route>
	)
);
function App() {
	return (
		<>
			<ShopContextProvider>
				<RouterProvider router={router} />
			</ShopContextProvider>
		</>
	);
}

export default App;
