import React, {useState} from "react";
import "../style.css"
import {Card, Progress} from "antd";
import MetricsButtonGroup from "../MetricsButtonGroup";

const values = {
    "AV:L": 0.395,
    "AV:A": 0.646,
    "AV:N": 1.0,
    "AC:H": 0.35,
    "AC:M": 0.61,
    "AC:L": 0.71,
    "Au:M": 0.45,
    "Au:S": 0.56,
    "Au:N": 0.704,
    "C:N": 0.0,
    "C:P": 0.275,
    "C:C": 0.66,
    "I:N": 0.0,
    "I:P": 0.275,
    "I:C": 0.66,
    "A:N": 0.0,
    "A:P": 0.275,
    "A:C": 0.66,
};

const BaseScoreCard = (props) => {

    const {setScore, setC, setA, setExp, setFImpact, setI} = props;

    const [choices, setChoices] = useState([]);
    const [result, setResult] = useState(0);

    const onClick = (e) => {
        //document.getElementById(e.target.name).focus();
        let [k1, k2] = e.target.value.split(":");
        let newChoices = choices;
        newChoices[k1] = values[e.target.value];
        setChoices(newChoices);
        calc()
    };

    const calc = () => {
        let impact = 10.41 * (1 - (1 - choices["C"]) * (1 - choices["I"]) * (1 - choices["A"]));
        let exploitability = 20 * choices["AV"] * choices["AC"] * choices["Au"];
        let f_impact = impact === 0 ? 0 : 1.176;
        let result = (((0.6 * impact) + (0.4 * exploitability) - 1.5) * f_impact).toFixed(1);
        setResult(result);
        setScore(result);
        setC(choices["C"]);
        setA(choices["A"]);
        setExp(exploitability);
        setFImpact(f_impact);
        setI(choices["I"]);
    };

    return (
        <>
            <Card title="Базовые метрики" bordered={false}>
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
                    <MetricsButtonGroup
                        title={"Способ получения доступа (AV):"}
                        k={"AV"}
                        first={{color: "green-button", name: "Локальный (L)", k: "L"}}
                        second={{color: "yellow-button", name: "Смежная сеть (A)", k: "A"}}
                        third={{color: "red-button", name: "Сетевой (N)", k: "N"}}
                        onClick={onClick}/>
                </div>
                <div className="metrics">
                    <MetricsButtonGroup
                        title={"Сложность получения доступа (AC):"}
                        k={"AC"}
                        first={{color: "green-button", name: "Высокая (H)", k: "H"}}
                        second={{color: "yellow-button", name: "Средняя (M)", k: "M"}}
                        third={{color: "red-button", name: "Низкая (L)", k: "L"}}
                        onClick={onClick}/>
                </div>
                <div className="metrics">
                    <MetricsButtonGroup
                        title={"Аутентификация (Au):"}
                        k={"Au"}
                        first={{color: "green-button", name: "Множественная (M)", k: "M"}}
                        second={{color: "yellow-button", name: "Единственная (S)", k: "S"}}
                        third={{color: "red-button", name: "Не требуется (N)", k: "N"}}
                        onClick={onClick}/>
                </div>
                <div className="metrics">
                    <MetricsButtonGroup
                        title={"Влияние на конфиденциальность (С):"}
                        k={"C"}
                        first={{color: "green-button", name: "Не оказывает (N)", k: "N"}}
                        second={{color: "yellow-button", name: "Частичное (P)", k: "P"}}
                        third={{color: "red-button", name: "Полное (C)", k: "C"}}
                        onClick={onClick}/>
                </div>
                <div className="metrics">
                    <MetricsButtonGroup
                        title={"Влияние на целостность (I):"}
                        k={"I"}
                        first={{color: "green-button", name: "Не оказывает (N)", k: "N"}}
                        second={{color: "yellow-button", name: "Частичное (P)", k: "P"}}
                        third={{color: "red-button", name: "Полное (C)", k: "C"}}
                        onClick={onClick}/>
                </div>
                <div className="metrics">
                    <MetricsButtonGroup
                        title={"Влияние на доступность (A):"}
                        k={"A"}
                        first={{color: "green-button", name: "Не оказывает (N)", k: "N"}}
                        second={{color: "yellow-button", name: "Частичное (P)", k: "P"}}
                        third={{color: "red-button", name: "Полное (C)", k: "C"}}
                        onClick={onClick}/>
                </div>

            </Card>
        </>
    );
};

export default BaseScoreCard;

