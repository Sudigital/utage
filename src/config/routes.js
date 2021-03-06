import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import {
  MainContainer,
  EventsContainer,
  EventPageContainer,
  NewEventContainer,
  SignOutContainer,
  AuthContainer,
  AccountContainer,
  EventEditContainer
} from 'containers';

export default function getRoutes (checkAuth, history) {
  return (
    <Router history={ history }>
      <Route path='/' component={ MainContainer }>
        <IndexRoute component={ EventsContainer } />
        <Route path='/authenticate' component={ AuthContainer } onEnter={ checkAuth } />
        <Route path='/account' component={ AccountContainer } onEnter={ checkAuth } />
        <Route path='/events/:id' component={ EventPageContainer } />
        <Route path='/events/:id/edit' component={ EventEditContainer } onEnter={ checkAuth } />
        <Route path='/new-event' component={ NewEventContainer } onEnter={ checkAuth } />
        <Route path='/signout' component={ SignOutContainer } />
        <Route path='*' component={ EventsContainer } />
      </Route>
    </Router>
  );
}
