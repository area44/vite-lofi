import { expect, test } from "vite-plus/test";

import { formatSeconds } from "@/lib/format";

test("formatSeconds formats seconds correctly", () => {
  expect(formatSeconds(0)).toBe("00:00");
  expect(formatSeconds(5)).toBe("00:05");
  expect(formatSeconds(60)).toBe("01:00");
  expect(formatSeconds(65)).toBe("01:05");
  expect(formatSeconds(3600)).toBe("60:00");
});
