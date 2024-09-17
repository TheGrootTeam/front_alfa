import { PropsWithChildren } from 'react';
import Footer from './Footer';
import Header from './Header';
import styles from './Layout.module.css';

export interface Props {
  title?: string;
  page: string;
  mainClassName?: string; // Allow passing additional class names
}

export default function Layout(props: PropsWithChildren<Props>) {
  return (
    <div className={styles.layout}>
      <Header />
      <main
        className={`${styles.layout_main} ${props.page} ${props.mainClassName || ''}`}
      >
        {props.title && <h2 className={styles.visibleTitle}>{props.title}</h2>}
        {props.children}
      </main>
      <Footer />
    </div>
  );
}
