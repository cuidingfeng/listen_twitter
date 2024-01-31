import React, { useState, useCallback, useEffect } from 'react';
import { Space, Input, Button, Tag } from 'antd';
import styled from 'styled-components';
import { push, getUrl } from '../../lib/utils';

const StyleTag = styled(Tag)`
    padding: 5px 12px;
    font-size: 12px;
    .anticon{
        font-size: 12px;
    }
`

function KeyWord(props) {
    const [inputValue, setInputValue] = useState('')
    const [keywords, setKeywords] = useState([])
    const onChange = useCallback((e) => {
        setInputValue(e.target.value)
    }, [])
    const pullKeyWord = useCallback(() => {
        getUrl('get_keyword', {
            u_id: '001'
        }).then(({ data }) => {
            setKeywords(data.map(user => user.keyword));
        })
    }, [])
    const onAdd = useCallback(() => {
        push('save_keyword', {
            keyword: inputValue,
            u_id: '001'
        }).then(() => {
            setKeywords([...keywords, inputValue])
            setInputValue('')
        })
    }, [keywords, inputValue])
    const onDelete = useCallback((keyword) => {
        push('delete_keyword', {
            keyword: keyword,
            u_id: '001'
        }).then(() => {
            pullKeyWord()
        })
    }, [])
    useEffect(() => { 
        pullKeyWord()
    }, [])
    return (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Space.Compact style={{ width: '100%' }}>
                <Input defaultValue="" placeholder='希望推文中涉及到的内容' value={inputValue} onInput={onChange}  />
                <Button type="primary" onClick={onAdd}>添加</Button>
            </Space.Compact>
            <Space.Compact style={{ width: '100%' }}>
                {keywords.map((keyword) => (
                    <StyleTag key={keyword} closable bordered={false} onClose={onDelete.bind(null, keyword)}>{keyword}</StyleTag>
                ))}
            </Space.Compact>
        </Space>
    );
}

export default KeyWord;
