import React, { PureComponent } from 'react';
import { arrayOf, shape, string, number } from 'prop-types';

import ListItem from './ListItem';

export default class List extends PureComponent {
  static propTypes = {
    items: arrayOf(shape({
      id: number,
      title: string,
      url: string,
      tags: string,
    })),
  };

  static defaultProps = {
    items: [],
  };

  render() {
    const { items, videos, removeItem, edit } = this.props;

    const list = items.map(item => <ListItem key={item.id} edit={edit} removeItem={removeItem} {...item} />);

    return (
      <ul>
        Search Videos:{items.length} / All Videos:{videos}
        {list}
      </ul>
    );
  }
};

