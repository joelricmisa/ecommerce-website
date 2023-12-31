import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import {
    Home,
    NotFound,
    Contact,
    About,
    SignUp,
    SignIn,
    Wishlist,
    Cart,
    Checkout,
    ShopProducts,
    ProductPreview,
    ForgotPassword,
    Account,
    ResetPassword,
} from "./pages";

import RequireAuth from "./layouts/RequireAuth";

import {
    CategoryProvider,
    WishlistProvider,
    ShopContextProvider,
    FeedbackProvider,
} from "./contexts";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="cart">
                <Route index element={<Cart />} />
                <Route
                    path="checkout"
                    element={
                        <RequireAuth>
                            <Checkout />
                        </RequireAuth>
                    }
                />
            </Route>
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="products">
                <Route index element={<ShopProducts />} />
                <Route path=":id" element={<ProductPreview />} />
            </Route>
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="forgot" element={<ForgotPassword />} />
            <Route path="reset/:token" element={<ResetPassword />} />

            <Route
                path="account"
                element={
                    <RequireAuth>
                        <Account />
                    </RequireAuth>
                }
            />

            <Route path="/*" element={<NotFound />} />
        </Route>,
    ),
);
function App() {
    return (
        <>
            <FeedbackProvider>
                <WishlistProvider>
                    <ShopContextProvider>
                        <CategoryProvider>
                            <RouterProvider router={router} />
                        </CategoryProvider>
                    </ShopContextProvider>
                </WishlistProvider>
            </FeedbackProvider>
        </>
    );
}

export default App;
