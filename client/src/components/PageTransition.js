import React, { forwardRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../styles/PageTransition.css';

const PageWrapper = forwardRef(({ children }, ref) => {
  return (
    <div ref={ref} className="page">
      {children}
    </div>
  );
});

const PageTransition = ({ children, locationKey }) => {
  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={locationKey}
        classNames="fade"
        timeout={300}
        nodeRef={React.createRef()} // we pass a ref to fix the DOM issue
      >
        <PageWrapper>{children}</PageWrapper>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransition;
