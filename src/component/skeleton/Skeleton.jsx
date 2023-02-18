import React from "react";

function Skeleton({ classes }) {
    const classNames = `skeleton ${classes} animatePulse`
    console.log(classNames);
    return <div className={classNames}>
        <div className="dummy"></div>
    </div>;
}

export default Skeleton;
