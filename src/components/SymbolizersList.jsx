import * as React from 'react';
import PropTypes from 'prop-types';
import { List, Button, Row, Col } from 'antd';
import { Preview } from 'geostyler';

class SymbolizersList extends React.Component {
  static propTypes = {
    symbolizers: PropTypes.array.isRequired,
    onAddSymbolizer: PropTypes.func,
    onSymbolizerEdit: PropTypes.func,
    onRemoveSymbolizer: PropTypes.func
  };
  
  render() {
    const {
      symbolizers,
      onAddSymbolizer,
      onSymbolizerEdit,
      onRemoveSymbolizer
    } = this.props;

    return (
      <List
          size="small"
          header={<div>Symbolizers</div>}
          footer={<Button onClick={onAddSymbolizer}>Add Symbolizer</Button>}
          dataSource={symbolizers}
          renderItem={symbolizer => (
            <List.Item
              actions={[
                <a onClick={() => onSymbolizerEdit(symbolizer)}>Edit</a>,
                <a onClick={() => onRemoveSymbolizer(symbolizer)}>Remove</a>
              ]}
            >
              <Row>
                <Col span={12}>
                  {symbolizer.kind}
                </Col>
                <Col span={12}>
                  <Preview
                    className="ruleslist-preview"
                    symbolizers={[symbolizer]}
                    onSymbolizerChange={() => {}}
                    showOsmBackground={false}
                    hideEditButton={true}
                  />
                </Col>
              </Row>
            </List.Item>
            )}
        />
    );
  }
}

export default SymbolizersList;
