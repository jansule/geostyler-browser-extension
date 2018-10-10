import * as React from 'react';
import PropTypes from 'prop-types';
import { NameField, ScaleDenominator} from 'geostyler';
import ComparisonFilterUi from 'geostyler/dist/Component/Filter/ComparisonFilter/ComparisonFilter';
import SymbolizersList from './SymbolizersList';
const _cloneDeep = require('lodash/cloneDeep');

class RuleView extends React.Component {
  static propTypes = {
    rule: PropTypes.object.isRequired,
    onRuleChange: PropTypes.func,
    onSymbolizerEdit: PropTypes.func,
    onAddSymbolizer: PropTypes.func,
    onRemoveSymbolizer: PropTypes.func
  };
 
  render() {
    const {
      onRuleChange,
      onAddSymbolizer,
      onRemoveSymbolizer,
      onSymbolizerEdit
    } = this.props;
    const rule = _cloneDeep(this.props.rule);

    return (
      <div>
        <NameField
          defaultValue={rule.name}
          value={rule.name}
          onChange={(name) => {
            rule.name = name;
            if (onRuleChange) {
              onRuleChange(rule);
            }
          }}
          label="Rule Name"
          placeholder="Enter Rule Name"
        />
        <div>
          <span>Scale Denominator</span>
          <ScaleDenominator
            scaleDenominator={rule.scaleDenominator}
            onChange={sd => {
              rule.scaleDenominator = sd;
              if (onRuleChange) {
                onRuleChange(rule);
              }
            }}
          />
        </div>
        <div>
          <span>Filter</span>
          <ComparisonFilterUi
            filter={rule.filter}
            onFilterChange={(filter) => {
              rule.filter = filter;
              if (onRuleChange) {
                onRuleChange(rule);
              }
            }}
          />
        </div>
        <div>
          <SymbolizersList
            symbolizers={rule.symbolizers}
            onAddSymbolizer={symb => {
              if (onAddSymbolizer) {
                onAddSymbolizer(rule, symb);
              }
            }}
            onRemoveSymbolizer={symb => {
              if (onRemoveSymbolizer) {
                onRemoveSymbolizer(rule, symb);
              }
            }}
            onSymbolizerEdit={onSymbolizerEdit}
          />
        </div>
      </div>
    );
  }
}

export default RuleView;
