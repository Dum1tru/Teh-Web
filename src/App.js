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
        setCardData((prevData) => ({ ...prevData, cvv: value }));
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

    const dynamicCardData = [
        {
            title: 'Cardul 1',
            content: (
                <div>
                    <label>Card Number:</label>
                    <input
                        type="text"
                        value={cardData.cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        maxLength={16}
                        pattern="\d{16}"
                        title="Please enter a 16-digit card number"
                        required
                    />
                    <br />

                    <label>Expiration Date:</label>
                    <input
                        type="text"
                        value={cardData.expirationDate}
                        onChange={(e) => handleExpirationDateChange(e.target.value)}
                        placeholder="MM/YYYY"
                        required
                    />
                    <br />

                    <label>CVV:</label>
                    <input
                        type="text"
                        value={cardData.cvv}
                        onChange={(e) => handleCVVChange(e.target.value)}
                        maxLength={3}
                        pattern="\d{3}"
                        title="Please enter a 3-digit CVV"
                        required
                    />
                    <br />

                    <label>Card Holder:</label>
                    <input
                        type="text"
                        value={cardData.cardHolder}
                        onChange={(e) => handleCardHolderChange(e.target.value)}
                        required
                    />
                    <br />

                    <button className="button" onClick={handleSaveClick}>
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