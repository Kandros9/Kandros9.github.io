import React from "react";
import "./style.css"
import {Radio} from "antd";


const MetricsButtonGroup = (props) => {

    const {title, k, first, second, third, forth, fifth, sixth, onClick} = props;

    return (
        <>
            <h3>{title}</h3>
            <Radio.Group className="score" onChange={onClick}>
                <Radio.Button className={first.color} value={k + ":" + first.k}>{first.name}</Radio.Button>
                <Radio.Button className={second.color} value={k + ":" + second.k}>{second.name}</Radio.Button>
                {third && <Radio.Button className={third.color} value={k + ":" + third.k}>{third.name}</Radio.Button>}
                {forth && <Radio.Button className={forth.color} value={k + ":" + forth.k}>{forth.name}</Radio.Button>}
                {fifth && <Radio.Button className={fifth.color} value={k + ":" + fifth.k}>{fifth.name}</Radio.Button>}
                {sixth && <Radio.Button className={sixth.color} value={k + ":" + sixth.k}>{sixth.name}</Radio.Button>}
            </Radio.Group>
        </>
    );
};

export default MetricsButtonGroup;

