import React from "react";
import { screen, render, waitFor, cleanup } from "@testing-library/react";
import SideBar from "./SideBar";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");

// Mock the Axios response
const mockData = [
	{ _id: "1", name: "Category 1" },
	{ _id: "2", name: "Category 2" },
];

afterEach(cleanup);

describe("SideBar", () => {
	test("fetches and displays categories correctly", async () => {
		axios.get.mockResolvedValueOnce({ data: mockData });

		render(
			<MemoryRouter>
				<SideBar />
			</MemoryRouter>
		);

		// Wait for the Axios call to complete
		await waitFor(() => {
			// Assertions
			expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/categories`);

			// // Verify that categories are rendered
			expect(screen.getByText("Category 1")).toBeInTheDocument();
			expect(screen.getByText("Category 2")).toBeInTheDocument();
		});
	});

	test("renders Sidebar snapshot", async () => {
		axios.get.mockResolvedValueOnce({ data: mockData });
		const { asFragment } = render(<SideBar />);
		await waitFor(() => {
			expect(asFragment()).toMatchSnapshot();
		});
	});
});
