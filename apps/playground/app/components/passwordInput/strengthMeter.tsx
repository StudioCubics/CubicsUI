"use client";

import { useState } from "react";
import { Button, Card, PasswordInput, TextInput } from "@cubicsui/components";
import Link from "next/link";

export function StrengthMeter() {
  const scoreWords = ["Weak", "Okay", "Good", "Strong", "Very strong"];
  const strengths = [0, 1, 2, 3, 4];
  const feedbacks = {
    warning: "This is a top-10 common password",
    suggestions: ["Make it a bit longer", "Add few more words"],
  } as const;

  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<keyof typeof feedbacks>("warning");
  const [customScoreWords, setCustomScoreWords] = useState(scoreWords);

  return (
    <section>
      <div className={"column"}>
        <p>
          Set strength below to see the meter change, see{" "}
          <Link href="#">
            <code>{"<PasswordStrengthMeter/>"}</code>
          </Link>{" "}
          to learn more
        </p>
        <div className={"row"}>
          {strengths.map((s) => (
            <Button
              key={s}
              size="sm"
              variant={score == s ? "contained" : "outlined"}
              onClick={() => setScore(s)}
            >
              {s}
            </Button>
          ))}
        </div>
        <p>Modify the score words to see the custom score words</p>
        <div className={"row"}>
          {Array.from({ length: scoreWords.length }).map((_, i) => (
            <TextInput
              key={i}
              size="sm"
              value={customScoreWords[i]}
              startAdornment={<b>{i}</b>}
              onChange={(e) =>
                setCustomScoreWords((prev) => {
                  const next = [...prev];
                  next[i] = e.target.value;
                  return next;
                })
              }
            />
          ))}
        </div>
        <p>Select a type of feedback to see below</p>
        <div className={"row"}>
          {(Object.keys(feedbacks) as Array<keyof typeof feedbacks>).map(
            (k) => (
              <Button
                key={k}
                size="sm"
                variant={selected == k ? "contained" : "outlined"}
                onClick={() => setSelected(k)}
              >
                {k}
              </Button>
            ),
          )}
        </div>
        <Card style={{ marginTop: "var(--gap-5)" }}>
          <TextInput label="Username" />
          <PasswordInput
            autoComplete="off"
            autoCorrect="off"
            label="Password"
            enableStrengthMeter
            slotProps={{
              strengthMeter: {
                score,
                scoreWords: customScoreWords,
                feedback: { [selected]: feedbacks[selected] },
              },
            }}
          />
        </Card>
      </div>
    </section>
  );
}
