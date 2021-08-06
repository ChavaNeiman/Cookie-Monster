import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home/Home.js'
import Header from './components/header/Header.js';
import Footer from './components/footer/Footer';
import ShoppingCart from './components/shoppingCart/ShoppingCart';
import SignIn from './components/signIn/SignIn.js';
import Register from './components/register/Register';
import AllItems from './components/allItems/AllItems';
import Checkout from './components/checkout/Checkout';
import About from './components/about/About';
import NotFound from './components/notFound/NotFound';
import PrivacyPolicy from './components/privacyPolicy/PrivacyPolicy';
import TermAndConditions from './components/termsAndConditions/TermAndConditions';
import AllVideos from './components/videos/AllVideos';
import FaqC from './components/faq/Faq.js';
import PreviousOrders from './components/previousOrders/PreviousOrders';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const restartUser = async () => {
    let user = JSON.parse(localStorage.getItem("user")) || {
      name: "uknown",
      id: "0",
      email: "unknown",
      password: "",
      confirmPassword: "",
      cart: {},
      PaymentShipping: {},
      orders: []
    }
    
    localStorage.setItem("user", JSON.stringify({ ...user }));
    return user;
  };

  useEffect(() => {
    async function restart() {
      let user = await restartUser();
      setCurrentUser(user);
    }
    restart();
  }, [])

  const signout = async () => {
    localStorage.clear();
    let user = await restartUser();
    setCurrentUser(user);
  }

  function changeUser(user) {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify({ ...user }));
  }
  const [modals, setModals] = useState({
    signInForm: false,
    registerForm: false
  });

  const goToTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <div className="App">
      {currentUser != null && <div>
        <Header onOpenShowSignIn={() => setModals({ ...modals, signInForm: true })}
          onOpenShowRegister={() => setModals({ ...modals, registerForm: true })}
          currentUser={currentUser}
          signout={signout} />
        <div className="AppBody">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/AllItems' render={(props) =>
            (<AllItems {...props} currentUser={currentUser}
              changeUser={(user) => { changeUser(user); }}
              goToTop={goToTop} />)} />
            <Route path='/AllItems/Babies' render={(props) =>
            (<AllItems {...props} currentUser={currentUser}
              changeUser={(user) => { changeUser(user); }}
              goToTop={goToTop} />)} />
            <Route path='/AllItems/Birthdays' render={(props) =>
            (<AllItems {...props} currentUser={currentUser}
              changeUser={(user) => { changeUser(user); }}
              goToTop={goToTop} />)} />
            <Route path='/AllItems/Presents' render={(props) =>
            (<AllItems {...props} currentUser={currentUser}
              changeUser={(user) => { changeUser(user); }}
              goToTop={goToTop} />)} />
            <Route path='/AllItems/Others' render={(props) =>
            (<AllItems {...props} currentUser={currentUser}
              changeUser={(user) => { changeUser(user); }}
              goToTop={goToTop} />)} />
            <Route path='/ShoppingCart' render={(props) =>
            (<ShoppingCart {...props} currentUser={currentUser}
              changeUser={(user) => { changeUser(user); }}
              goToTop={goToTop} />)} />
            <Route path='/checkout' render={(props) =>
            (<Checkout {...props} currentUser={currentUser}
              changeUser={(user) => { changeUser(user); }} />)} />
            <Route path='/previousOrders' render={(props) =>
            (<PreviousOrders {...props} currentUser={currentUser}
              changeUser={(user) => { changeUser(user); }} />)} />
            <Route path="/about" render={(props) => (
              <About {...props} goToTop={goToTop} />)} />
            <Route path="/privacyPolicy" component={PrivacyPolicy} />
            <Route path="/termsAndConditions" component={TermAndConditions} />
            <Route path="/allVideos" component={AllVideos} />
            <Route path="/faq" render={(props) => (
              <FaqC {...props} goToTop={goToTop} />)} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <ToastContainer />
        <SignIn show={modals.signInForm}
          onCloseShow={() => setModals({ ...modals, signInForm: false })}
          openRegister={() => setModals({ signInForm: false, registerForm: true })}
          currentUser={currentUser}
          changeUser={(user) => { changeUser(user); }}
        />

        <Register show={modals.registerForm}
          onCloseShow={() => setModals({ ...modals, registerForm: false })}
          openSignIn={() => setModals({ signInForm: true, registerForm: false })}
          currentUser={currentUser}
          changeUser={(user) => { changeUser(user); }} />
        <Footer /></div>}
    </div>
  );
}

export default App;
