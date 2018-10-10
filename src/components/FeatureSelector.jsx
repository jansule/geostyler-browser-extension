import * as React from 'react';
import PropTypes from 'prop-types';
import StyleView from './StyleView';
import RuleView from './RuleView';
import SymbolizerView from './SymbolizerView';

class FeatureSelector extends React.Component {

  static propTypes = {
    style: PropTypes.object.isRequired,
    editRule: PropTypes.object,
    onRuleChange: PropTypes.func,
    onAddRule: PropTypes.func,
    onRemoveRule: PropTypes.func,
    editSymbolizer: PropTypes.object,
    onSymbolizerChange: PropTypes.func,
    onAddSymbolizer: PropTypes.func,
    onRemoveSymbolizer: PropTypes.func,
    onStyleChange: PropTypes.func,
    selectedItem: PropTypes.string,
    onItemChange: PropTypes.func
  };

  onRuleEdit = (rule) => {
    const {
      onItemChange
    } = this.props;
    if (onItemChange) {
      onItemChange('rule', rule);
    }
  }

  onSymbolizerEdit = (symbolizer) => {
    const {
      onItemChange
    } = this.props;
    if (onItemChange) {
      onItemChange('symbolizer', symbolizer);
    }
  }

  getSelectedItem = (item) => {
    const {
      onStyleChange,
      onRuleChange,
      onAddRule,
      onRemoveRule,
      onAddSymbolizer,
      onRemoveSymbolizer,
      style,
      editRule,
      editSymbolizer,
      onSymbolizerChange
    } = this.props;

    switch(item) {
      case 'style':
        return (
          <StyleView
            style={style}
            onStyleChange={onStyleChange}
            onRuleEdit={this.onRuleEdit}
            onAddRule={onAddRule}
            onRemoveRule={onRemoveRule}
          />
        );
      case 'rule':
        return (
          <RuleView
            rule={editRule}
            onRuleChange={onRuleChange}
            onAddSymbolizer={onAddSymbolizer}
            onRemoveSymbolizer={onRemoveSymbolizer}
            onSymbolizerEdit={this.onSymbolizerEdit}
          />
        );
      case 'symbolizer':
        return (
          <SymbolizerView
            symbolizer={editSymbolizer}
            onSymbolizerChange={symb => {
              if (onSymbolizerChange) {
                onSymbolizerChange(editRule, symb);
              }
            }}
          />
        );
      default:
        break;
    }
  }

  render() {
    const {
      selectedItem
    } = this.props;

    return (
      <div>
        {this.getSelectedItem(selectedItem)}
      </div>
    );
  }
}

export default FeatureSelector;
