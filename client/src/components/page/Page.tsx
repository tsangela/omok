import React from "react";
import { Link, To } from "react-router-dom";
import { classNames } from "../../utils/classNames";

import styles from "./Page.module.scss";

type PageProps = {
  backgroundColor?: string;
  buttonLabel: string;
  buttonPath: To;
  className?: string;
  message?: string;
  title: string;
}

export function Page({
  backgroundColor = "#fff",
  buttonLabel,
  buttonPath,
  className = "",
  message,
  title,
}: PageProps) {
  return (
    <>
      <style>{`body{background:${backgroundColor};}`}</style>
      <div className={classNames(styles.page, className)}>
        <Title>{title}</Title>
        {message && <Message>{message}</Message>}
        <Button buttonPath={buttonPath}>{buttonLabel}</Button>
      </div>
    </>
  );
};

type ParentComponentProps = {
  children: string | React.ReactElement;
}

function Title({ children }: ParentComponentProps) {
  return (
    <h1 className={styles.title}>
      {children}
    </h1>
  )
}

function Message({ children }: ParentComponentProps) {
  return (
    <p className={styles.message}>
      {children}
    </p>
  )
}

type ButtonProps = Pick<PageProps, "buttonPath"> & ParentComponentProps;

function Button({ buttonPath, children }: ButtonProps) {
  return (
    <Link to={buttonPath} className={styles.button}>
      {children}
    </Link>
  )
}
