import React, {useState} from "react";
import {Layout, Menu} from 'antd';
import "./style.css"
import CVSSv2 from "./CVSSv2/CVSSv2";
import CVSSv3 from "./CVSSv3/CVSSv3";

const {Header, Content, Footer} = Layout;

const Main = () => {

    const [page, setPage] = useState(<CVSSv2/>);

    const renderPage = (item) => {
        if (item.key === "1"){
            setPage(<CVSSv2/>)
        } else setPage(<CVSSv3/>)
    };

    return (
        <div>
            <Layout>
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1" onClick={renderPage}>CVSSv2</Menu.Item>
                        <Menu.Item key="2" onClick={renderPage}>CVSSv3</Menu.Item>
                    </Menu>
                </Header>
                {/*    <span className="title"><b>CVSS</b> Calculator</span>*/}
                <Content>
                    <div style={{background: '#ECECEC', padding: '30px'}}>
                        {page}
                    </div>
                </Content>
                <Footer className="footer">CVSS Calc ©2020 Created by Evelina Ravilova</Footer>
            </Layout>
        </div>
    );
}

export default Main;
