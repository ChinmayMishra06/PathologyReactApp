// ========================================== //
// ============= IMPORTING FILES ============ //
// ========================================== //

import { Route, Switch } from "react-router-dom";

// ========================================== //
// ========== AUTHENTICATION ROUTES ========= //
// ========================================== //

import SendOTP from "./component/Authentication/SendOTP";
import VerifyOTP from "./component/Authentication/VerifyOTP";
import Register from "./component/Authentication/Register";

// ========================================== //
// ============== MEMBER ROUTES ============= //
// ========================================== //

import AddMember from "./component/Member/AddMember";
import EditMember from "./component/Member/EditMember";
import AllMembers from "./component/Member/AllMembers";

// ========================================== //
// ============= ADDRESS ROUTES ============= //
// ========================================== //

import AddAddress from "./component/Address/AddAddress";
import EditAddress from "./component/Address/EditAddress";
import AllAddresses from "./component/Address/AllAddresses";

// ========================================== //
// ============== ORDER ROUTES ============== //
// ========================================== //

import AllOrders from "./component/Order/AllOrders";
import ReviewOrder from "./component/Order/ReviewOrder";
import TrackMyOrder from "./component/Order/TrackMyOrder";

// ========================================== //
// ============= PROFILE ROUTES ============= //
// ========================================== //

import EditProfile from "./component/Profile/EditProfile";
import Profile from "./component/Profile/Profile";

// ========================================== //
// =============== SLOT ROUTES ============== //
// ========================================== //

import Slot from "./component/Slot/Slot";

// ========================================== //
// =============== CART ROUTES ============== //
// ========================================== //

import Cart from "./component/Cart/Cart";

// ========================================== //
// =============== TEST ROUTES ============== //
// ========================================== //

import Test from "./component/Test/AllTests";
import TestParameters from "./component/Test/TestParameters";

// ========================================== //
// ============== ERROR ROUTES ============== //
// ========================================== //
import Error from "./component/Error/Error";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

// ========================================== //
// ========== FUNCTIONAL COMPONENT ========== //
// ========================================== //

const App = () => {
  return (
    <BrowserRouter>
      <Switch>

        {/* ========================================== */}
        {/* ========== AUTHENTICATION ROUTES ========= */}
        {/* ========================================== */}

        <Route exact path="/">
          <SendOTP />
        </Route>

        <Route path="/verify-otp">
          <VerifyOTP />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        {/* ========================================== */}
        {/* ============== MEMBER ROUTES ============= */}
        {/* ========================================== */}

        <Route path="/all-members">
          <AllMembers active="members" />
        </Route>

        <Route path="/add-member">
          <AddMember active="members" />
        </Route>

        <Route path="/edit-member/:id">
          <EditMember active="members" />
        </Route>

        {/* ========================================== */}
        {/* ============= ADDRESS ROUTES ============= */}
        {/* ========================================== */}

        <Route path="/all-addresses">
          <AllAddresses active="addresses" />
        </Route>

        <Route path="/add-address">
          <AddAddress active="addresses" />
        </Route>

        <Route path="/edit-address/:id">
          <EditAddress active="addresses" />
        </Route>

        {/* ========================================== */}
        {/* ============== ORDER ROUTES ============== */}
        {/* ========================================== */}

        <Route path="/all-orders">
          <AllOrders active="orders" />
        </Route>

        <Route path="/review-my-order">
          <ReviewOrder active="orders" />
        </Route>

        <Route path="/track-my-order/:id">
          <TrackMyOrder active="orders" />
        </Route>

        {/* ========================================== */}
        {/* ============= PROFILE ROUTES ============= */}
        {/* ========================================== */}

        <Route path="/edit-profile">
          <EditProfile active="profile" />
        </Route>

        <Route path="/profile">
          <Profile active="profile" />
        </Route>

        {/* ========================================== */}
        {/* =============== SLOT ROUTES ============== */}
        {/* ========================================== */}

        <Route path="/slot">
          <Slot active="slots" />
        </Route>

        {/* ========================================== */}
        {/* =============== CART ROUTES ============== */}
        {/* ========================================== */}

        <Route path="/cart">
          <Cart active="carts" />
        </Route>

        {/* ========================================== */}
        {/* =============== TEST ROUTES ============== */}
        {/* ========================================== */}

        <Route path="/all-tests">
          <Test active="tests" />
        </Route>

        <Route path="/test-parameters/:id">
          <TestParameters active="tests" />
        </Route>

        {/* ========================================== */}
        {/* ============== ERROR ROUTES ============== */}
        {/* ========================================== */}
        <Route>
          <Error />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
