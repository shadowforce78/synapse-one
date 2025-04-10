import React from 'react';
import { useScrollSync } from '../../hooks/useScrollSync';
import './SplitView.css';

const SplitView = ({ children }) => {
  const registerScroll = useScrollSync();

  // Identification des enfants pour leur assigner le bon type
  const childrenWithRef = React.Children.map(children, (child, index) => {
    const isEditor = index === 0;
    return React.cloneElement(child, {
      ref: (el) => el && registerScroll(el, isEditor ? 'editor' : 'preview')
    });
  });

  return (
    <div className="split-view">
      {childrenWithRef}
    </div>
  );
};

export default SplitView;