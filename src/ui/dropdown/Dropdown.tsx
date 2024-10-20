import { FC, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { ArrowUpIcon } from '@ui/icon/ArrowUpIcon';
import { ArrowDownIcon } from '@ui/icon/ArrowDownIcon';

import { useOutsideClick } from '@hooks/useOutsideClick ';
import { TDropdownProps } from './TDropdownProps.type';

import styles from './dropdown.module.scss';

export const Dropdown: FC<TDropdownProps> = ({
  text,
  options,
  isDropdownOpen,
  small,
  setIsDropdownOpen,
  setItemPerPage = () => {},
  setCurrentPage = () => {},
  closeDropdown = () => {},
  setSortBy = () => {},
}) => {
  const ref = useOutsideClick(closeDropdown);
  const [selectedValue, setSelectedValue] = useState<number | string>(
    options[0]?.value ?? '',
  );

  useEffect(() => {
    setItemPerPage(Number(selectedValue));
  }, [selectedValue, setItemPerPage]);

  const handleOptionSelect = useCallback(
    (value: string | number) => {
      setSelectedValue(value);
      if (typeof value === 'string') {
        setSortBy(value);
      } else if (typeof value === 'number') {
        setItemPerPage(value);
        setCurrentPage(1);
      }
    },
    [setItemPerPage],
  );

  const keyboardSelection = (
    e: React.KeyboardEvent<HTMLLIElement>,
    value: string | number,
  ) => {
    if (e.key === 'Enter') {
      handleOptionSelect(value);
    }
  };

  const currentOption =
    options.find(option => option.value === selectedValue)?.label ||
    options[0]?.label;

  return (
    <div className={styles.dropdown} ref={ref}>
      <label htmlFor={text}>{text}</label>

      <button
        id={text}
        className={cn(styles.select, small && styles.smallSelect)}
        onClick={setIsDropdownOpen}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        type="button"
      >
        <span className={styles.dropdownTitle}>
          {currentOption}
          {isDropdownOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </span>

        {isDropdownOpen && (
          <div className={styles.optionsList}>
            <ul role="menu" className={styles.option}>
              {options.map(option => (
                <li
                  key={option.value}
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => handleOptionSelect(option.value)}
                  onKeyDown={e => keyboardSelection(e, option.value)}
                  className={cn(
                    styles.item,
                    selectedValue === option.value && styles.active,
                  )}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </button>
    </div>
  );
};
