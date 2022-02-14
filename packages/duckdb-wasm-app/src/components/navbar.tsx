import * as React from 'react';
import classNames from 'classnames';
import { useLocation, Link, useSearchParams } from 'react-router-dom';

import styles from './navbar.module.css';

import logo from '../../static/svg/logo/duckdb.svg';
import icon_shell from '../../static/svg/icons/shell.svg';
import icon_book from '../../static/svg/icons/book.svg';
import icon_table from '../../static/svg/icons/table.svg';

type TabProps = {
    route: string;
    location: string;
    icon?: string;
    text?: string;
    external?: boolean;
};

const Tab: React.FC<TabProps> = (props: TabProps) => (
    <div
        key={props.route}
        className={classNames(styles.tab, {
            [styles.active]: props.location == props.route,
        })}
    >
        {props.external ? (
            <a href={props.route} target="blank">
                <div className={styles.tabButton}>
                    {props.text ? (
                        <div className={styles.tabTextIcon}>{props.text}</div>
                    ) : (
                        <svg className={styles.tabIcon} width="18px" height="18px">
                            <use xlinkHref={`${props.icon}#sym`} />
                        </svg>
                    )}
                </div>
            </a>
        ) : (
            <Link to={props.route}>
                <div className={styles.tabButton}>
                    {props.text ? (
                        <div className={styles.tabTextIcon}>{props.text}</div>
                    ) : (
                        <svg className={styles.tabIcon} width="18px" height="18px">
                            <use xlinkHref={`${props.icon}#sym`} />
                        </svg>
                    )}
                </div>
            </Link>
        )}
    </div>
);

type Props = Record<string, string>;

export const NavBar: React.FC<Props> = (_props: Props) => {
    const location = useLocation();
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <svg width="32px" height="32px">
                    <use xlinkHref={`${logo}#sym`} />
                </svg>
            </div>
            <div className={styles.tabs}>
                <Tab route="/" location={location.pathname} icon={icon_shell} />
                <Tab route="/vldb" location={location.pathname} icon={icon_table} />
                <Tab route="docs/modules/index.html" location={location.pathname} icon={icon_book} external />
            </div>
        </div>
    );
};

type ContainerProps = {
    children: React.ReactElement[] | React.ReactElement;
};

export const NavBarContainer: React.FC<ContainerProps> = (props: ContainerProps) => {
    const [searchParams] = useSearchParams();
    if ((searchParams.get('fullscreen') || '') === 'true') {
        return <>props.children</>;
    } else {
        return (
            <div className={styles.container}>
                <NavBar />
                <div className={styles.page}>{props.children}</div>
            </div>
        );
    }
};
