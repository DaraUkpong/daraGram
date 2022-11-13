import React from 'react';
import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement';

const SkeletonUploadImage = ({theme}) => {
const themeClass = theme || 'light';

    return ( 
        <div className={`skeleton-wrapper ${themeClass}`}>
            
            
            
            <SkeletonElement type="upload" />
            
            
         <Shimmer />
            
            
         </div>
     );
}
 
export default SkeletonUploadImage;