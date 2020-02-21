import React, {useEffect, useState} from "react";
import "../style.css"
import {Button, Card, Progress} from "antd";
import MetricsButtonGroup from "../MetricsButtonGroup";

const values = {
    "AV:N": 0.85,
    "AV:A": 0.62,
    "AV:L": 0.55,
    "AV:P": 0.2,
    "AC:L": 0.77,
    "AC:H": 0.44,
    "PR:N": 0.85,
    "PR:L": [0.62, 0.68],
    "PR:H": [0.27, 0.5],
    "UI:N": 0.85,
    "UI:R": 0.62,
    "S:U": 0,
    "S:C": 1,
    "C:N": 0.0,
    "C:L": 0.22,
    "C:H": 0.56,
    "I:N": 0.0,
    "I:L": 0.22,
    "I:H": 0.56,
    "A:N": 0.0,
    "A:L": 0.22,
    "A:H": 0.56,
};

const BaseScoreCard = (props) => {

     const {setScore, setC, setA, setI, setAV, setAC, setPR, setUI, setS} = props;

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
        let S = choices["S"];
        let impactBase = 1 - ((1 - choices["C"]) * (1 - choices["I"]) * (1 - choices["A"]));
        let impact = S === 0 ? 6.42 * impactBase : 7.52 * (impactBase - 0.029) - 3.25 * Math.pow(impactBase - 0.02, 15);
        let exploitability = 8.22 * choices["AV"] * choices["AC"] * (Array.isArray(choices["PR"]) ?
                choices["PR"][S] : choices["PR"]
            ) * choices["UI"];
        let result = impact <= 0 ? 0 : (S === 0 ? Math.min(impact + exploitability, 10).toFixed(1)
            : Math.min(1.08 * (impact + exploitability), 10).toFixed(1));
        setResult(result);
        setScore(result);
        setC(choices["C"]);
        setA(choices["A"]);
        setI(choices["I"]);
        setAV(choices["AV"]);
        setAC(choices["AC"]);
        setPR(choices["PR"]);
        setUI(choices["UI"]);
        setS(S);
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
                        title={"Вектор атаки (AV):"}
                        k={"AV"}
                        first={{color: "red-button", name: "Сетевой (N)", k: "N"}}
                        second={{color: "yellow-button", name: "Смежная сеть (A)", k: "A"}}
                        third={{color: "green-button", name: "Локальный (L)", k: "L"}}
                        forth={{color: "blue-button", name: "Физический (P)", k: "P"}}
                        onClick={onClick}/>
                </div>
                <div className="metrics">
                    <MetricsButtonGroup
                        title={"Сложность атаки (AC):"}
                        k={"AC"}
                        first={{color: "green-button", name: "Высокая (H)", k: "H"}}
                        second={{color: "red-button", name: "Низкая (L)", k: "L"}}
                        onClick={onClick}/>
                </div>
                <div className="metrics">
                    <MetricsButtonGroup
                        title={"Уровень привилегий (PR):"}
                        k={"PR"}
                        first={{color: "green-button", name: "Высокий (H)", k: "H"}}
                        second={{color: "yellow-button", name: "Низкий (L)", k: "L"}}
                        third={{color: "red-button", name: "Не требуется (N)", k: "N"}}
                        onClick={onClick}/>
                </div>
                <div className="metrics">
                    <MetricsButtonGroup
                        title={"Взаимодействие с пользователем (UI):"}
                        k={"UI"}
                        first={{color: "green-button", name: "Требуется (R)", k: "R"}}
                        second={{color: "red-button", name: "Не требуется (N)", k: "N"}}
                        onClick={onClick}/>
                </div>
                <div className="metrics">
                    <MetricsButtonGroup
                        title={"Влияние на другие компоненты системы (S):"}
                        k={"S"}
                        first={{color: "green-button", name: "Не оказывает (U)", k: "U"}}
                        second={{color: "red-button", name: "Оказывает (C)", k: "C"}}
                        onClick={onClick}/>
                </div>
                <div className="metrics">
                    <MetricsButtonGroup
                        title={"Влияние на конфиденциальность (С):"}
                        k={"C"}
                        first={{color: "green-button", name: "Не оказывает (N)", k: "N"}}
                        second={{color: "yellow-button", name: "Низкое (L)", k: "L"}}
                        third={{color: "red-button", name: "Высокое (H)", k: "H"}}
                        onClick={onClick}/>
                </div>
                <div className="metrics">
                    <MetricsButtonGroup
                        title={"Влияние на целостность (I):"}
                        k={"I"}
                        first={{color: "green-button", name: "Не оказывает (N)", k: "N"}}
                        second={{color: "yellow-button", name: "Низкое (L)", k: "L"}}
                        third={{color: "red-button", name: "Высокое (H)", k: "H"}}
                        onClick={onClick}/>
                </div>
                <div className="metrics">
                    <MetricsButtonGroup
                        title={"Влияние на доступность (A):"}
                        k={"A"}
                        first={{color: "green-button", name: "Не оказывает (N)", k: "N"}}
                        second={{color: "yellow-button", name: "Низкое (L)", k: "L"}}
                        third={{color: "red-button", name: "Высокое (H)", k: "H"}}
                        onClick={onClick}/>
                </div>

            </Card>
        </>
    );
};

export default BaseScoreCard;

