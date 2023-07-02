import React from 'react';


export default function PrivateRoutes({ component: Component, alt:Alt, user }) {

  if (user) {
   return <Component />;
  }else{
    return <Alt/>
  }
}