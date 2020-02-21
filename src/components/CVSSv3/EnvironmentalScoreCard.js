import React, {useState} from "react";
import "../style.css"
import {Card, Progress} from "antd";
import MetricsButtonGroup from "../MetricsButtonGroup";

const values = {
    "MAV:X": 0,
    "MAV:N": 0.85,
    "MAV:A": 0.62,
    "MAV:L": 0.55,
    "MAV:P": 0.2,
    "MAC:X": 0,
    "MAC:L": 0.77,
    "MAC:H": 0.44,
    "MPR:X": 0,
    "MPR:N": 0.85,
    "MPR:L": [0.62, 0.68],
    "MPR:H": [0.27, 0.5],
    "MUI:X": 0,
    "MUI:N": 0.85,
    "MUI:R": 0.62,
    "MS:X": 0,
    "MS:U": 0,
    "MS:C": 1,
    "MC:X": 0,
    "MC:N": 0.0,
    "MC:L": 0.22,
    "MC:H": 0.56,
    "MI:X": 0,
    "MI:N": 0.0,
    "MI:L": 0.22,
    "MI:H": 0.56,
    "MA:X": 0,
    "MA:N": 0.0,
    "MA:L": 0.22,
    "MA:H": 0.56,
    "CR:X": 1.0,
    "CR:H": 1.5,
    "CR:M": 1.0,
    "CR:L": 0.5,
    "IR:X": 1.0,
    "IR:H": 1.5,
    "IR:M": 1.0,
    "IR:L": 0.5,
    "AR:X": 1.0,
    "AR:H": 1.5,
    "AR:M": 1.0,
    "AR:L": 0.5,
};

