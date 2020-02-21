import React, {useState} from "react";
import {Col, Row} from 'antd';
import "../style.css"
import BaseScoreCard from "./BaseScoreCard";
import TemporalScoreCard from "./TemporalScoreCard";
import EnvironmentalScoreCard from "./EnvironmentalScoreCard";


const CVSSv2 = () => {

    const [baseScore, setBaseScore] = useState(0);
    const [C, setC] = useState(0);
    const [A, setA] = useState(0);
    const [I, setI] = useState(0);
    const [exploitability, setExploitability] = useState(0);
    const [fImpact, setFImpact] = useState(0);
    const [RL, setRL] = useState(0);
    const [RC, setRC] = useState(0);
    const [E, setE] = useState(0);

    return (
        <Row gutter={16}>
            <Col span={8}>
                <BaseScoreCard setScore={setBaseScore} setC={setC} setA={setA} setExp={setExploitability} setFImpact={setFImpact} setI={setI}/>
            </Col>
            <Col span={8}>
                <TemporalScoreCard baseScore={baseScore} setRL={setRL} setRC={setRC} setE={setE}/>
            </Col>
            <Col span={8}>
                <EnvironmentalScoreCard C={C} A={A} I={I} exploitability={exploitability} fImpact={fImpact} E={E} RL={RL} RC={RC}/>
            </Col>
        </Row>
    );
}

export default CVSSv2;
