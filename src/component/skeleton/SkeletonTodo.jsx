import React from "react";
import Skeleton from "./Skeleton";
import './Skeleton.css'

function SkeletonTodo() {

    let list = [];
    for (let index = 0; index < 10; index++) {
        list.push(<Skeleton key={`todo ${index}`} classes="base" />)
    }
    return list;
}

export default SkeletonTodo;