const EnvironmentalScoreCard = (props) => {

    const {C, A, I, RL, RC, E, AV, AC, PR, UI, S} = props;
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
        values['MAV:X'] = AV;
        values['MAC:X'] = AC;
        values['MPR:X'] = PR;
        values['MUI:X'] = UI;
        values['MS:X'] = S;
        values['MC:X'] = C;
        values['MI:X'] = I;
        values['MA:X'] = A;

        let MS = choices["MS"];
        let MExploitability = 8.22 * choices["MAV"] * choices["MAC"] * (Array.isArray(choices["MPR"]) ?
            choices["MPR"][MS] : choices["MPR"]) * choices["MUI"];
        let MImpactBase = Math.min((1 - (1 - choices["MC"] * choices["CR"]) * (1 - choices["MI"] * choices["IR"]) * (1 - choices["MA"] * choices["AR"])), 0.915);
        let MImpact = MS === 0 ? 6.42 * MImpactBase : 7.52 * (MImpactBase - 0.029) - 3.25 * Math.pow(MImpactBase - 0.02, 15);
        let result = MImpact <= 0 ? 0 : (MS === 0 ? (Math.min(MImpact + MExploitability, 10).toFixed(1) * E * RL * RC).toFixed(1)
            : (Math.min(1.08 * (MImpact + MExploitability), 10).toFixed(1)* E * RL * RC).toFixed(1));
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
                <h3>Вектор атаки (корр.) (MAV):</h3>
                <MetricsButtonGroup
                    k={"MAV"}
                    first={{color: "blue-button", name: "Не определено (X)", k: "X"}}
                    second={{color: "red-button", name: "Сетевой (N)", k: "N"}}
                    third={{color: "yellow-button", name: "Смежная сеть (A)", k: "A"}}
                    forth={{color: "green-button", name: "Локальный (L)", k: "L"}}
                    fifth={{color: "blue-button", name: "Физический (P)", k: "P"}}
                    onClick={onClick}/>
            </div>
            <div className="metrics">
                <h3>Сложность атаки (корр.) (MAC):</h3>
                <MetricsButtonGroup
                    k={"MAC"}
                    first={{color: "blue-button", name: "Не определено (X)", k: "X"}}
                    second={{color: "green-button", name: "Высокая (H)", k: "H"}}
                    third={{color: "red-button", name: "Низкая (L)", k: "L"}}
                    onClick={onClick}/>
            </div>
            <div className="metrics">
                <h3>Уровень привилегий (корр.) (MPR):</h3>
                <MetricsButtonGroup
                    k={"MPR"}
                    first={{color: "blue-button", name: "Не определено (X)", k: "X"}}
                    second={{color: "green-button", name: "Высокий (H)", k: "H"}}
                    third={{color: "yellow-button", name: "Низкий (L)", k: "L"}}
                    forth={{color: "red-button", name: "Не требуется (N)", k: "N"}}
                    onClick={onClick}/>
            </div>
            <div className="metrics">
                <h3>Взаимодействие с пользователем (корр.) (MUI):</h3>
                <MetricsButtonGroup
                    k={"MUI"}
                    first={{color: "blue-button", name: "Не определено (X)", k: "X"}}
                    second={{color: "green-button", name: "Требуется (R)", k: "R"}}
                    third={{color: "red-button", name: "Не требуется (N)", k: "N"}}
                    onClick={onClick}/>
            </div>
            <div className="metrics">
                <h3>Влияние на другие компоненты системы (корр.) (MS):</h3>
                <MetricsButtonGroup
                    k={"MS"}
                    first={{color: "blue-button", name: "Не определено (X)", k: "X"}}
                    second={{color: "green-button", name: "Не оказывает (U)", k: "U"}}
                    third={{color: "red-button", name: "Оказывает (C)", k: "C"}}
                    onClick={onClick}/>
            </div>
            <div className="metrics">
                <h3>Влияние на конфиденциальность (корр.) (MС):</h3>
                <MetricsButtonGroup
                    k={"MC"}
                    first={{color: "blue-button", name: "Не определено (X)", k: "X"}}
                    second={{color: "green-button", name: "Не оказывает (N)", k: "N"}}
                    third={{color: "yellow-button", name: "Низкое (L)", k: "L"}}
                    forth={{color: "red-button", name: "Высокое (H)", k: "H"}}
                    onClick={onClick}/>
            </div>
            <div className="metrics">
                <h3>Влияние на целостность (корр.) (MI):</h3>
                <MetricsButtonGroup
                    k={"MI"}
                    first={{color: "blue-button", name: "Не определено (X)", k: "X"}}
                    second={{color: "green-button", name: "Не оказывает (N)", k: "N"}}
                    third={{color: "yellow-button", name: "Низкое (L)", k: "L"}}
                    forth={{color: "red-button", name: "Высокое (H)", k: "H"}}
                    onClick={onClick}/>
            </div>
            <div className="metrics">
                <h3>Влияние на доступность (корр.) (MA):</h3>
                <MetricsButtonGroup
                    k={"MA"}
                    first={{color: "blue-button", name: "Не определено (X)", k: "X"}}
                    second={{color: "green-button", name: "Не оказывает (N)", k: "N"}}
                    third={{color: "yellow-button", name: "Низкое (L)", k: "L"}}
                    forth={{color: "red-button", name: "Высокое (H)", k: "H"}}
                    onClick={onClick}/>
            </div>
            <div className="metrics">
                <h3>Требования к конфиденциальности (CR):</h3>
                <MetricsButtonGroup
                    k={"CR"}
                    first={{color: "yellow-button", name: "Не определено (X)", k: "X"}}
                    second={{color: "green-button", name: "Низкие (L)", k: "L"}}
                    third={{color: "yellow-button", name: "Средние (M)", k: "M"}}
                    forth={{color: "red-button", name: "Высокие (H)", k: "H"}}
                    onClick={onClick}/>
            </div>
            <div className="metrics">
                <h3>Требования к целостности (IR):</h3>
                <MetricsButtonGroup
                    k={"IR"}
                    first={{color: "yellow-button", name: "Не определено (X)", k: "X"}}
                    second={{color: "green-button", name: "Низкие (L)", k: "L"}}
                    third={{color: "yellow-button", name: "Средние (M)", k: "M"}}
                    forth={{color: "red-button", name: "Высокие (H)", k: "H"}}
                    onClick={onClick}/>
            </div>
            <div className="metrics">
                <h3>Требования к доступности (AR):</h3>
                <MetricsButtonGroup
                    k={"AR"}
                    first={{color: "yellow-button", name: "Не определено (X)", k: "X"}}
                    second={{color: "green-button", name: "Низкие (L)", k: "L"}}
                    third={{color: "yellow-button", name: "Средние (M)", k: "M"}}
                    forth={{color: "red-button", name: "Высокие (H)", k: "H"}}
                    onClick={onClick}/>
            </div>
        </Card>
    );
};

export default EnvironmentalScoreCard;

