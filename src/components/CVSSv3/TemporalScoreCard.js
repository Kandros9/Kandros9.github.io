import React, {useEffect, useState} from "react";
import "../style.css"
import {Button, Card, Progress} from "antd";
import MetricsButtonGroup from "../MetricsButtonGroup";

const values = {
    "E:X": 1.0,
    "E:U": 0.91,
    "E:P": 0.94,
    "E:F": 0.97,
    "E:H": 1.0,
    "RL:X": 1.0,
    "RL:O": 0.95,
    "RL:T": 0.96,
    "RL:W": 0.97,
    "RL:U": 1.0,
    "RC:X": 1.0,
    "RC:U": 0.92,
    "RC:R": 0.96,
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
                <h3>Доступность средств эксплуатации (E):</h3>
                <MetricsButtonGroup
                    k={"E"}
                    first={{color: "red-button", name: "Не определено (X)", k: "X"}}
                    second={{color: "red-button", name: "Высокая (H)", k: "H"}}
                    third={{color: "yellow-button", name: "Есть сценарий (F)", k: "F"}}
                    forth={{color: "green-button", name: "Есть PoC-код (P)", k: "P"}}
                    fifth={{color: "blue-button", name: "Теоретически (U)", k: "U"}}
                    onClick={onClick}/>
            </div>
            <div className="metrics">
                <h3>Доступность средств устранения (RL):</h3>
                <MetricsButtonGroup
                    k={"RL"}
                    first={{color: "red-button", name: "Не определено (X)", k: "X"}}
                    second={{color: "red-button", name: "Недоступно (U)", k: "U"}}
                    third={{color: "yellow-button", name: "Рекомендации (W)", k: "W"}}
                    forth={{color: "green-button", name: "Временное (T)", k: "T"}}
                    fifth={{color: "blue-button", name: "Официальное (O)", k: "O"}}
                    onClick={onClick}/>
            </div>
            <div className="metrics">
                <h3>Степень доверия к информации об уязвимости (RC):</h3>
                <MetricsButtonGroup
                    k={"RC"}
                    first={{color: "red-button", name: "Не определено (X)", k: "X"}}
                    second={{color: "red-button", name: "Подтверждена (C)", k: "C"}}
                    third={{color: "yellow-button", name: "Достоверные отчёты (R)", k: "R"}}
                    forth={{color: "green-button", name: "Отчёты (U)", k: "U"}}
                    onClick={onClick}/>
            </div>
        </Card>
    );
};

export default TemporalScoreCard;

