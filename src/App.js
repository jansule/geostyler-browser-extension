import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import './App.css';

import en_US from 'geostyler/dist/locale/en_US';
import { LocaleProvider, Row, Col, Button } from 'antd';
import SldStyleParser from 'geostyler-sld-parser';

import Cascader from './components/Cascader/Cascader';
import FeatureSelector from './components/FeatureSelector';
const _uniqueId = require('lodash/uniqueId');
const _cloneDeep = require('lodash/cloneDeep');
const _isEqual = require('lodash/isEqual');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 'style',
      editRule: undefined,
      editSymbolizer: undefined,
      style: this.getDefaultStyle(),
      sld: undefined,
      copy: false
    };
  }

  cascades = ['style', 'rule', 'symbolizer'];

  getDefaultSymbolizer = () => {
    return {
      kind: 'Mark',
      wellKnownName: 'Circle'
    };
  };

  getDefaultRule = () => {
    return {
      name: _uniqueId('Rule '),
      symbolizers: [this.getDefaultSymbolizer()],
      scaleDenominator: {min: 0, max: 0}
    };
  };

  getDefaultStyle = () => {
    return {
      name: 'New Style',
      rules: [this.getDefaultRule()]
    };
  };

  getRuleIdx = (rule) => {
    const { style } = this.state;
    const idx = style.rules.findIndex(r => r.name === rule.name);
    return idx;
  }

  getSymbolizerIdx = (ruleIdx, symbolizer) => {
    const { style } = this.state;
    const idx = style.rules[ruleIdx].symbolizers.findIndex(s => _isEqual(s, symbolizer));
    return idx;
  }

  onItemChange = (item, obj) => {
    switch (item) {
      case 'rule':
        this.setState({selectedItem: item, editRule: obj});
        break;
      case 'symbolizer':
        this.setState({selectedItem: item, editSymbolizer: obj});
        break;
      default:
        this.setState({selectedItem: item});
        break;
    }
  }

  onStyleChange = (style) => {
    this.setState({style});
  }

  onRuleChange = (newRule) => {
    const style = _cloneDeep(this.state.style);
    const oldRule = this.state.editRule;
    const ruleIdx = style.rules.findIndex(r => r.name === oldRule.name);
    if (ruleIdx > -1) {
      style.rules[ruleIdx] = newRule;
    }
    this.setState({style, editRule: newRule});
  }

  onAddRule = () => {
    let style = _cloneDeep(this.state.style);
    style.rules.push(this.getDefaultRule());
    this.setState({style});
  }

  onRemoveRule = (rule) => {
    let style = _cloneDeep(this.state.style);
    style.rules = style.rules.filter(r => r.name !== rule.name);
    this.setState({style});
  }

  onSymbolizerChange = (rule, symbolizer) => {
    let style = _cloneDeep(this.state.style);
    const oldSymbolizer = this.state.editSymbolizer;
    const ruleIdx = this.getRuleIdx(rule);
    if (ruleIdx > -1) {
      const symbIdx = this.getSymbolizerIdx(ruleIdx, oldSymbolizer);
      if (symbIdx > -1) {
        style.rules[ruleIdx].symbolizers[symbIdx] = symbolizer;
      }
    }
    this.setState({style, editRule: style.rules[ruleIdx], editSymbolizer: symbolizer});
  }

  onAddSymbolizer = (rule) => {
    let style = _cloneDeep(this.state.style);
    const idx = this.getRuleIdx(rule);
    if (idx > -1) {
      style.rules[idx].symbolizers.push(this.getDefaultSymbolizer());
    }
    this.setState({style, editRule: style.rules[idx]});
  }

  onRemoveSymbolizer = (rule, symbolizer) => {
    let style = _cloneDeep(this.state.style);
    const idx = this.getRuleIdx(rule);
    if (idx > -1) {
      style.rules[idx].symbolizers = style.rules[idx].symbolizers
        .filter(s => !_isEqual(s, symbolizer));
    }
    this.setState({style, editRule: style.rules[idx]});
  }

  copyToClipboard = () => {
    this.setState({copy: true}, () => {
      const parser = new SldStyleParser();
      parser.writeStyle(this.state.style)
        .then(sld => {
          this.setState({sld}, () => {
            const copyText = document.getElementById('copy-style');
            copyText.select();
            document.execCommand('copy');
            this.setState({copy: false});
          })
        });
    });
  }

  render() {
    const {
      selectedItem,
      style,
      editRule,
      editSymbolizer,
      sld,
      copy
    } = this.state;

    return (
      <LocaleProvider
        locale={en_US}
      >
        <div className="App">
          <Row type="flex">
            {/* <Col> */}
              <Button
                className="copy-button"
                type="primary"
                onClick={this.copyToClipboard}
              >Copy to Clipboard</Button>
              <Cascader
                items={this.cascades}
                currentItem={selectedItem}
                itemClickAction={item => {
                  this.setState({selectedItem: item});
                }}
                itemLabel={item => {
                  switch (item) {
                    case 'style':
                      return `Style - ${style.name}`;
                    case 'rule':
                      return `Rule - ${editRule.name}`;
                    case 'symbolizer':
                      return `Symbolizer - ${editSymbolizer.kind}`;
                    default:
                      return;
                  }
                }}
              />
            {/* </Col> */}
            {/* <Col offset={1} className="featureselector"> */}
            <div className="featureselector">

              <FeatureSelector
                style={style}
                editRule={editRule}
                onRuleChange={this.onRuleChange}
                onAddRule={this.onAddRule}
                onRemoveRule={this.onRemoveRule}
                editSymbolizer={editSymbolizer}
                onSymbolizerChange={this.onSymbolizerChange}
                onAddSymbolizer={this.onAddSymbolizer}
                onRemoveSymbolizer={this.onRemoveSymbolizer}
                selectedItem={selectedItem}
                onStyleChange={this.onStyleChange}
                onItemChange={this.onItemChange}
              />
            </div>
            {/* </Col> */}
            {
              copy && 
                <textarea
                  id="copy-style"
                  value={sld}
                  readOnly
                />
            }
          </Row>
        </div>
      </LocaleProvider>
    );
  }
}

export default App;
