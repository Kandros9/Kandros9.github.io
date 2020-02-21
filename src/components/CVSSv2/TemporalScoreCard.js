import React, {useState} from "react";
import "../style.css"
import {Card, Progress} from "antd";
import MetricsButtonGroup from "../MetricsButtonGroup";

const values = {
    "E:ND": 1.0,
    "E:U": 0.85,
    "E:POC": 0.9,
    "E:F": 0.95,
    "E:H": 1.0,
    "RL:ND": 1.0,
    "RL:OF": 0.87,
    "RL:TF": 0.9,
    "RL:W": 0.95,
    "RL:U": 1.0,
    "RC:ND": 1.0,
    "RC:UC": 0.9,
    "RC:UR": 0.95,
    "RC:C": 1.0,
};

const TemporalScoreCard = (props) => {

    const {baseScore, setRL, setRC, setE} = props;

    const [choices, setChoices] = useState({});
    const [result, setResult] = useState(0);

    const onClick = (e) => {
        let [k1, k2] = e.target.value.split(":");
        let newChoices = choices;
        newChoices[k1] = k2;
        setChoices(newChoices);
        newChoices[k1] = values[e.target.value];
        setChoices(newChoices);
        calc(choices)
    };

    const calc = () => {
        let result = (baseScore * choices["E"] * choices["RL"] * choices["RC"]).toFixed(1);
        setResult(result);
        setRL(choices["RL"]);
        setRC(choices["RC"]);
        setE(choices["E"])
    };

    return (
        <Card title="Временные метрики" bordered={false}>
            <Progress
                strokeColor={{
                    '0%': '#73d13d',
                    '100%': '#ff4d4f',
                }}
                percent={(!isNaN(result) ? result : 0) * 10}
                format={percent => `${percent / 10}`}
            /><br/>
            <div className="metrics">
                <br/>
                <h3>Возможость использования (E):</h3>
                <MetricsButtonGroup
                    k={"E"}
                    first={{color: "red-button", name: "Не определено (ND)", k: "ND"}}
                    second={{color: "green-button", name: "Теоретически (U)", k: "U"}}
                    third={{color: "yellow-button", name: "Есть концепция (POC)", k: "POC"}}
                    forth={{color: "yellow-button", name: "Есть сценарий (F)", k: "F"}}
                    fifth={{color: "red-button", name: "Высокая (H)", k: "H"}}
                    onClick={onClick}/>
            </div>
            <div className="metrics">
                <h3>Уровень исправления (RL):</h3>
                <MetricsButtonGroup
                    k={"RL"}
                    first={{color: "red-button", name: "Не определено (ND)", k: "ND"}}
                    second={{color: "green-button", name: "Официальное (OF)", k: "OF"}}
                    third={{color: "green-button", name: "Временное (T)", k: "T"}}
                    forth={{color: "yellow-button", name: "Рекомендации (W)", k: "W"}}
                    fifth={{color: "red-button", name: "Недоступно (U)", k: "U"}}
                    onClick={onClick}/>
            </div>
            <div className="metrics">
                <h3>Степень достоверности источника (RC):</h3>
                <MetricsButtonGroup
                    k={"RC"}
                    first={{color: "red-button", name: "Не определено (ND)", k: "ND"}}
                    second={{color: "green-button", name: "Не подтверждена (UC)", k: "UC"}}
                    third={{color: "yellow-button", name: "Не доказана (UR)", k: "UR"}}
                    forth={{color: "red-button", name: "Подтверждена (C)", k: "C"}}
                    onClick={onClick}/>
            </div>
        </Card>
    );
};

export default TemporalScoreCard;

