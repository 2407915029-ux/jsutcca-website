"use client";

import { useEffect, useState } from "react";

export function ImageUrlInput({
  values,
  onChange,
  placeholder = "https://example.com/cat.jpg"
}: {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}) {
  const [text, setText] = useState(values.join("\n"));

  useEffect(() => {
    setText(values.join("\n"));
  }, [values]);

  function update(value: string) {
    setText(value);
    onChange(
      value
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean)
    );
  }

  return (
    <textarea
      value={text}
      onChange={(event) => update(event.target.value)}
      placeholder={`${placeholder}\n一行一个图片 URL，空行会自动忽略`}
      rows={5}
      className="w-full rounded-lg border border-orange-200 bg-white px-3 py-2 outline-none focus:border-salmon"
    />
  );
}
