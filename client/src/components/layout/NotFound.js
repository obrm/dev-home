import React from 'react';
import { Helmet } from 'react-helmet';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>{`בית המפתחים | לא נמצא`}</title>
      </Helmet>
      <section className="container">
        <div style={{ height: '200px' }}></div>
        <div className="text-center">
          <h1 className="x-large text-primary">
            <i className="fas fa-exclamation-triangle"></i> הדף לא נמצא
          </h1>
          <p className="large">מצטערים, דף זה אינו קיים</p>
        </div>
      </section>
    </>
  );
};

export default NotFound;
