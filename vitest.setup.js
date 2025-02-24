import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
// import '@testing-library/jest-dom'

// Extend Vitest's `expect` with Jest DOM matchers
expect.extend(matchers);