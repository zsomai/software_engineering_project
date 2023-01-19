import React from "react";
import "./static/detailed.css";

interface IProps {
    click: any;
}

const BackDrop = ({click}:IProps) => <div className="backdrop" onClick={click} />;

export default BackDrop;
