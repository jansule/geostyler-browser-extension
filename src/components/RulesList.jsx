import * as React from 'react';
import PropTypes from 'prop-types';
import { List, Button, Col, Row } from 'antd';
import { Preview } from 'geostyler';

class RulesList extends React.Component {
  static propTypes = {
    rules: PropTypes.array.isRequired,
    onRemoveRule: PropTypes.func,
    onAddRule: PropTypes.func,
    onRuleEdit: PropTypes.func
  };

  render() {
    const {
      rules,
      onRuleEdit,
      onAddRule,
      onRemoveRule
    } = this.props;

    return (
      <div className="ruleslist">
        <List
          size="small"
          header={<div>Rules</div>}
          footer={<Button onClick={onAddRule}>Add Rule</Button>}
          dataSource={rules}
          renderItem={rule => (
            <List.Item
              actions={[
                <a onClick={() => onRuleEdit(rule)}>Edit</a>,
                <a onClick={() => onRemoveRule(rule)}>Remove</a>
              ]}
            >
              <Row>
                <Col span={12}>
                  <Preview
                    className="ruleslist-preview"
                    symbolizers={rule.symbolizers}
                    onSymbolizerChange={() => {}}
                    showOsmBackground={false}
                    hideEditButton={true}
                  />
                </Col>
                <Col span={12}>
                  <strong>{rule.name}</strong><br/>
                  <span>
                    {rule.filter ?
                      `Filter: ${JSON.stringify(rule.filter)}`
                      : `Filter: none`
                    }
                  </span><br/>
                  <span>
                    {`ScaleDenominator:\n1:${rule.scaleDenominator.min} - 1:${rule.scaleDenominator.max}`}
                  </span>
                </Col>
              </Row>
            </List.Item>
            )}
        />
      </div>
    );
  }
}

export default RulesList;
