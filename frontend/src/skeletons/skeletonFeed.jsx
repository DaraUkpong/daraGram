import React from 'react';
import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement';

const SkeletonFeed = ({theme}) => {
const themeClass = theme || 'light';

    return ( 
        <div className={`skeleton-wrapper ${themeClass}`}>
            <div className="skeleton-article grid grid-cols-2">
            
            <SkeletonElement type="Post" />
            <SkeletonElement type="Post" />
            <SkeletonElement type="Post" />
            <SkeletonElement type="Post" />
            <SkeletonElement type="Post" />
            <SkeletonElement type="Post" />
            <SkeletonElement type="Post" />
            <SkeletonElement type="Post" />
            <SkeletonElement type="image" />
            
            
         <Shimmer />
            </div>
            
         </div>
     );
}
 
export default SkeletonFeed;