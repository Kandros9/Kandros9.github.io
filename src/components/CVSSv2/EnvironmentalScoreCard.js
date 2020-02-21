import React, {useState} from "react";
import "../style.css"
import {Card, Progress} from "antd";
import MetricsButtonGroup from "../MetricsButtonGroup";

const values = {
    "CDP:ND": 0.0,
    "CDP:N": 0.0,
    "CDP:L": 0.1,
    "CDP:LM": 0.3,
    "CDP:M": 0.4,
    "CDP:H": 0.5,
    "TD:ND": 1.0,
    "TD:N": 0.0,
    "TD:LM": 0.25,
    "TD:M": 0.75,
    "TD:H": 1.0,
    "CR:ND": 1.0,
    "CR:L": 0.5,
    "CR:LM": 1.0,
    "CR:H": 1.51,
    "IR:ND": 1.0,
    "IR:L": 0.5,
    "IR:LM": 1.0,
    "IR:H": 1.51,
    "AR:ND": 1.0,
    "AR:L": 0.5,
    "AR:LM": 1.0,
    "AR:H": 1.51,
};

const EnvironmentalScoreCard = (props) => {

    const {C, A, exploitability, fImpact, RL, RC, E, I} = props;
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
        let adjustedImpact = Math.min(10, 10.41 * (1 - (1 - C * choices["CR"]) * (1 - I * choices["IR"]) * (1 - A * choices["AR"])));
        let adjustedBaseScore = (((0.6 * adjustedImpact) + (0.4 * exploitability) - 1.5) * fImpact);
        let adjustedTemporal = adjustedBaseScore * E * RL * RC;
        let result = ((adjustedTemporal + (10 - adjustedTemporal) * choices["CDP"]) * choices["TD"]);
        setResult(result);
    };

    return (
        <Card title="Контекстные метрики" bordered={false}>
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
                <h3>Вероятность нанесения косвенного ущерба (CDP):</h3>
                <MetricsButtonGroup
                    k={"CDP"}
                    first={{color: "green-button", name: "Не определено (ND)", k: "ND"}}
                    second={{color: "green-button", name: "Отсутствует (N)", k: "N"}}
                    third={{color: "yellow-button", name: "Низкая (L)", k: "L"}}
                    forth={{color: "yellow-button", name: "Средняя(LM)", k: "LM"}}
                    fifth={{color: "red-button", name: "Повышенная(M)", k: "M"}}
                    sixth={{color: "red-button", name: "Высокая (H)", k: "H"}}
                    onClick={onClick}/>
            </div>
            <div className="metrics">
                <h3>Плотность целей (TD):</h3>
                <MetricsButtonGroup
                    k={"TD"}
                    first={{color: "green-button", name: "Не определено (ND)", k: "ND"}}
                    second={{color: "green-button", name: "Отсутствует (N)", k: "N"}}
                    third={{color: "yellow-button", name: "Низкая (L)", k: "L"}}
                    forth={{color: "yellow-button", name: "Средняя(LM)", k: "LM"}}
                    fifth={{color: "red-button", name: "Высокая (H)", k: "H"}}
                    onClick={onClick}/>
            </div>
            <div className="metrics">
                <h3>Требования к конфиденциальности:</h3>
                <MetricsButtonGroup
                    k={"CR"}
                    first={{color: "green-button", name: "Не определено (ND)", k: "ND"}}
                    second={{color: "green-button", name: "Низкая (L)", k: "L"}}
                    third={{color: "yellow-button", name: "Средняя(LM)", k: "LM"}}
                    forth={{color: "red-button", name: "Высокая (H)", k: "H"}}
                    onClick={onClick}/>
            </div>
            <div className="metrics">
                <h3>Требования к целостности:</h3>
                <MetricsButtonGroup
                    k={"IR"}
                    first={{color: "green-button", name: "Не определено (ND)", k: "ND"}}
                    second={{color: "green-button", name: "Низкая (L)", k: "L"}}
                    third={{color: "yellow-button", name: "Средняя(LM)", k: "LM"}}
                    forth={{color: "red-button", name: "Высокая (H)", k: "H"}}
                    onClick={onClick}/>
            </div>
            <div className="metrics">
                <h3>Требования к доступности:</h3>
                <MetricsButtonGroup
                    k={"AR"}
                    first={{color: "green-button", name: "Не определено (ND)", k: "ND"}}
                    second={{color: "green-button", name: "Низкая (L)", k: "L"}}
                    third={{color: "yellow-button", name: "Средняя(LM)", k: "LM"}}
                    forth={{color: "red-button", name: "Высокая (H)", k: "H"}}
                    onClick={onClick}/>
            </div>
        </Card>
    );
};

export default EnvironmentalScoreCard;

