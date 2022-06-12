import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({
  children,
  items = [],
  onChange = defaultFn,
  hideOnClick = false,
}) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  const renderItem = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          data={item}
          key={index}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  const handleBack = () => {
    setHistory((prev) => prev.slice(0, -1));
  };

  const renderResult = (attrs) => (
    <div className={cx('menu-lists')} tabIndex="-1" {...attrs}>
      <PopperWrapper className={cx('menu-popper')}>
        {history.length > 1 && (
          <Header title={current.title} onBack={handleBack} />
        )}
        <div className={cx('menu-body')}>{renderItem()}</div>
      </PopperWrapper>
    </div>
  );

  // Reset to first page
  const handleReset = () => {
    setHistory((prev) => prev.slice(0, 1));
  };

  return (
    <Tippy
      placement="bottom-end"
      delay={[0, 700]}
      offset={[12, 8]}
      hideOnClick={hideOnClick}
      interactive
      render={renderResult}
      onHidden={handleReset}
    >
      {children}
    </Tippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  onChange: PropTypes.func,
  hideOnClick: PropTypes.func,
};

export default Menu;
