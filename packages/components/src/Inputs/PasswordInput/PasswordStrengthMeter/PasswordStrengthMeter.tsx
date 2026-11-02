"use client";

import { cn } from "@cubicsui/utils";
import {
  type CSSProperties,
  type ReactElement,
  useEffect,
  useState,
} from "react";
import { TextOrList } from "../../../Typography/TextOrList/TextOrList";
import type { PasswordStrengthMeterProps } from "../PasswordInput.types";
import styles from "./PasswordStrengthMeter.module.css";

export function PasswordStrengthMeter(
  props: PasswordStrengthMeterProps,
): ReactElement {
  const {
    className,
    score = 0,
    scoreWords = ["Weak", "Okay", "Good", "Strong", "Very strong"],
    feedback,
    slotProps = {},
    ...rest
  } = props;
  const [scoreWord, setScoreWord] = useState(scoreWords[0]);
  const scoreStyles = {
    "--score": score,
  } as CSSProperties;

  useEffect(() => {
    setScoreWord(scoreWords[score]);
  }, [score, scoreWords]);

  return (
    <div className={cn(styles.root, className)} {...rest}>
      <div
        {...slotProps.meterWrapper}
        className={cn(styles.container, slotProps.meterWrapper?.className)}
      >
        <div
          {...slotProps.meter}
          className={cn(styles.meter, slotProps.meter?.className)}
          style={{ ...slotProps.meter?.style, ...scoreStyles }}
          data-score={!!score}
        />
        <div
          {...slotProps.scoreWord}
          className={cn(styles.scoreWord, slotProps.scoreWord?.className)}
        >
          {scoreWord}
        </div>
      </div>
      <TextOrList
        {...slotProps.feedback}
        className={cn(styles.feedback, slotProps.feedback?.className)}
        data-warning={!!feedback?.warning}
        text={feedback?.warning ?? feedback?.suggestions}
      />
    </div>
  );
}
