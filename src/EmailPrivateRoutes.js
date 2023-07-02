import React from 'react';
import { auth } from './Firebase';

export default function EmailPrivateRoutes({ component: Component, alt: Alt }) {
  const user = auth.currentUser;

  if (user && !user.emailVerified) {
    return <Component />;
  } else {
    return <Alt />;
  }
}
