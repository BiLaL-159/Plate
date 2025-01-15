// import React from 'react'
// import PropTypes from 'prop-types'

// function layout(props) {
//   return (
//     <div>
      
//     </div>
//   )
// }

// layout.propTypes = {

// }

// export default layout

import Header from "@/components/Header";
type Props={
    children: React.ReactNode;
};

const Layout=({children}:Props)=>{
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <div className="constainer mx-auto flex-1 py-10">
                {children}
            </div>
        </div>
    );
};

export default Layout;