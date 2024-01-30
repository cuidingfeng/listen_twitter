import React, { useState, useCallback, useEffect } from 'react';
import { Space, Input, Button, Tag } from 'antd';
import styled from 'styled-components';
import { push, getUrl } from '../../lib/utils';

const StyleTag = styled(Tag)`
    padding: 5px 12px;
    font-size: 18px;
    .anticon{
        font-size: 14px;
    }
`

function TwitterUser(props) {
    const [inputValue, setInputValue] = useState('')
    const [users, setUsers] = useState([])
    const onChange = useCallback((e) => {
        setInputValue(e.target.value)
    }, [])
    const pullUser = useCallback(() => {
        getUrl('get_user', {
            u_id: '001'
        }).then(({ data }) => {
            setUsers(data.map(user => user.x_id));
        })
    }, [])
    const onAdd = useCallback(() => {
        push('save_user', {
            x_id: inputValue,
            u_id: '001'
        }).then(() => {
            setUsers([...users, inputValue])
            setInputValue('')
        })
    }, [users, inputValue])
    const onDelete = useCallback((x_id) => {
        push('delete_user', {
            x_id: x_id,
            u_id: '001'
        }).then(() => {
            pullUser()
        })
    }, [])
    useEffect(() => { 
        pullUser()
    }, [])
    return (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Space.Compact style={{ width: '100%' }}>
                <Input defaultValue="" placeholder='地址栏上的用户ID' value={inputValue} onInput={onChange}  />
                <Button type="primary" onClick={onAdd}>添加</Button>
            </Space.Compact>
            <Space.Compact style={{ width: '100%' }}>
                {users.map((user) => (
                    <StyleTag key={user} closable bordered={false} onClose={onDelete.bind(null, user)}>{user}</StyleTag>
                ))}
            </Space.Compact>
        </Space>
    );
}

export default TwitterUser;
