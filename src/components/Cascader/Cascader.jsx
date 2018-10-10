import * as React from 'react';
import PropTypes from 'prop-types';
import CascadeButton from '../CascadeButton/CascadeButton';

class Cascader extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentItem: PropTypes.string.isRequired,
    itemClickAction: PropTypes.func,
    itemLabel: PropTypes.func
  };

  getCascades = () => {
    const {
      currentItem,
      items,
      itemClickAction,
      itemLabel
    } = this.props;

    let result = [];
    const currentItemIdx = items.findIndex(item => item === currentItem);
    if (currentItemIdx > -1) {
      for(let i = 0; i<=currentItemIdx; i++){
        let label;
        if (itemLabel) {
          label = itemLabel(items[i]);
        } else {
          label = items[i];
        }
        result.push(
          <CascadeButton
            key={i.toString()}
            onClick={() => { itemClickAction(items[i]);}}
            btnText={label}
          />
          );
      }
    }
    return result;
  }

  render() {
    const cascades = this.getCascades();
    return (
      cascades
    );
  }
}

export default Cascader;
