import { Dropdown } from 'antd';
import type { FC } from 'react';
import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

const HeaderDropdown: FC<any> = ({ overlayClassName: cls, ...restProps }) => (
  <Dropdown overlayClassName={classNames(styles.container, cls)} {...restProps} />
);

export default HeaderDropdown;
