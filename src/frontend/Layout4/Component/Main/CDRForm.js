import React, { Component } from 'react';
import CDRFormItem from '../Right/CDRFormItem';
import { Form } from 'antd';

const WrappedCDRForm = Form.create({ name: 'CDRForm' })(CDRFormItem);
class CDRForm extends Component {

    render() {
        return (
            <WrappedCDRForm />
        )
    }
}
export default CDRForm;