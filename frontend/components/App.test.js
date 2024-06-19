// Write your tests here
import React from "react";
import "@testing-library/jest-dom";
import AppFunctional from "./AppFunctional";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  render(<AppFunctional className="functional" />);
});

test("Koordinatlar başlığı doğru şekilde render ediliyor", () => {
  const coordinateTitle = screen.getByTestId("coordinatesH3");
  expect(coordinateTitle).toHaveTextContent("Koordinatlar");
});

test("email yazılınca inputtaki değer değişiyor", async () => {
  const emailInput = screen.getByPlaceholderText("email girin");
  await userEvent.type(emailInput, "ali@gmail.com");
  expect(emailInput.value).toBe("ali@gmail.com");
});

test("sol buton calisiyor", async () => {
  const leftBtn = screen.getByText(/SOL/i);
  const coordinateTitle = screen.getByTestId("coordinatesH3");
  await userEvent.click(leftBtn);
  expect(coordinateTitle).toHaveTextContent("Koordinatlar (1,2)");
});

test("resete basınca üstteki sayac sıfırlanıyor", async () => {
  const resetBtn = screen.getByText("reset");
  const leftBtn = screen.getByText(/SOL/i);
  const counterH3 = screen.getByTestId("stepsH3");

  await userEvent.click(leftBtn);
  await userEvent.click(resetBtn);
  expect(counterH3).toHaveTextContent("0 kere ilerlediniz");
});

test("email dogru girilmisse submit ediliyor ve response h3'e işleniyor", async () => {
  const emailInput = screen.getByPlaceholderText("email girin");
  const submitBtn = screen.getByTestId("submitBtn");
  const messageH3 = screen.getByTestId("messageH3");

  await userEvent.type(emailInput, "ali@gmail.com");
  await userEvent.click(submitBtn);

  await waitFor(() => expect(messageH3).toHaveTextContent("win"));
});
