
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import './libs/css/Animate.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const Home = lazy(() => import('./App'));
const Widgets = lazy(() => import('./widgets'));
const PrivatePermissions = lazy(() => import('./pages/privatePermissions'));
const TermsOfService = lazy(() => import('./pages/termsOfService'));

Number.prototype.toMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return minutes + ' phút ' + seconds + ' giây ';
}

window.imageUrlFixing = url => {
  return url.replace('p16-sign-va.tiktokcdn.com', 'p16-va.tiktokcdn.com');
}

window.imageOnError = e => {
  e.target.src = '/assets/images/default-avatar.webp';
  e.target.errored = true;
}

window.imageOnLoad = e => {
  const target = e.target;
  const url = target.getAttribute('data-url');
  if (!url) return false;
  target.removeAttribute('data-url');
  const fixedUrl = window.imageUrlFixing(url);
  var tester = new Image();
  tester.onload = () => {
    target.src = fixedUrl;
  }
  tester.src = fixedUrl;
}

window.wait = s => {
  return new Promise(resolve => {
    setTimeout(resolve, s * 1000)
  })
}

window.archivePoint = {};
window.pointUpdateDelay = {};
// window.likeHolder = {};
// window.timeOuts = {};

const NotFoundPage = () => {
  return (
    <div className='p-3 text-center'>
      <h4>Oops! page not found</h4>
      <a className='text-info' href="/">go back to homepage</a>
    </div>
  )
}

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={
          <Suspense fallback={<div>Loading</div>}> <Home /> </Suspense>} />
        <Route path="widget/*" element={
          <Suspense fallback={<div>Loading</div>}> <Widgets /> </Suspense>} />
        <Route path="private-permissions" element={
          <Suspense fallback={<div>Loading</div>}> <PrivatePermissions /> </Suspense>} />
        <Route path="terms-of-service" element={
          <Suspense fallback={<div>Loading</div>}> <TermsOfService /> </Suspense>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
); 