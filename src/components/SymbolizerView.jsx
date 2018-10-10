import * as React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { Editor, Preview } from 'geostyler';

class SymbolizerView extends React.Component {
  static propTypes = {
    symbolizer: PropTypes.object.isRequired,
    onSymbolizerChange: PropTypes.func
  };

  render() {
    const {
      symbolizer,
      onSymbolizerChange
    } = this.props;

    return (
      <div>
        <Row gutter={8}>
          <Col span={12}>
            <Editor
              symbolizer={symbolizer}
              onSymbolizerChange={onSymbolizerChange} 
            />
          </Col>
          <Col span={12}>
            <Preview
              symbolizers={[symbolizer]}
              onSymbolizerChange={() => {}}
              showOsmBackground={false}
              hideEditButton={true}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default SymbolizerView;
