import React from "react";
import { CSSTransition } from "react-transition-group";
import { TransitionProps } from "../types";

export default function Transition(props: TransitionProps) {
  const enterClasses = props.enter.split(" ");
  const enterFromClasses = props.enterFrom.split(" ");
  const enterToClasses = props.enterTo.split(" ");
  const leaveClasses = props.leave.split(" ");
  const leaveFromClasses = props.leaveFrom.split(" ");
  const leaveToClasses = props.leaveTo.split(" ");

  return (
    <CSSTransition
      unmountOnExit
      in={props.show}
      addEndListener={(node, done) => {
        node.addEventListener("transitionend", done, false);
      }}
      onEnter={(node: HTMLElement) => {
        node.classList.add(...enterClasses, ...enterFromClasses);
      }}
      onEntering={(node: HTMLElement) => {
        node.classList.remove(...enterFromClasses);
        node.classList.add(...enterToClasses);
      }}
      onEntered={(node: HTMLElement) => {
        node.classList.remove(...enterToClasses, ...enterClasses);
      }}
      onExit={(node: HTMLElement) => {
        node.classList.add(...leaveClasses, ...leaveFromClasses);
      }}
      onExiting={(node: HTMLElement) => {
        node.classList.remove(...leaveFromClasses);
        node.classList.add(...leaveToClasses);
      }}
      onExited={(node: HTMLElement) => {
        node.classList.remove(...leaveToClasses, ...leaveClasses);
      }}
    >
      {props.children}
    </CSSTransition>
  );
}
