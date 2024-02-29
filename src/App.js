import React, { useState } from 'react';
import { Layout, Menu, Button, Card } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    CreditCardOutlined,
    ContactsOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

    const handleCardNumberChange = (value) => {
        /// Eliminați orice caracter non-numeric din valoare
        const numericValue = value.replace(/\D/g, '');

        // Actualizați starea doar dacă valoarea a fost modificată
        if (numericValue !== value) {
            value = numericValue;
        }
        console.log('Card number changed:', numericValue);
    };

    const handleExpirationDateChange = (value) => {
        // Adaugă logica pentru data de expirare
        console.log('Expiration date changed:', value);
    };

    const handleCVVChange = (value) => {
        // Adaugă logica pentru CVV
        console.log('CVV changed:', value);
    };

    const handleCardHolderChange = (value) => {
        // Elimină orice caracter care nu este literă
        const alphabeticValue = value.replace(/[^a-zA-Z\s]/g, '');

        // Adaugă orice altă logică necesară
        console.log('Card holder changed:', alphabeticValue);
    };

    const handleButtonClick = () => {
        // Adaugă logica pentru butonul de submit
        alert('Button clicked!');
    };

    const handleMenuClick = ({ key }) => {
        setSelectedMenuItem(key);
    };

    const cardData = [
        {
            title: 'Cardul 1',
            content: (
                <div>
                    <div>
                        <p>Nr.card:</p>

                    <input
                        //type="tel"
                        placeholder="XXXXXXXXXXXX"
                        pattern="\d{16}"
                        maxLength="16"
                        type="number"
                        className="medium-input"
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                    />
                    </div>

                    <div>
                        <p>Data expirare:</p>
                        <input
                            type="text"
                            placeholder="MM/YY"
                            pattern="\d{4}"
                            maxLength="4"
                            type="number"
                            className="small-input"
                            onChange={(e) => handleExpirationDateChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>CVV:</p>
                        <input
                            type="text"
                            placeholder="XXX"
                            pattern="\d{3}"
                            maxLength="3"
                            type="number"
                            className="small-input"
                            onChange={(e) => handleCVVChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>Card holder:</p>
                        <input
                            type="text"
                            placeholder="Numele Prenumele"
                            className="medium-input"
                            onChange={(e) => handleCardHolderChange(e.target.value)}
                        />
                    </div>
                    <button className="button" onClick={handleButtonClick}>
                        Submit
                    </button>
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
                </Header>

                <Content style={{ margin: '16px' }}>
                    {/* Main Content Area with Dynamic Cards */}
                    {selectedMenuItem === '2' && (
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {cardData.map((card, index) => (
                                <Card key={index} title={card.title} style={{ margin: '16px 0' }}>
                                    {card.content}
                                </Card>
                            ))}

                        </div>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;