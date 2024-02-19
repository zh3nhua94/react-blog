import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, BrowserRouter as Router } from "react-router-dom";
import TopBar from "./TopBar";
import { Context } from "../../context/Context";

describe("TopBar Component", () => {
	test("renders social icons", () => {
		render(<TopBar />, { wrapper: MemoryRouter });

		// Assuming the social icons have specific aria-label attributes
		expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
		expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
		expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
		expect(screen.getByLabelText("Pinterest")).toBeInTheDocument();
	});

	test("renders Logout link when user is present in context", () => {
		// Mock the context to provide a user
		const user = jest.fn();

		render(
			<Context.Provider value={{ user }}>
				<MemoryRouter>
					<TopBar />
				</MemoryRouter>
			</Context.Provider>
		);

		// Assuming the logout link has specific text content
		expect(screen.getByText("LOGOUT")).toBeInTheDocument();
	});

	test("does not render Logout link when user is not present in context", () => {
		// Mock the context to provide no user

		render(
			<Context.Provider value={{ user: null }}>
				<MemoryRouter>
					<TopBar />
				</MemoryRouter>
			</Context.Provider>
		);

		// Assuming the logout link is not present
		expect(screen.queryByText("LOGOUT")).toBeNull();
		expect(screen.getByText("LOGIN")).toBeInTheDocument();
	});

	test("clicking the menu icon toggles the navigation", () => {
		render(<TopBar />, { wrapper: MemoryRouter });

		// Check if the navigation is initially hidden
		const topCenterElement = screen.getByTestId("topCenter");
		expect(topCenterElement).toHaveClass("topCenter");

		// Click the menu icon
		const menuIcon = screen.getByLabelText("Menu Icon");
		fireEvent.click(menuIcon);

		// Check if the navigation is visible after clicking the menu icon
		expect(topCenterElement).toHaveClass("topCenter active");
	});
});
