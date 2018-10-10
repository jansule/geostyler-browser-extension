import * as React from 'react';
import PropTypes from 'prop-types';
import { NameField} from 'geostyler';
import RulesList from './RulesList';
const _cloneDeep = require('lodash/cloneDeep');

class StyleView extends React.Component {

  static propTypes = {
    style: PropTypes.object.isRequired,
    onStyleChange: PropTypes.func,
    onRuleEdit: PropTypes.func,
    onAddRule: PropTypes.func,
    onRemoveRule: PropTypes.func
  };

  onRuleEdit = (rule) => {
    const {
      onRuleEdit
    } = this.props;

    if (onRuleEdit) {
      onRuleEdit(rule);
    }
  }

  render() {
    const {
      onStyleChange,
      onRuleEdit,
      onAddRule,
      onRemoveRule
    } = this.props;

    const style = _cloneDeep(this.props.style);

    return (
      <div>
        <NameField
          defaultValue={style.name}
          value={style.name}
          onChange={(name) => {
            style.name = name;
            if (onStyleChange) {
              onStyleChange(style);
            }
          }}
          label="Style Name"
          placeholder="Enter Style Name"
        />
        <RulesList
          rules={style.rules}
          onRuleEdit={onRuleEdit}
          onAddRule={onAddRule}
          onRemoveRule={onRemoveRule}
        />
      </div>
    );
  }
}

export default StyleView;
