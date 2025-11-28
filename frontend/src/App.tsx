import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { userExists, userNotExists } from "./redux/reducer/userReducer";
import { getUser } from "./redux/api/userApi";
import { userReducerInitialState } from "./types/reducer-types";
import ProtectedRoute from "./components/Protected-Routes";

const Search = lazy(() => import("./pages/Search/Search"));
const Shipping = lazy(() => import("./pages/shipping/Shipping"));
const Login = lazy(() => import("./pages/login/Login"));
const Orders = lazy(() => import("./pages/orders/Orders"));
const OrderDetails = lazy(() => import("./pages/orders/OrderDetails"));
const Cart = lazy(() => import("./pages/cart/cart"));
const Home = lazy(() => import("./pages/home"));

//admin routes
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, loading } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExists(data.user));
      } else dispatch(userNotExists());
    });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      {location.pathname === "/" ? <Navbar user={user} /> : ""}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products' element={<Search />} />
          {/* not logged in routes */}
          <Route
            path='/login'
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />
          {/* logged in routes */}
          {/* <Route element={<ProtectedRoute isAuthenticated={user ? true : false} />}> */}
          <Route path='/orders' element={<Orders />} />
          <Route path='/orders/:id' element={<OrderDetails />} />
          <Route path="/shipping" element={<Shipping />} />
          {/* <Route path="/pay" element={<Checkout />} /> */}
          {/* </Route> */}
          {/* admin routes */}
          <Route
          element={
            <ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role==="admin"?true:false} />
          }
          >
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/product' element={<Products />} />
            <Route path='/admin/customer' element={<Customers />} />
            <Route path='/admin/transaction' element={<Transaction />} />
            {/* Charts */}
            <Route path='/admin/chart/bar' element={<Barcharts />} />
            <Route path='/admin/chart/pie' element={<Piecharts />} />
            <Route path='/admin/chart/line' element={<Linecharts />} />
            {/* Apps */}
            <Route path='/admin/app/coupon' element={<Coupon />} />
            <Route path='/admin/app/stopwatch' element={<Stopwatch />} />
            <Route path='/admin/app/toss' element={<Toss />} />

            {/* Management */}
            <Route path='/admin/product/new' element={<NewProduct />} />

            <Route path='/admin/product/:id' element={<ProductManagement />} />

            <Route
              path='/admin/transaction/:id'
              element={<TransactionManagement />}
            />
          </Route>
          ;
        </Routes>
      </Suspense>
      <Toaster position='bottom-right' />
      {/* Footer */}
    </>
  );
};

export default App;
