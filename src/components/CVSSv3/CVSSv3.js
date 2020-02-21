import React, {useState} from "react";
import {Col, Row} from 'antd';
import "../style.css"
import BaseScoreCard from "./BaseScoreCard";
import TemporalScoreCard from "./TemporalScoreCard";
import EnvironmentalScoreCard from "./EnvironmentalScoreCard";


const CVSSv3 = () => {

    const [baseScore, setBaseScore] = useState(0);
    const [C, setC] = useState(0);
    const [A, setA] = useState(0);
    const [I, setI] = useState(0);
    const [RL, setRL] = useState(0);
    const [RC, setRC] = useState(0);
    const [E, setE] = useState(0);
    const [AV, setAV] = useState(0);
    const [AC, setAC] = useState(0);
    const [PR, setPR] = useState(0);
    const [UI, setUI]  = useState(0);
    const [S, setS] = useState(0);

    return (
        <Row gutter={16}>
            <Col span={8}>
                <BaseScoreCard setScore={setBaseScore} setC={setC} setA={setA} setI={setI} setAV={setAV} setAC={setAC} setPR={setPR} setUI={setUI} setS={setS}/>
            </Col>
            <Col span={8}>
                <TemporalScoreCard baseScore={baseScore} setRL={setRL} setRC={setRC} setE={setE}/>
            </Col>
            <Col span={8}>
                <EnvironmentalScoreCard C={C} A={A} I={I} E={E} RL={RL} RC={RC} AV={AV} AC={AC} PR={PR} UI={UI} S={S}/>
            </Col>
        </Row>
    );
};

export default CVSSv3;
