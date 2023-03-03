import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

import { waitForElement } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { getByText } from "@testing-library/react";
import { prettyDOM } from "@testing-library/react";
import { getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";
afterEach(cleanup);


describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday"))
    .then(() =>{
      fireEvent.click(getByText("Tuesday"))
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container,"Archie Cohen"));
    console.log(prettyDOM(container));
    const appointments = getAllByTestId(container, "appointment");
    console.log(prettyDOM(appointments));
    const appointment = appointments[0];
    console.log(prettyDOM(appointment));

    // fireEvent.click(getByAltText(appointment, "Add"));
    // fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    //   target: { value: "Lydia Miller-Jones" }
    // });
    // fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // fireEvent.click(getByText(appointment, "Save"));
  })
})