import React from 'react';
import { Divider, Collapse } from 'antd';
import TwitterUser from '../components/TwitterUser';
import KeyWord from '../components/KeyWord';

const items = [
    {
        key: '1',
        label: '监控的Twitter账号',
        children: <TwitterUser />,
    },
    {
        key: '2',
        label: '监控的关键词',
        children: <KeyWord />,
    },
    {
        key: '3',
        label: '监控频率',
        children: <p>轮询时间间隔</p>,
    },
];

export async function getStaticProps({ params }) {
    return { props: {  } };
}
const IndexPage = () => {
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <div style={{ maxWidth: 720, margin: 'auto' }}>
            <Divider orientation="center">监控规则</Divider>
            <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
            <Divider orientation="center">通知设置</Divider>
        </div>
    );
};

export default IndexPage;
