import React, { useState } from 'react';
import { Layout, Menu, Button, Card } from 'antd';
import { FirstInterface, SecondInterface } from './App';
import styles from './App.css';
import { Store, Action, AnyAction } from 'redux';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    CreditCardOutlined,
    ContactsOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const exampleObject1: FirstInterface = {
    field1: 'value1',
    field2: 42,
    field3: true,
    field4: ['item1', 'item2'],
    field5: { key: 'example', value: 10 },
};

const exampleObject2: SecondInterface = {
    field1: 'value1',
    field2: 42,
    field3: true,
    field4: ['item1', 'item2'],
    field5: { key: 'example', value: 10 },
    additionalField1: 'extraValue1',
    additionalField2: false,
}


const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);
    const [cardData, setCardData] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardHolder: '',
    });
    const [submittedData, setSubmittedData] = useState(null);

    const handleCardNumberChange = (value) => {
        const numericValue = value.replace(/\D/g, '');
        setCardData((prevData) => ({ ...prevData, cardNumber: numericValue }));

    };

    const handleExpirationDateChange = (value) => {
        setCardData((prevData) => ({ ...prevData, expirationDate: value }));

    };

    const handleCVVChange = (value) => {
        // Elimină orice caracter care nu este cifră
        const sanitizedValue = value.replace(/\D/g, '');
        // Verifică dacă lungimea este maxim 3 cifre
        if (sanitizedValue.length <= 3) {
            setCardData((prevData) => ({ ...prevData, cvv: sanitizedValue }));
        }
    };

    const handleCardHolderChange = (value) => {
        const alphabeticValue = value.replace(/[^a-zA-Z\s]/g, '');
        setCardData((prevData) => ({ ...prevData, cardHolder: alphabeticValue }));
    };

    const handleSaveClick = () => {
        // Extract data from cardData state
        const { cardNumber, expirationDate, cvv, cardHolder } = cardData;

        // Simulate saving the data (you can replace this with your actual save logic)
        localStorage.setItem('savedCardData', JSON.stringify({ cardNumber, expirationDate, cvv, cardHolder }));

        // Set submitted data to be displayed
        setSubmittedData({ cardNumber, expirationDate, cvv, cardHolder });
    };

    const handleMenuClick = ({ key }) => {
        setSelectedMenuItem(key);
    };

    const handleRegisterLoginClick = () => {

        console.log('Navigare către pagina de înregistrare sau autentificare...');
    };

    const dynamicCardData = [
        {
            title: 'Cardul 1',
            content: (
                <div>

                    <center>

                        <input
                            className="input1"
                            type="text"
                            placeholder="xxxx xxxx xxxx xxxx"
                            value={cardData.cardNumber}
                            onChange={(e) => handleCardNumberChange(e.target.value)}
                            maxLength={16}
                            pattern="\d{16}"
                            title="Please enter a 16-digit card number"
                            required
                        />
                    </center>
                    <br />


                    <center>

                        <input
                            className="input1"
                            type="text"
                            value={cardData.expirationDate}
                            onChange={(e) => handleExpirationDateChange(e.target.value)}
                            placeholder="MM/YY"
                            required
                        />
                    </center>
                    <br/>


                    <center>

                        <input
                            className="input1"
                            type="text"
                            placeholder="CVV"
                            value={cardData.cvv}
                            onChange={(e) => handleCVVChange(e.target.value)}
                            maxLength={3}
                            pattern="\d{3}"
                            title="Please enter a 3-digit CVV"
                            required
                        />
                    </center>
                    <br />


                    <center>

                        <input
                            className="input1"
                            type="text"
                            placeholder="Nume Prenume"
                            value={cardData.cardHolder}
                            onChange={(e) => handleCardHolderChange(e.target.value)}
                            required
                        />
                    </center>
                    <br />
                    <center>
                        <button className="button1" onClick={handleSaveClick} >
                            Submit
                        </button>
                    </center>

                </div>
            ),
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} width={160} theme="dark">
                <Menu
                    theme="dark"
                    mode="vertical"
                    selectedKeys={[selectedMenuItem]}
                    onClick={handleMenuClick}
                >
                    {/* Sidebar Menu with Items */}
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        Home
                    </Menu.Item>
                    <Menu.Item key="2" icon={<CreditCardOutlined />}>
                        Cardurile
                    </Menu.Item>
                    <Menu.Item key="3" icon={<ContactsOutlined />}>
                        Info
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    {/* Header */}
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                    {/* Al doilea buton pentru înregistrare sau autentificare */}
                    <Button
                        type="text"
                        icon={<UserOutlined />}
                        onClick={handleRegisterLoginClick}
                        style={{
                            fontSize: '16px',
                            margin: '0 16px',
                        }}
                    >
                        Register/Login
                    </Button>
                </Header>

                <Content style={{ margin: '16px' }}>
                    {/* Main Content Area with Dynamic Cards */}
                    {selectedMenuItem === '2' && (
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {dynamicCardData.map((card, index) => (
                                <Card key={index} title={card.title} style={{ margin: '16px 0' }}>
                                    {card.content}
                                </Card>
                            ))}
                        </div>
                    )}

                    {selectedMenuItem === '3' && (
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {submittedData && (
                                <div>
                                    <h2>Submitted Data:</h2>
                                    <p>Card Number: {submittedData.cardNumber}</p>
                                    <p>Expiration Date: {submittedData.expirationDate}</p>
                                    <p>CVV: {submittedData.cvv}</p>
                                    <p>Card Holder: {submittedData.cardHolder}</p>
                                </div>
                            )}
                        </div>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;