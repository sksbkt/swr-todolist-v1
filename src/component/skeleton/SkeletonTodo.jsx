import React from "react";
import Skeleton from "./skeleton";
import './Skeleton.css'

function SkeletonTodo() {

    let list = [];
    for (let index = 0; index < 10; index++) {
        list.push(<Skeleton key={`todo ${index}`} classes="base" />)
    }
    return list;
}

export default SkeletonTodo;
