import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function Menu({ children, items }) {
  const renderItem = () => {
    return items.map((item, index) => <MenuItem data={item} key={index} />);
  };

  return (
    <Tippy
      placement="bottom-end"
      delay={[0, 700]}
      interactive
      render={(attrs) => (
        <div className={cx('menu-lists')} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx('menu-popper')}>
            {renderItem()}
          </PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
